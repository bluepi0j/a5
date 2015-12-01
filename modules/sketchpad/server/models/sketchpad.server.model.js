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
    authorID:{
        type: ObjectId
    },
    sketchImageURL: {
        type:String
    },
    created: {
        type: Date,
        default: Date.now
    },
    comments: [],
    newcomment: {
        type: Boolean,
        default: false
    }
});


mongoose.model('Sketch', UserSchema);
