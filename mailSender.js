import config from "./config";
import nodemailer from "nodemailer-promise";

export default () => {
  const { emailAddress, emailPassword } = config.receiver;
  const sendEmail = nodemailer.config({
    service: "hotmail",
    auth: {
        user: emailAddress,
        pass: emailPassword
    }
  });

  var message = {
    from: emailAddress,
    to: 'natoszmedra@gmail.com',
    subject: '[COVID-19] Turnos de vacunación disponibles en el HA',
    text: 'Hay turnos disponibles. Apurate!\n\nNato'
  };

  return sendEmail(message)
  .then(console.log)
  .catch(console.log);
}