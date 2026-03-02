const Router = require('express').Router();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { EntriesSubmission , GetEntries , DeleteEntries } = require('../controllers/entries');


// 1. Centralized CORS Configurations
const publicCors = cors({
    origin: '*', // Allow all for the public submission form
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'publicid'] // Explicitly allow your custom header
});

const privateCors = cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true // Usually needed for cookies/sessions in private dashboards
});


//  No auth required, but protected by the 'publicid' check in your controller  //  
Router.route('/submit')
    .options(publicCors)
    .post(publicCors, EntriesSubmission);

/** * PRIVATE ROUTES
 * Requires user to be logged in and own the project
 */
Router.use('/:projectId', privateCors); // Apply private CORS to all routes with projectId

Router.get('/get/:projectId', GetEntries);
Router.delete('/delete/:projectId', DeleteEntries);



module.exports = Router;