/**
 * Created by longtan on 12/1/15.
 */

'use strict';

module.exports = function (app) {
    // Sketchpad Routes
    var sketchpad = require('../controllers/sketchpad.server.controller');

    // Setting up the sketchpad api
    app.route('/api/sketchpad/showall').get(sketchpad.showAll);
    app.route('/api/sketchpad/save').post(sketchpad.save);
    app.route('/api/sketchpad/:userId').get(sketchpad.showById);
    //app.route('/api/sketchpad/readcomment').put(sketchpad.readcomment);

};
