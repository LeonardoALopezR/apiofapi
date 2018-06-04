const mongoose = require('mongoose');
const Task = require('../models/SchemaApi');
const request = require('request');
const async = require('async')

exports.rqt = (req, res, next) => {
    console.log(req.task.length);
    console.log(req.task[0]._id);
    console.log(req.task[0].host + req.task[0].path + req.task[0].query);
    console.log(req.task[0].post[0].password);

    async.each(req.task, (task, cb) => {
        console.log('===>', task)
        console.log('->',task.post[0].email)
        request({
            method: task.method,
            uri: task.host + task.path + task.query,
            body: JSON.stringify({
                email: task.post[0].email,
                password: task.post[0].password,
            }),
            timeout: task.timeout,
            // alternatively pass an object containing additional options,
        }, (error, response, body) => {
            if (error) {
                 console.error('upload failed:', error, (task.host + task.path + task.query),task._id);
                 task['statusCode'] = 502;
                 task['Error'] = error;
            }
            else {
                console.log(`Upload successful!  Server responded with: ${response.statusCode}`, (task.host + task.path + task.query));
                task['statusCode'] = response.statusCode;
            }
            cb();
        })
    }, (err, data) => {
        res.send(req.task)
        req.resp= req.task;
        if (!err){
            console.log('//');
        }
        else{
            console.log('error',err);
        }
        next();
    })
}

exports.srqt = (req, res, next) => {
//     console.log(req.task.post[0].email);

//     // async.eachSeries(req.task, (task, cb) => {
//     //     console.log('===>', task)
        request({
            method: req.task.method,
            uri: req.task.host + req.task.path + req.task.query,
            body: JSON.stringify({
                email: req.task.post[0].email,
                password: req.task.post[0].password,
            }),
            timeout: req.task.timeout,
            // alternatively pass an object containing additional options,
        }, (error, response, body) => {
            if (error) {
                 console.error('upload failed:', error, (req.task.host + req.task.path + req.task.query),req.task._id);
                 req.task['statusCode'] = 502;
                 req.task['Error'] = error;
            }
            else {
                console.log(`Upload successful!  Server responded with: ${response.statusCode}`, (req.task.host + req.task.path + req.task.query));
                req.task['statusCode'] = response.statusCode;
            }
            res.send(req.task)
            req.resp= req.task;
            next();
        })
    }
    // })