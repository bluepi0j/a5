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
        
        User.findById(sketch.authorId).exec(function(err,author) {
            if (err){
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            sketch.author = author.displayName;
            sketch.authorImageURL = author.profileImageURL;
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
 * Add a sketch to user's collection.
 */
exports.collect = function(req, res) {
    var user = req.user;
    var sketchId = req.body.sketchId;
    if (user.collections.indexOf(sketchId) <0){
        user.collections.push (sketchId);
        user.save(function (err) {
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
        res.send({
            message: 'Already collected'
        });
    }
}

/**
 * Read sketch's comments of the user, and reset the flag to false.
 */
exports.readComment = function(req, res) {
    var sketchId = req.body.sketchId.sketchId;
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
            if(sketch.authorId == user._id){
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
            User.findById(entry.authorId).exec(function(err,author) {
                if (err){
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }

                entry.author =author.displayName;
                entry.authorImageURL = author.profileImageURL;
                result.push(entry);
                if (result.length == list.length){
                    res.json(result);
                }
            });

        });

    });
}

/**
 * Show all sketch artwork collection of a user according to user's id.
 */
exports.myCollection = function(req, res) {
    var user = req.user;
    var result = [];
    if (user.collections.length == 0) {
        return res.json(result);
    }
    user.collections.forEach(function(entry, index, list){
        Sketchpad.findById(entry).exec(function(err, sketch){

            User.findById(sketch.authorId).exec(function(err,author) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                sketch.author = author.displayName;
                sketch.authorImageURL = author.profileImageURL;
                result.push(sketch);

                if (result.length == list.length) {
                    res.json(result);
                }
            });
        });
    });
}

/**
 * Show all sketch artworks
 */
exports.showAll = function (req, res) {
    Sketchpad.find().sort('-created').exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        var result =[];

        sketchs.forEach(function(entry, index, list){
            User.findById(entry.authorId).exec(function(err,author) {
                if (err){
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                entry.author = author.displayName;
                entry.authorImageURL = author.profileImageURL;
                if (entry.sticky == true){
                    result.splice(0, 0, entry);
                }else{
                    result.push(entry);
                }
                if (result.length == list.length){
                    res.json(result);
                }
            });

        });

    });
};

/**
 * Make a sketch post sticky.
 */
exports.makeSticky = function (req, res) {
    var id = req.body.sketch._id;
    Sketchpad.findById(id).exec(function(err, result){
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        result.sticky = true;
        result.save(function(err){
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

/**
 * Make a sketch post NOT sticky.
 */
exports.removeSticky = function (req, res) {
    var id = req.body.sketch._id;
    Sketchpad.findById(id).exec(function(err, result){
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        result.sticky = false;
        result.save(function(err){
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

/**
 * Save the new sketch into database
 */
exports.save = function (req, res) {
    var user = req.user;
    var data = req.body.dataURL.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');

    var filename = crypto.randomBytes(16).toString('hex') + Date.now();

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