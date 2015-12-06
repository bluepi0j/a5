/**
 * Created by longtan on 11/30/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Sketch Schema
 */
var CommentSchema = new Schema({
    username: {
        type: String
    },
    userId:{
        type: String
    },
    sketchId: {
        type: String
    },
    userImageURL: {
        type: String
    },
    text: {
       type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Comment', CommentSchema);