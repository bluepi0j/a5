
var express = require('express'),
    path = require('path'),
    config = require('../config'),
    logger = require('./logger'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    consolidate = require('consolidate'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
//methodOverride = require('method-override'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    compress = require('compression'), //improve front end performance
    helmet = require('helmet'); //helmet module to handle security issues



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
   //app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
    app.locals.facebookAppId = config.facebook.clientID;
    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;
   // app.locals.livereload = config.livereload;
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
* Initialize application middleware
*/
module.exports.initMiddleware = function (app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');

    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
    // Should be placed before express.static
    //app.use(compress({
    //    filter: function (req, res) {
    //        return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    //    },
    //    level: 9
    //}));

    // Initialize favicon middleware
    app.use(favicon(app.locals.favicon, {
        maxAge:	86400000
    }));

    // Enable logger (morgan)
    app.use(morgan(logger.getFormat(), logger.getOptions()));

    // Environment dependent middleware
    //if (process.env.NODE_ENV === 'development') {
    //    // Disable views cache
    //    app.set('view cache', false);
    //} else if (process.env.NODE_ENV === 'production') {
    //    app.locals.cache = 'memory';
    //}

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    //app.use(methodOverride());

    // Add the cookie parser and flash middleware
    app.use(cookieParser());
    app.use(flash());
};

/**
 * Configure view engine
 */
module.exports.initViewEngine = function (app) {
    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set views path and view engine
    app.set('view engine', 'server.view.html');
    app.set('views', './');
};

/**
 * Configure Helmet headers configuration
 */
module.exports.initHelmetHeaders = function (app) {
    // Use helmet to secure Express headers
    var SIX_MONTHS = 15778476000;
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
};

/**
 * Configure Express session
 */
module.exports.initSession = function (app, db) {
    // Express MongoDB session storage
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionCookie.maxAge,
            httpOnly: config.sessionCookie.httpOnly,
            secure: config.sessionCookie.secure && config.secure.ssl
        },
        key: config.sessionKey,
        store: new MongoStore({
            mongooseConnection: db.connection,
            collection: config.sessionCollection
        })
    }));
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
    // Setting the app router and static folder NOTE: Chache Control is added
    app.use('/', express.static(path.resolve('./public'),{
        maxAge:	86400000
    }));
    // Globbing static routing NOTE: Chache Control is added
    config.folders.client.forEach(function (staticPath) {
        app.use(staticPath, express.static(path.resolve('./' + staticPath),{
            maxAge:	86400000
        }));
    });
};

/**
 * Configure the modules ACL policies
 */
module.exports.initModulesServerPolicies = function (app) {
    // Globbing policy files
    config.files.server.policies.forEach(function (policyPath) {
        require(path.resolve(policyPath)).invokeRolesPolicies();
    });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
    // Globbing routing files
    config.files.server.routes.forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });
};

/**
 * Configure error handling
 */
module.exports.initErrorRoutes = function (app) {
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {
            return next();
        }

        // Log it
        console.error(err.stack);

        // Redirect to error page
        res.redirect('/server-error');
    });
};

/**
 * Invoke modules server configuration
 */
module.exports.initModulesConfiguration = function (app, db) {
    config.files.server.configs.forEach(function (configPath) {
        require(path.resolve(configPath))(app, db);
    });
};

/**
 * Initialize the Express application
 */
module.exports.init = function (db) {
    // Initialize express app
    var app = express();
    this.initLocalVariables(app);
    this.initMiddleware(app);
    this.initViewEngine(app);
    this.initSession(app, db);
    this.initModulesConfiguration(app);
    this.initModulesClientRoutes(app);
    this.initModulesServerRoutes(app);
    this.initModulesServerPolicies(app);
    this.initErrorRoutes(app);
    // Init helmet headers
    this.initHelmetHeaders(app);
    return app;
};
