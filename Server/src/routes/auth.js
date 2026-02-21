const Router = require("express").Router();

const { Register, Login, VerifyMagicLink } = require("../controllers/auth");

Router.post("/register", Register);
Router.post("/login", Login);
Router.post("/verify-signup", VerifyMagicLink);

module.exports = Router;