const _ = require("lodash");
const moment = require("moment");
const request = require("request-promise");
const Promise = require("bluebird");

const _post = (path, headers, body, extraOptions) => {
  const options = {
    url: `https://www.hospitalaleman.com/haportal/${path}`,
    json: body,
    headers,
    ...extraOptions
  };
  return request.post(options).promise();
}

const getToken = () =>
  _post("login/login", {}, { documento: "14418659", password: "arge02" }, { resolveWithFullResponse: true })
  .get("headers")
  .get("authorization");

  
  const getCalendar = (Authorization, month) => {
    const body = {
    "codAcme": 38814,
    "codInstancia": 78064,
    "agendaId": null,
    "duracion": null,
    "desde": `01${month}2021`,
    "paciente": 155696,
    "banda": "O",
    "tipoArea": "I",
    "nrosoc": "23274",
    "presencial": true
  };
  
  return _post("turnos/calendario", { Authorization }, body)
  .get("dias")
  .then(days => ({ month, days }))
  .catch(console.log);
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