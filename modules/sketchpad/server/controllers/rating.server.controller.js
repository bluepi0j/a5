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


exports.showUserRatingBySketchId = function (req, res) {
    var sketchId = req.params.sketchId;
    var user = req.user;
    Rating.find({sketchId:sketchId, userId:user._id}).exec(function (err, rating) {
        if (err) {
            return err;
        }
        console.log(rating);

        res.json(rating);
    });
};


exports.rateBySketchId = function (req, res) {
    var sketchId = req.params.sketchId;
    var user = req.user;
    var myRating = req.params.rate;

    Rating.find({sketchId:sketchId, userId:user._id}).exec(function (err, rating) {
        if (err) {
            return err;
        }
        console.log(rating);

        if(!rating){

            var newRating = new Comment ({
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
                    var tempRating = sketch.rating;

                    sketch.rating = (tempRating*tempTimes + newRating.rating)/(tempTimes+1);
                    sketch.ratedTimes = tempTimes + 1;

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

        }else{
            var oldRating = rating.rating;
            rating.rating = myRating;

            Sketchpad.findById(sketchId).exec(function (err, sketch) {
                if (err) {
                    return err;
                }
                rating.save(function (err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    var tempTimes = sketch.ratedTimes;
                    var tempRating = sketch.rating;

                    sketch.rating = (tempRating*tempTimes - oldRating + rating.rating)/tempTimes;

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
        }

    });
};