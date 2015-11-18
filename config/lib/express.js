var express = require('express'),
    path = require('path'),
    config = require('../config'),
    bodyParser = require('body-parser');


/**
 * Initialize local variables
 */
module.exports.initLocalVariables = function (app) {
    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    if (config.secure && config.secure.ssl === true) {
        app.locals.secure = config.secure.ssl;
    }
    app.locals.keywords = config.app.keywords;
    app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
    app.locals.facebookAppId = config.facebook.clientID;
    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;
    app.locals.livereload = config.livereload;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
};

/**
 * Initialize the Express application
 */
module.exports.init = function (db) {
    // Initialize express app
    var app = express();


    return app;
};
