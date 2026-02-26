const { body, validationResult } = require('express-validator');

// Validation rules for User Registration (Signup)
const validateUserRegistration = [
    body('name', 'Name must be at least 4 characters long')
        .notEmpty()
        .trim()
        .isLength({ min: 4 })
        .escape(),
        
    body('email', 'Please include a valid email')
        .isEmail()
        .normalizeEmail(),
        
    body('password', 'Password must be at least 8 characters long')
        .isLength({ min: 8 })
];

// Validation rules for User Login
const validateUserLogin = [
    body('email', 'Please include a valid email')
        .isEmail()
        .normalizeEmail(),
        
    body('password', 'Password is required')
        .exists()
        .notEmpty() // Ensure password is not empty
];


const validateUrl = [
    body('email', 'Please include a valid email')
        .isEmail()
        .normalizeEmail() ,

    body('token', 'Token is required')
        .exists()
        .notEmpty() // Ensure token is not empty
    
];
// Reusable middleware to catch the errors (You can import this from your existing file or redefine it here)
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); 
};

module.exports = { 
    validateUserRegistration, 
    validateUserLogin,
    validateUrl,
    handleValidationErrors 
};