/**
 * Created by longtan on 12/5/15.
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
var RatingSchema = new Schema({
    userId:{
        type: String
    },
    sketchId: {
        type: String
    },
    rating: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Rating', RatingSchema);