const { body, validationResult } = require('express-validator');


// Custom reusable function for domain validation
const validateDomainFormat = (value) => {
    if (!value) return true; 

    // 1. Instantly reject if they forgot the protocol
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
        throw new Error('Domain must include http:// or https:// (e.g., "https://example.com")');
    }

    // 2. Strip the protocol temporarily just to check for illegal paths/slashes
    const withoutProtocol = value.replace(/^https?:\/\//, '');
    if (withoutProtocol.includes('/')) {
        throw new Error('Domain must not contain paths or trailing slashes (e.g., use "https://example.com")');
    }

    // 3. Strict Regex enforcing protocol, valid domain/IP, and optional port
    const domainRegex = /^https?:\/\/(([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d{1,5})?$/;   
    
    if (!domainRegex.test(value)) {
        throw new Error('Must be a valid URL (e.g., "https://example.com" or "http://127.0.0.1:5500")');
    }

    return true; 
};


// Validation rules for Creating a project
const validateCreateProject = [
    body('name', 'Project name is required').notEmpty().trim().escape(),
    body('allowedDomain').optional().trim().custom(validateDomainFormat),
    body('description').optional().trim().escape()
];

// Validation rules for Updating a project
const validateUpdateProject = [
    body('name', 'Project name cannot be empty').optional().notEmpty().trim().escape(),
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