'use strict';

module.exports = function (app) {
    // Sketchpad Routes
    var sketchpad = require('../controllers/sketchpad.server.controller');

    // Setting up the sketchpad api
    app.route('/api/sketchpad').get(sketchpad.showAll);

};
