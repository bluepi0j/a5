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
    author: {
        type: String
    },
    text: {
        type: String
    },
    sketchAuthor: {
        type:String
    },
    sketchID: {
        type: Object
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Comment', UserSchema);