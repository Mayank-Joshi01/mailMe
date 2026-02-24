// const Router = require("express").Router();
// const { sendMail } = require("../controllers/mail");
// const rateLimit = require('express-rate-limit');
// const AuthMiddleware = require("../middlewares/AuthenticateToken");

// // Define the limit rule
// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 25, // Limit each IP to 5 login requests per 'window'
//     message: {
//         message: "Too many login attempts, please try again after 15 minutes"
//     },
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });


// Router.post("/send", loginLimiter, AuthMiddleware, sendMail);


// module.exports = Router;