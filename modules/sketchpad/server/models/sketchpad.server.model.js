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
var UserSchema = new Schema({
    name: {
        type: String
    },
    author: {
        type: String
    },
    sketchImageURL: {
        type:String
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Sketch', UserSchema);
