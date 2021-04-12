const error = require('./errorHandler');

const apiKeys = ['foo', 'bar', 'baz'];

const apiKeyValidation = (req, res, next) => {
    var key = req.query['api-key'];

    if (!key) {
        return next(error(400, 'api key required'));
    }

    // key is invalid
    if (!apiKeys.includes(key)) {
        return next(error(401, 'invalid api key'));
    }

    // store req.key for route access
    req.key = key;
    next();
}

module.exports = apiKeyValidation;