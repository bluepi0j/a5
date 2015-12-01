/**
 * Created by longtan on 11/30/15.
 */
'use strict';

/**
 * Show all works with specified user
 */
exports.showById = function (req, res) {
};

/**
 * Show all
 */
exports.showAll = function (req, res) {
    User.find({}).sort('-created').populate('author', 'name','sketchImageURL').exec(function (err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(sketchs);
    });
};
