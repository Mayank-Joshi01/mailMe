import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

// 1. Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER, 
    pass: process.env.NODEMAILER_KEY 
  }
});

export const sendEmail =  (to, subject, html) => {
   transporter.sendMail({ from: process.env.NODEMAILER_USER, to, subject, html });
};