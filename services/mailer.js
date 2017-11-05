const keys = require("../config/keys");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(keys.sendGridKey);

const sendEmail = ({ subject, recipients }, html) => {
  const msg = {
    to: formatEmailAddresses(recipients),
    from: "no-reply@email.com",
    subject,
    html
  };
  sgMail.send(msg);
};

const formatEmailAddresses = recipients => {
  return recipients.map(({ email }) => email);
};
module.exports = sendEmail;
