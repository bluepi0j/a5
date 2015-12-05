/**
 * Created by Kenan Deng on 12/04/15.
 */
'use strict';

var path = require('path'),
    fs = require('fs'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    config = require(path.resolve('./config/config')),
    Sketchpad = mongoose.model('Sketchpad'),
    User = mongoose.model('User');


exports.searchTitle = function(req,res){
    Sketchpad.find({ title: { $regex:  new RegExp('^'+req.params.titleString) } }).sort('-created').exec(function(err, sketchs) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else if(sketchs == null){
            return res.status(400).send({
                message: 'No matches found'
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
                entry.author = user.displayName;
                entry.authorImageURL = user.profileImageURL;
                result.push(entry);
                if (index == list.length - 1){
                    res.json(result);
                }
            });

        });

    });
}

exports.searchUser = function(req,res){
    User.find({ userName: req.params.userString }).sort('-created').exec(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        else if(user == null){
            return res.status(400).send({
                message: 'No matches found'
            });
        }
        else{        
            var i = 0;
            var list = [];
            for (i = 0;i<user.length;i++){
                Sketchpad.find({authorID:user.id},function(err,sketch){
                    if(err){
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    }
                    list.push(sketch);

                })
            }
        }

       
        res.json(list);

    });
}