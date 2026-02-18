require("dotenv").config();
const nodemailer = require('nodemailer');

const sendMail = async(req, res) => {

// 1. Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER, 
    pass: process.env.NODEMAILER_KEY 
  }
});

// 2. Define email options
const mailOptions = {
  from: process.env.NODEMAILER_USER,
  to: req.body.to,
  subject: req.body.subject,
  text: req.body.text,
  html: `<b>Keep up the great coding! ${req.body.text}</b>`
};

// 3. Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent: ' + info.response);
});
    
  res.send("Mail sent successfully");
}

module.exports = {
  sendMail
}