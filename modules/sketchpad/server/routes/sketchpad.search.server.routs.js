/**
 * Created by Kenan Deng on 12/04/15.
 */
'use strict';

module.exports = function (app) {
    // Sketchpad Routes
    var sketchpad = require('../controllers/sketchpad.search.server.controller');

    // Setting up the sketchpad api
    app.route('/api/search/title/:titleString').get(sketchpad.searchTitle);
    app.route('/api/search/user/:userString').get(sketchpad.searchUser);
    //app.route('/api/sketchpad/readcomment').put(sketchpad.readcomment);

};

