/**
 * Created by longtan on 12/5/15.
 */
module.exports = function (app) {
    var rating = require('../controllers/rating.server.controller');

    app.route('/api/rating/save/:sketchId').post(rating.rateBySketchId);
    app.route('/api/rating/show/:sketchId').get(rating.showUserRatingBySketchId);
};