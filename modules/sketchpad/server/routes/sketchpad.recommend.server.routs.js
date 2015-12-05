/**
 * Created by longtan on 12/5/15.
 */
'use strict';

module.exports = function (app) {
    // Sketchpad Routes
    var recommend = require('../controllers/sketchpad.recommend.server.controller');

    // Setting up the sketchpad api
    app.route('/api/sketchpad/recommend/rating').get(recommend.recommendByRating);
    app.route('/api/sketchpad/recommend/ratedtimes').get(recommend.recommendByRatedTimes);

};
