const Router = require("express").Router();
const { sendMail } = require("../controllers/mail");


Router.post("/send", sendMail);

module.exports = Router;