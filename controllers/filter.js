const mongoose = require('mongoose');
const Task = require('../models/SchemaApi');
const request = require('request');
const async = require('async');

exports.filter = (req, res, next) => {
    async.each(req.resp, (resp, cb) => {
        if(resp.statusCode !== 200)
        {
            console.log('X:',resp.statusCode);
        }
        else{
            console.log('200',resp.statusCode);
        }
        cb();
    }, (err, data) => {
        if (!err){
        console.log('Ya termine de recorrer')
        }
        else{
            console.log('error')
        }
    })
}

exports.sfilter = (req, res, next) => {
        if(req.resp.statusCode !== 200)
        {
            console.log('X:',req.resp.statusCode);
        }
        else{
            console.log('200',req.resp.statusCode);
        }
    }