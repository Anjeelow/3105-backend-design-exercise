const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
    windowMs: 30 * 1000, 
    max: 5, 
    message: { error: "Too many requests, please try again later." },
});

module.exports = rateLimitMiddleware;

