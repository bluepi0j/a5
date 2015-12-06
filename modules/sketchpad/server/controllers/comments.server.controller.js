/**
 * Created by longtan on 12/4/15.
 */

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/config')),
    Sketchpad = mongoose.model('Sketchpad'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment');

/**
 *Show all comments for a sketch
 */
exports.show = function (req, res) {
    var sketchId = req.params.sketchId;
    var result = [];
    var lastIteration;
    Sketchpad.findById(sketchId).exec(function (err, sketch) {
        if (err) {
            return err;
        }


        //for (var i = 0; i < commentsList.length; i++){
        //    Comment.findById(commentsList[i]).exec (function (err, comment){
        //        if (err){
        //            return err;
        //        }if (!comment){
        //            console.log('no comment found with such id!');
        //        } else{
        //            result.push(comment);
        //        }
        //    });
        //}
        //res.json(result);
        if (sketch.comments.length == 0) {
            res.json(result);
        } else {
            sketch.comments.forEach(function (entry, index, list) {
                Comment.findById(entry).exec(function (err, comment) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    //if(!user){
                    //    console.log("cannot find the user with id: " + sketchs[i].authorId);
                    User.findById(comment.userId).exec(function(err,user) {
                        if (err) {
                            return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                            });
                        }
                        comment.userImageURL = user.profileImageURL;
                        result.push(comment);
                        if (result.length == list.length) {
                            res.json(result);
                        }
                    });

                });

            });
        }
    });
};

/**
 *Create a comment for a sketch, update sketch new comment flag
 */
exports.save = function (req, res) {
    console.log(req);
    var sketchId = req.params.sketchId;
    var user = req.user;
    var text = req.body.text;

    var newComment = new Comment({
        username: user.displayName,
        userId: user._id,
        sketchId: sketchId,
        text: text
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
            sketch.newComment = true;
            sketch.comments.push(newComment._id);
            sketch.save(function (err) {
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