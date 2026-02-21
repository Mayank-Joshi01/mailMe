const { sendEmail } = require("../Services/Mail");
const Mail = require("../models/Mail");
const User = require("../models/User");

const sendMail = async(req, res) => {

  //Getting the user from the database using the id from the token
 const user = await User.findById(req.user.id);

 // If user is not found, return 404
 if(!user){
  return res.status(404).json({message: "User not found"});
 }

 // Destructuring the request body to get the email details
const { to, subject , message } = req.body;

// Sending the email using the sendEmail function from the Mail service
await sendEmail(to, subject, `<b>Keep up the great coding! ${message}</b>`);

// On Successfully sending the email, we save the mail details in the database
await Mail.create({
  name: user.name,
  SenderEmail: user.email,
  RecipientEmail: to,
  Subject: subject,
  Body: message,
});

  res.send("Mail sent successfully");
}

module.exports = {
  sendMail
}