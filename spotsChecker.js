import _ from "lodash";
import moment from "moment";
import request from "request-promise";
import Promise from "bluebird";
import config from "./config";
import sendMail from "./mailSender";

const _post = (path, headers, body, extraOptions) => {
  const { url } = config.hospital;
  const options = {
    url: `${url}/${path}`,
    json: body,
    headers,
    ...extraOptions
  };
  return request.post(options).promise();
}

const getToken = () => {
  const { documentNumber, password } = config.patient;
  
  return _post("login/login", {}, { documento: documentNumber, password }, { resolveWithFullResponse: true })
  .get("headers")
  .get("authorization")
  .tap(token => { if (!token) throw new Error("Token missing") });
}

const getCalendar = (Authorization, month) => {
  const { associateId, associateNumber } = config.patient;
  const { acmeCode, instanceCode } = config.hospital;

  const body = {
    "codAcme": acmeCode,
    "codInstancia": instanceCode,
    "agendaId": null,
    "duracion": null,
    "desde": `01${month}2021`,
    "paciente": associateId,
    "banda": "O",
    "tipoArea": "I",
    "nrosoc": associateNumber,
    "presencial": true
  };
  
  return _post("turnos/calendario", { Authorization }, body)
  .get("dias")
  .then(days => ({ month, days }))
  .tapCatch(console.log)
  .catchReturn({ month, days: [] });
};

const getCalendarsToCheck = token => {
  const monthsToCheckForSpot = _(4).range(11)
  .map(monthNumber => moment().month(monthNumber).format("MM"))
  .value();

  return Promise.map(monthsToCheckForSpot, month => getCalendar(token, month), { concurrency: 2 })
  .filter(({ days }) => !_.isEmpty(days))
  .then(_.flatten);
}

export default () =>
  getToken()
  .then(getCalendarsToCheck)
  .tap(spots => console.log("Spots found:", spots))
  .then(monthsWithSpots => !_.isEmpty(monthsWithSpots))
  .tap(console.log)
  .then(thereAreVaccines => thereAreVaccines && sendMail())
  .catch(console.log);