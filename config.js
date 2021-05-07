const _ = require("lodash");

export default {
  patient: {
    documentNumber: process.env.PATIENT_DOCUMENT_NUMBER,
    password: process.env.PATIENT_PASSWORD,
    associateId: _.toNumber(process.env.PATIENT_ASSOCIATE_ID),
    associateNumber: process.env.PATIENT_ASSOCIATE_NUMBER
  },
  hospital: {
    url: process.env.HOSPITAL_URL,
    acmeCode: _.toNumber(process.env.HOSPITAL_ACME_CODE),
    instanceCode: _.toNumber(process.env.HOSPITAL_INSTANCE_CODE)
  }
};