const mongoose = require('mongoose');
const Task = require('../models/SchemaApi');
const request = require('request');

exports.rqt = (req,res)=>{
    console.log(req.task.length);
    console.log(req.task[0]._id);
    console.log(req.task[0].host + req.task[0].path + req.task[0].query);
    console.log(req.task[0].post[0].password);
    let i=0;
    while (i < req.task.length){

       request({
                method: req.task[i].method,
                uri: req.task[i].host + req.task[i].path + req.task[i].query,
                body: JSON.stringify({
                    email: req.task[0].post[0].email,
                    password: req.task[0].post[0].password,
                }),
                timeout: req.task[i].timeout,
                // alternatively pass an object containing additional options,
              },
               (error, response, body)=>{
                if (error) {
                  return console.error('upload failed:',error);
                }
                else{
                console.log(`Upload successful!  Server responded with: ${response.statusCode}`);
                }
              })
              i++;
    }
}