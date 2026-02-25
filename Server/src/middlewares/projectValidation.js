const { body, validationResult } = require('express-validator');


// Custom reusable function for domain validation
const validateDomainFormat = (value) => {
    // If empty, let the .optional() chain handle it
    if (!value) return true; 

    // 1. Reject any slashes (blocks paths and trailing slashes)
    if (value.includes('/')) {
        throw new Error('Domain must not contain slashes (e.g., use "example.com" instead of "example.com/")');
    }

    // 2. Reject protocols (blocks http:// and https://)
    if (value.includes('://')) {
        throw new Error('Domain must not include http:// or https:// (e.g., use "example.com")');
    }

    // 3. Regex to match valid domains OR localhost (with optional port for frontend testing)
    // Matches: "example.com", "sub.example.co.uk", "localhost", "localhost:5173"
    const domainRegex = /^([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|localhost(:\d{1,5})?)$/;
    
    if (!domainRegex.test(value)) {
        throw new Error('Must be a valid domain name (e.g., "mywebsite.com" or "localhost:5173")');
    }

    return true; // Validation passed
};


// Validation rules for Creating a project
const validateCreateProject = [
    body('name', 'Project name is required').notEmpty().trim().escape(),
    body('targetEmail', 'A valid target email is required').isEmail().normalizeEmail(),
    body('allowedDomain').optional().trim().custom(validateDomainFormat),
    body('description').optional().trim().escape()
];

// Validation rules for Updating a project
const validateUpdateProject = [
    body('name', 'Project name cannot be empty').optional().notEmpty().trim().escape(),
    body('targetEmail', 'Must be a valid email').optional().isEmail().normalizeEmail(),
    body('allowedDomain').optional().trim().custom(validateDomainFormat),
    body('status', 'Invalid status').optional().isIn(['active', 'inactive'])
];

// Reusable middleware to catch the errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are errors, stop here and return a 400 status
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // If no errors, proceed to your controller logic
};

module.exports = { 
    validateCreateProject, 
    validateUpdateProject, 
    handleValidationErrors 
};