/**
 * Created by longtan on 12/4/15.
 */
'use strict';

module.exports = function (app) {
    // Sketchpad Routes
    var comments = require('../controllers/comments.server.controller');

    // Setting up the sketchpad api
    app.route('/api/comments/show/:sketchId').get(comments.show);
    app.route('/api/comments/save/:sketchId').post(comments.save);
    //app.route('/api/sketchpad/readcomment').put(sketchpad.readcomment);

};
