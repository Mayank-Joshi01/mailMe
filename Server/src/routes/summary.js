const Router = require('express').Router();
const authenticateToken = require('../middlewares/AuthenticateToken');

const { GetSummary } = require('../controllers/summary');

Router.get("/", authenticateToken, GetSummary);

module.exports = Router;