const Router = require("express").Router();
const rateLimit = require('express-rate-limit');
const cors = require('cors');
dotenv = require('dotenv');
dotenv.config();

// Define the limit rule
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 5 login requests per 'window'
    message: {
        message: "Too many login attempts, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const FrontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

const { Register, Login, VerifyMagicLink,GetUserInfo } = require("../controllers/auth");
const { validateUserRegistration, validateUserLogin, validateUrl,handleValidationErrors} = require('../middlewares/userValidator');
const authenticateToken = require('../middlewares/AuthenticateToken');

Router.use(cors({ origin: FrontendURL }));

// 1. Register Route - Generates magic link and sends email
Router.post("/register", rateLimiter, validateUserRegistration, handleValidationErrors, Register);

// 2. Login Route - verifies credentials and generate JWT token
Router.post("/login",  rateLimiter, validateUserLogin, handleValidationErrors, Login);

// 3. Verify Magic Link Route - Verifies magic url creates user session and generates JWT 
Router.post("/verify-signup", rateLimiter, validateUrl, handleValidationErrors, VerifyMagicLink);

// 4. Get User Info Route - Protected route to get user info (for testing purposes)
Router.get("/me", authenticateToken, GetUserInfo);

module.exports = Router;