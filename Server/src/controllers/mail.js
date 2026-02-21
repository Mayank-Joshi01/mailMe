const { sendEmail } = require("../Services/Mail");
const sendMail = async(req, res) => {

const { to, subject, text } = req.body;

await sendEmail(to, subject, `<b>Keep up the great coding! ${text}</b>`);

  res.send("Mail sent successfully");
}

module.exports = {
  sendMail
}