/**
 * Created by longtan on 12/4/15.
 */

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    config = require(path.resolve('./config/config')),
    Sketchpad = mongoose.model('Sketchpad'),
    Comment = mongoose.model('Comment');


exports.showBySketchId = function (req, res) {
    var sketchId = req.sketchID;
    if (!mongoose.Types.ObjectId.isValid(sketchId)) {
        return res.status(400).send({
            message: 'Sketch to comment is invalid'
        });
    }

    Sketchpad.findById(sketchId).exec(function (err, sketch) {
        if (err) {
            return err;
        }
        var result =[];
        var commentsList = sketch.comments;
        for (var i = 0; i < commentsList.length; i++){
            Comment.findById(commentsList[i]).exec (function (err, comment){
                if (err){
                    return err;
                }if (!comment){
                    continue;
                    console.log('no comment found with such id!');
                }
                result.push(comment);
            });
        }
        res.json(result);
    });

};

exports.save = function (req, res) {
    var user = req.user;

    //console.log(req.body);
    var data = req.body.dataURL.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    const filename = crypto.randomBytes(16).toString('hex') + Date.now();

    fs.writeFile(config.uploads.sketchSave.dest + filename, buf, function (err) {
        if (err) throw err;
        var sketchpad = new Sketchpad({
            title: req.body.title,
            author: user.displayName,
            authorImageURL: user.profileImageURL,
            sketchImageURL: config.uploads.sketchSave.dest + filename,
            comments: [],
            newcomment: {
                type: Boolean,
                default: false
            }
        });

        sketchpad.save(function (err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            res.send({
                message: 'Success'
            });
        });

    });
};