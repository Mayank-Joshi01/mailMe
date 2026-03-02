const Router = require('express').Router();
const cors = require('cors');

const { SubmitForm } = require('../controllers/entries');

// This handles the "Is it okay if I send a POST?" question from the browser
Router.options('/submit', cors({origin:'*'}));

Router.post('/submit', cors({origin:'*'}), SubmitForm);

module.exports = Router;