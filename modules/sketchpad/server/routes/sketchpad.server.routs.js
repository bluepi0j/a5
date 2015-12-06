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
    app.route('/api/sketchpad/find/:sketchId').get(sketchpad.findSketchById);
    app.route('/api/sketchpad/notification/checknew').get(sketchpad.checkNewComment);
    app.route('/api/sketchpad/notification/readcomment').put(sketchpad.readComment);
    app.route('/api/sketchpad/collection/collect').put(sketchpad.collect);
    app.route('/api/sketchpad/collection/showcollection').get(sketchpad.myCollection);
};
