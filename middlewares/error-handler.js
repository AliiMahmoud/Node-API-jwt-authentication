// Getting the Node current environemet
let isProduction = (process.env.NODE_ENV === 'production')

function errorHandler(err, _req, res, _next) {

    // Print Stack trace while developing only
    if (!isProduction)
        console.log(err.stack);

    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    // jwt authentication error
    if (err.name === 'UnauthorizedError') {
        switch (err.code) {
            case 'invalid_token': return res.status(401).json({ message: 'invalid_token' })
            case 'credentials_required': return res.status(401).json({ message: 'No authorization token was found' })
            default: break
        }
        return res.status(401).json({ message: 'Authentication error' });
    }

    // default to 500 server error
    return res.status(err.status || 500).json({ message: err.message });
}

module.exports = errorHandler;