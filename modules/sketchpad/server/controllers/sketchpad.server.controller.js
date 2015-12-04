/**
 * Created by longtan on 11/30/15.
 */
'use strict';

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Sketchpad = mongoose.model('Sketchpad');
/**
 * Show all works with specified user
 */
exports.showById = function (req, res) {
};

/**
 * Show all
 */
exports.showAll = function (req, res) {
    Sketchpad.find({}).sort('-created').populate('author', 'title','authorImageURL','sketchImageURL').exec(function (err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(sketchs);
    });
};

exports.save = function (req, res) {
    var user = req.user;


    console.log(req.body);
    var data = req.body.dataURL.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    const filename = crypto.randomBytes(16) + Date.now();
    fs.writeFile(config.uploads.sketchSave.dest + filename, buf, function(err){
        if(err) throw err;
        console.log('!saved!');
        var sketchpad = new Sketchpad({
            title:req.body.title,
            author:user.displayName,
            authorImageURL:user.profileImageURL,
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
        });

    });

    //var upload = multer(config.uploads.sketchSave).single('newSketch');
    //var sketchSaveFileFilter = require(path.resolve('./config/lib/multer')).sketchSaveFileFilter;

    // Filtering to upload only images
    //upload.fileFilter = sketchSaveFileFilter;
    //
    //if (user) {
    //    upload(req, res, function (uploadError) {
    //        if(uploadError) {
    //            return res.status(400).send({
    //                message: 'Error occurred while saving sketch.'
    //            });
    //        } else {
    //            sketchpad.profileImageURL = config.uploads.sketchSave.dest + req.file.filename;
    //            sketchpad.save(function (saveError) {
    //                if (saveError) {
    //                    return res.status(400).send({
    //                        message: errorHandler.getErrorMessage(saveError)
    //                    });
    //                } else {
    //                   //when the sketch saved successfully
    //                }
    //            });
    //        }
    //    });
    //} else {
    //    res.status(400).send({
    //        message: 'You must signed in to save your sketch'
    //    });
    //}
};