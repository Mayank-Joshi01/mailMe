const Router = require('express').Router();
const authenticateToken = require('../middlewares/AuthenticateToken');
const cors = require('cors');
const { GetSummary } = require('../controllers/summary');

const FrontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

// Apply CORS middleware to all routes in this router
Router.use(cors({ origin: FrontendURL }));



Router.get("/", authenticateToken, GetSummary);

module.exports = Router;