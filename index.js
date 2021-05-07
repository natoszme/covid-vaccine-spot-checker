const _ = require("lodash");
const moment = require("moment");
const request = require("request-promise");
const Promise = require("bluebird");
const { patient, hospital } = require("./config");

const _post = (path, headers, body, extraOptions) => {
  const { url } = hospital;
  const options = {
    url: `${url}/${path}`,
    json: body,
    headers,
    ...extraOptions
  };
  return request.post(options).promise();
}


const getToken = () => {
  const { documentNumber, password } = patient;
  
  return _post("login/login", {}, { documento: documentNumber, password }, { resolveWithFullResponse: true })
  .get("headers")
  .get("authorization");
}

const getCalendar = (Authorization, month) => {
  const { associateId, associateNumber } = patient;
  const { acmeCode, instanceCode } = hospital;

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
  const monthsToCheckForSpot = _(4).range(12)
  .map(monthNumber => moment().month(monthNumber).format("MM"))
  .value();

  return Promise.map(monthsToCheckForSpot, month => getCalendar(token, month), { concurrency: 2 })
  .filter(({ days }) => !_.isEmpty(days))
  .then(_.flatten);
}

getToken()
.then(getCalendarsToCheck)
.tap(console.log)
.then(monthsWithSpots => !_.isEmpty(monthsWithSpots))
.tap(console.log);