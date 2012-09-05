'use strict';

exports.SimpleRequest = function(options) {
    if (!options || typeof options !== 'object') {
        options = {};
    }
    var originsList = options.originsList || [];
    var exposedHeaders = options.exposedHeaders || [];

    return function(req, res, next) {
        var origin = req.headers.origin;
        var host = req.headers.host;

        if (!origin) {
            next();
        }

        if (host !== origin || originsList.indexOf(origin) === -1) {
            next();
        }

        res.setHeader('Access-Control-Allow-Origin', origin);

        if (exposedHeaders.length) {
            res.setHeader('Access-Control-Expose-Headers', exposedHeaders.join(', '));
        }

        next();
    };
};

exports.PreflightRequest = function(options) {
    if (!options || typeof options !== 'object') {
        options = {};
    }
    return function(req, res, next) {
    };
};