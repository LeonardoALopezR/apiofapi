const mongoose = require('mongoose');
const Task = require('../models/SchemaApi');
const request = require('request');
var resp = new Array;
const async = require('async')

exports.rqt = (req, res) => {
    console.log(req.task.length);
    console.log(req.task[0]._id);
    console.log(req.task[0].host + req.task[0].path + req.task[0].query);
    console.log(req.task[0].post[0].password);
    let i = 0;


    async.each(req.task, (task, cb) => {
        console.log('===>', task)
        request({
            method: task.method,
            uri: task.host + task.path + task.query,
            body: JSON.stringify({
                email: req.task[0].post[0].email,
                password: req.task[0].post[0].password,
            }),
            timeout: task.timeout,
            // alternatively pass an object containing additional options,
        }, (error, response, body) => {
            if (error) {
                cb(error)
                return console.error('upload failed:', error); 
            }
            else {
                console.log(`Upload successful!  Server responded with: ${response.statusCode}`);
                resp.push(response.statusCode);
                cb()
            }
            
        })
    }, (err, data) => {
        
        console.log('Ya termine de recorrer', resp)
    })
}