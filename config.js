import _ from "lodash";

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
  },
  notification: {
    sender: {
      emailAddress: process.env.SENDER_EMAIL_ADDRESS,
      emailPassword: process.env.SENDER_EMAIL_PASSWORD  
    },
    receiver: {
      emailAddresses: process.env.RECEIVER_EMAIL_ADDRESSES
    },
    delayInMs: _.toNumber(process.env.DELAY_BETWEEN_EMAILS_SECONDS) * 1000,
    emailsAmount: _.toNumber(process.env.EMAILS_AMOUNT)
  }
};