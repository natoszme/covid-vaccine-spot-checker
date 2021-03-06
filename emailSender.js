import _ from "lodash";
import Promise from "bluebird";
import config from "./config";
import nodemailer from "nodemailer-promise";

const sendOneEmail = () => {
  const { sender: { emailAddress, emailPassword }, receiver: { emailAddresses }, delayInMs } = config.notification;
  const sendEmail = nodemailer.config({
    service: "hotmail",
    auth: {
        user: emailAddress,
        pass: emailPassword
    }
  });

  var message = {
    from: emailAddress,
    to: emailAddresses,
    subject: '[COVID-19] Turnos de vacunación disponibles en el HA',
    text: 'Hay turnos disponibles. Apurate!\n\nNato'
  };

  return Promise.resolve(sendEmail(message))
  .then(console.log)
  .catch(console.log)
  .delay(delayInMs);
}

const { emailsAmount } = config.notification;
export default () => Promise.map(_.times(emailsAmount), sendOneEmail, { concurrency: 1 });