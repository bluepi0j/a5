/**
 * Created by longtan on 12/4/15.
 */

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/config')),
    Sketchpad = mongoose.model('Sketchpad'),
    Comment = mongoose.model('Comment');


exports.show = function (req, res) {
    var sketchId = req.params.sketchID;

    Sketchpad.findById(sketchId).exec(function (err, sketch) {
        if (err) {
            return err;
        }
        console.log(sketch);

        var result =[];
        var commentsList = sketch.comments;
        for (var i = 0; i < commentsList.length; i++){
            Comment.findById(commentsList[i]).exec (function (err, comment){
                if (err){
                    return err;
                }if (!comment){
                    console.log('no comment found with such id!');
                } else{
                    result.push(comment);
                }
            });
        }
        res.json(result);
    });

};

exports.save = function (req, res) {
    var sketchId = req.params.sketchID;
    var user = req.user;

    var newComment = new Comment ({
        userId: user._id,
        sketchId: sketchId,
        text: req.text,
    });
    Sketchpad.findById(sketchId).exec(function (err, sketch) {
        if (err) {
            return err;
        }
        newComment.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            sketch.newcomment = true;
            sketch.comments.push(newComment._id);
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
};