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
var SketchpadSchema = new Schema({
    title: {
        type: String
    },
    authorId:{
        type: String
    },
    author: {
        type: String
    },
    authorImageURL: {
        type: String
    },
    sketchImageURL: {
        type:String
    },
    created: {
        type: Date,
        default: Date.now
    },
    comments: [],
    newComment: {
        type: Boolean,
        default: false
    },
    sticky:{
        type: Boolean,
        default: false
    },
    totalRating:{
        type: Number,
        default:0
    },
    avgRating: {
        type: Number,
        default:0
    },
    ratedTimes: {
        type: Number,
        default: 0
    }

});


mongoose.model('Sketchpad', SketchpadSchema);
