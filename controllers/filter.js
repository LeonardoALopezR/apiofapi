const mongoose = require('mongoose');
const request = require('request');
const async = require('async');
var URL= "http://d17.maxipublica.com/sendmail/?sellerId=1";

exports.filter = (req, res, next) => {
    async.each(req.resp, (resp, cb) => {
        console.log(resp.toEmail);
        if(resp.statusCode !== 200)
        {
            console.log('X:',resp.statusCode);
            // Task.push(resp);
            request({
                        method: "POST",
                        uri: URL,
                        body:{
                        to: resp.toEmail,
                        userName: "UserName",
                        templateId: "reportApi",
                        name: resp.name,
                        description: resp.description,
                        statusCode: resp.statusCode,
                        url: resp.host + resp.path + resp.query,
                        developer: resp.developer
                        },json:true
                    },(err,data,body)=>{
                        if(!err)
                        {
                            console.log(data.body);
                        }
                        else{
                            console.log(err);
                        }
                    }) 
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
    res.send(req.resp)
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