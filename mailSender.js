import config from "./config";
import nodemailer from "nodemailer-promise";

export default () => {
  const { sender: { emailAddress, emailPassword }, receiver: { emailAddresses } } = config.notification;
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

  return sendEmail(message)
  .then(console.log)
  .catch(console.log);
}