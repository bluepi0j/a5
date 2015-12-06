/**
 * Created by longtan on 11/30/15.
 */
'use strict';

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    crypto = require('crypto'),
    config = require(path.resolve('./config/config')),
    User = mongoose.model('User'),
    Sketchpad = mongoose.model('Sketchpad');

/**
 * Find the sketch by id.
 */
exports.findSketchById = function(req, res) {
    var id = req.params.sketchId;

    Sketchpad.findById(id).exec(function (err, sketch) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        
        User.findById(sketch.authorId).exec(function(err,user) {
            if (err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            sketch.author = user.displayName;
            sketch.authorImageURL = user.profileImageURL;
            res.json(sketch);
        });
    });
}

/**
 * Check all sketchs of the user to see which ones have unread comments.
 */
exports.checkNewComment = function(req, res) {
    var user = req.user;
    Sketchpad.find({authorId: user._id, newComment:true}).exec(function (err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(sketchs);
    });
}

/**
 * Read sketch's comments of the user, and reset the flag to false.
 */
exports.readComment = function(req, res) {
    var sketchId = req.body.sketchId;
    var user = req.user;
    if(sketchId == null){
        return res.status(400).send({
            message: 'No sketch object found'
        });
    }else{
        Sketchpad.findById(sketchId).exec(function(err, sketch){
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            if(sketch.authorId = user._id){
                sketch.newComment = false;
                sketch.save(function(err){
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    res.send({
                        message: 'Success'
                    });
                });
            }else{
                console.log("Other user visiting sketch");
            }

        });

    }
}


/**
 * Show all sketchs of a user according to user's id.
 */
exports.showById = function(req, res) {
    var id = req.params.userId;
    Sketchpad.find({authorId: id}).exec(function (err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        var result =[];
        sketchs.forEach(function(entry, index, list){
            User.findById(entry.authorId).exec(function(err,user) {
                if (err){
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                //if(!user){
                //    console.log("cannot find the user with id: " + sketchs[i].authorId);
                //}else{
                //console.log("sketchs------" + entry);
                entry.author = user.displayName;
                entry.authorImageURL = user.profileImageURL;
                result.push(entry);
                //console.log("!!!!!!!!result: " + result);
                if (result.length == list.length){
                    res.json(result);
                }
            });

        });

    });
}

/**
 * Show all sketch with the corresponding user info
 */
exports.showAll = function (req, res) {
    Sketchpad.find().sort('-created').exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        var result =[];
        //var temp;
        //for (var i = 0; i < sketchs.length; i++){
        //    console.log("!!!!!!!!index: " + 1);
        //    temp = sketchs[i];
        //    User.findById(sketchs[i].authorId).exec(function(err,user) {
        //        if (err){
        //            return res.status(400).send({
        //                message: errorHandler.getErrorMessage(err)
        //            });
        //        }
        //        //if(!user){
        //        //    console.log("cannot find the user with id: " + sketchs[i].authorId);
        //        //}else{
        //        console.log("sketchs we got is at index: " + i + " - " + temp);
        //            temp.author = user.displayName;
        //            temp.authorImageURL = user.profileImageURL;
        //            result.push(temp);
        //    });
        //}
        sketchs.forEach(function(entry, index, list){
            User.findById(entry.authorId).exec(function(err,user) {
                if (err){
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                //if(!user){
                //    console.log("cannot find the user with id: " + sketchs[i].authorId);
                //}else{
                //console.log("sketchs------" + entry);
                entry.author = user.displayName;
                entry.authorImageURL = user.profileImageURL;
                result.push(entry);
                if (result.length == list.length){
                    res.json(result);
                }
            });

        });

    });
};

/**
 * Save the new sketch into database
 */
exports.save = function (req, res) {
    var user = req.user;
    //console.log(req.body);
    var data = req.body.dataURL.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    const filename = crypto.randomBytes(16).toString('hex') + Date.now();

    fs.writeFile(config.uploads.sketchSave.dest + filename, buf, function(err){
        if(err) throw err;
        var sketchpad = new Sketchpad({
            title:req.body.title,
            author:user.displayName,
            //authorImageURL:user.profileImageURL,
            authorId:user._id,
            sketchImageURL: config.uploads.sketchSave.dest + filename,
            comments: []
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

/**
 * Delete the sketch.
 */
exports.delete = function (req, res) {
    var sketch = req.model;

    sketch.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(sketch);
    });
};