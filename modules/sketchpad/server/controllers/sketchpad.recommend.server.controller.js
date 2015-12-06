/**
 * Created by longtan on 12/5/15.
 */
'use strict';

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/config')),
    Sketchpad = mongoose.model('Sketchpad'),
    User = mongoose.model('User');

/**
 * Find user's interest for user's searching.
 */
exports.learnInterest = function (req,res) {
    var user = req.user;
    var keyword = req.params.titleString;
    if (user.interest.length < 5){
        user.push(keyword);
    }else{
        user.interest.slice(0,1);
        user.push(keyword);
    }
}

/**
 * Recommend sketch to users according to their past activity.
 */
exports.recommend = function (req, res) {
    var user = req.user;
    var randomnumber = Math.floor(Math.random()* user.interest.length);
    var result = [];
    var keyword = user.interest[randomnumber];
    Sketchpad.find({ title: { $regex:  new RegExp('^'+keyword) } }).exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        if (sketchs.length != 0){
            sketchs.forEach(function(entry, index, list){
                User.findById(entry.authorId).exec(function(err,user) {
                    if (err){
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    entry.author = user.displayName;
                    entry.authorImageURL = user.profileImageURL;
                    result.push(entry);
                    if (result.length == list.length || result.length == 6){
                        res.json(result);
                    }
                });
            });
        }else {
            res.json(result);
        }
    });

};

/**
 * Recommend sketch by average rating.
 */
exports.recommendByRating = function (req, res) {
    Sketchpad.find().sort('-avgRating').exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        var result =[];
        if (sketch == 0) {
            res.json(result);
        } else {
            sketchs.forEach(function(entry, index, list){
                User.findById(entry.authorId).exec(function(err,user) {
                    if (err){
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    entry.author = user.displayName;
                    entry.authorImageURL = user.profileImageURL;
                    result.push(entry);
                    if (result.length == list.length || result.length == 4){
                        res.json(result);
                    }
                });

            });
        }

    });
};

/**
 * Recommend sketch by rated times.
 */
exports.recommendByRatedTimes = function (req, res) {
    Sketchpad.find().sort('-ratedTimes').exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        var result =[];

        if (sketch == 0) {
            res.json(result);
        } else {
            sketchs.forEach(function(entry, index, list){
                User.findById(entry.authorId).exec(function(err,user) {
                    if (err){
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    entry.author = user.displayName;
                    entry.authorImageURL = user.profileImageURL;
                    result.push(entry);
                    if (result.length == list.length || result.length == 4){
                        res.json(result);
                    }
                });

            });
        }
    });
};

