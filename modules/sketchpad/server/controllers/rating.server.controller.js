/**
 * Created by longtan on 12/5/15.
 */

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/config')),
    Sketchpad = mongoose.model('Sketchpad'),
    Comment = mongoose.model('Comment');
    Rating = mongoose.model('Rating');

/**
 *Show current user's rating on a sketch
 */
exports.showUserRatingBySketchId = function (req, res) {
    var sketchId = req.params.sketchId;
    var user = req.user;
    Rating.find({sketchId:sketchId, userId:user._id}).exec(function (err, rating) {
        if (err) {
            return err;
        }

        res.json(rating);
    });
};

/**
 *Save current user's rating on a sketch. If not rated for it yet, create a new
 * rating; if rated before, update the rating. Recalculate sketch's overall rating
 * and ratedTimes accordingly.
 */
exports.rateBySketchId = function (req, res) {
    var sketchId = req.params.sketchId;
    var user = req.user;
    var myRating = req.body.rate;
    Rating.find({sketchId:sketchId, userId:user._id}).exec(function (err, doc) {
        if (err) {
            return err;
        }
        if(doc.length == 0){
            var newRating = new Rating ({
                userId: user._id,
                sketchId: sketchId,
                rating: myRating
            });
            Sketchpad.findById(sketchId).exec(function (err, sketch) {
                if (err) {
                    return err;
                }
                newRating.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    var tempTimes = sketch.ratedTimes;
                    sketch.totalRating += newRating.rating;
                    sketch.ratedTimes = tempTimes + 1;
                    sketch.avgRating = (sketch.totalRating)/(sketch.ratedTimes);



                    sketch.save(function(err){
                        if (err) {
                            return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                            });
                        } else {
                            res.send({
                                message: 'Success'
                            });
                        }
                    });
                });
            });

        } //else{



            //var oldRating = doc.rating;
            //doc.rating = myRating;
            //console.log('#######rating Updating' + doc);
            //console.log('#######rating Updating' + doc.rating);
            //
            //doc.save();
            //console.log('#######rating Updating' + doc);
            //console.log('#######rating Updating' + doc.rating);
            //
            //
            //Sketchpad.findById(sketchId).exec(function (err, sketch) {
            //    if (err) {
            //        return err;
            //    }
            //    var tempTimes = sketch.ratedTimes;
            //    var tempRating = sketch.avgRating;
            //
            //    sketch.avgRating = (tempRating*tempTimes - oldRating + myRating)/tempTimes;
            //
            //    sketch.save(function(err){
            //        if (err) {
            //            return res.status(400).send({
            //                message: errorHandler.getErrorMessage(err)
            //            });
            //        } else {
            //            res.send({
            //                message: 'Success'
            //            });
            //        }
            //    });
            //
            //});

            //Sketchpad.findById(sketchId).exec(function (err, sketch) {
            //    if (err) {
            //        return err;
            //    }
            //    doc.save(function (err) {
            //        if (err) {
            //            return res.status(400).send({
            //                message: errorHandler.getErrorMessage(err)
            //            });
            //        }
            //        var tempTimes = sketch.ratedTimes;
            //        var tempRating = sketch.avgRating;
            //
            //        sketch.avgRating = (tempRating*tempTimes - oldRating + rate.rating)/tempTimes;
            //
            //        sketch.save(function(err){
            //            if (err) {
            //                return res.status(400).send({
            //                    message: errorHandler.getErrorMessage(err)
            //                });
            //            } else {
            //                res.send({
            //                    message: 'Success'
            //                });
            //            }
            //        });
            //    });
            //});
        //}

    });
};