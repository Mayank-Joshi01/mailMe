const Router = require("express").Router();
const rateLimit = require('express-rate-limit');

// Define the limit rule
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login requests per 'window'
    message: {
        message: "Too many login attempts, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { Register, Login, VerifyMagicLink } = require("../controllers/auth");

Router.post("/register",loginLimiter, Register);
Router.post("/login", loginLimiter, Login);
Router.post("/verify-signup", loginLimiter ,VerifyMagicLink);

module.exports = Router;