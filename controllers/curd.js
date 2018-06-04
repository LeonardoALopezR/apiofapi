const mongoose = require('mongoose');
const Task = require('../models/SchemaApi');
// const request = require('request');
// const url = 'http://localhost:5000'
// 		console.log("url --", url)

exports.list = (req,res,next)=>{
    Task.find({}, (err, task)=> {
        if (task == null){
          res.send('error');
        }
        else{
        // res.json(task);
        req.task = task;
        next();
        }
      });
    }

  exports.rd = (req, res, next)=>{
    Task.findById(req.params.taskId, (err, task)=>{
      if (err){
        res.send(err);
      }
      else{
      // res.json(task);
      req.task = task;
        next();
      }
    });
  };

  exports.crt = (req,res)=>{
            let new_task = new Task(req.body);
                new_task.save((err, task)=> {
                  if (err){
                    res.send(err);
                  }
                  else{
                  res.json(task);
                  }
                });
    };
  
  
  exports.up = (req, res)=> {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, (err, task)=> {
      if (err){
        res.send(err);
      }
      else{
          if(req.body.developer)
          console.log(req.body.developer);
          else
          console.log('No');
      res.json(task);
      }
    });
  };
  
  
  exports.dlt = (req, res)=> {
    Task.remove({
      _id: req.params.taskId
    }, (err, task)=>{
      if (err){
        res.send(err);
      }
      else{
      res.json({ message: 'Task successfully deleted' });
      }
    });
  };
  
