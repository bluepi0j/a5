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
    author: {
        type: String
    },
    authorImageURL:{
        type:String
    },
    authorID:{
        type: Object
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


mongoose.model('Sketchpad', SketchpadSchema);
