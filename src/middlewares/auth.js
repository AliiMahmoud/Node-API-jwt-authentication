var jwt = require('express-jwt');

/**
 * Extracts the token from the authorization header
 * @param req - The request object
 * @returns {String} the provided token
 *  */ 
function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0].toLocaleLowerCase() === 'token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0].toLocaleLowerCase() === 'bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

var auth = {
    // For auth required requests  
    required: jwt({
        secret: process.env.SECRET,
        userProperty: 'payload',
        algorithms: ['HS256'],
        getToken: getTokenFromHeader
    }),
    // For auth optional requests
    optional: jwt({
        secret: process.env.SECRET,
        userProperty: 'payload',
        algorithms: ['HS256'],
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;
