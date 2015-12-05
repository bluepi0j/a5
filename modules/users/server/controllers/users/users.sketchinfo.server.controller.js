'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    config = require(path.resolve('./config/config')),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * read user picture and display name
 */
exports.readUserById = function (req, res) {
    var id = req.params.userId;

    User.findById(id).exec(function (err, user) {
        console.log(user);
        if (err) {
            return res.status(400).send({
                message:"error"
            })
        } else if (!user) {
            return res.status(400).send({
                message:"no user"
            })
        }
        res.json(user);
    });
}
