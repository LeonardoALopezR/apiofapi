'use strict';
const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// import { autoIncrement } from 'mongoose-plugin-autoinc';
// const autoIncrement = require ('mongoose-plugin-autoinc');
const autoIncrement = require('mongoose-plugin-autoinc')
const conn = require("../dbconn");
const Schema = mongoose.Schema;

const Apis = new Schema({
  _id: false,
  name: {type: String, required: true},
  description: {type: String},
  host:{type: String},
  path:{type: String},
  query:{type: String},
  statusCode:{type: Number},
  method:{
      type: String,
      enum:['POST', 'GET'],
      required: true,
      default: 'GET'
    },
 post:[{
     _id: false,
     email: {type: String},
     password: {type: String}
 }],
 timeout:{type: Number, required: true, default: '1500'},
 status: {type: String, enum: ['active','deleted','suspended'], required: true},
 alertEmail: {type: Boolean, default: true},
 toEmail: {type: String},
 developer: {type: String},
 IpServer: {type: String},
 Error: {type: String}
});

Apis.plugin(autoIncrement.plugin, { model: 'Apis', field: '_id', startAt: 0});
module.exports = mongoose.model('Apis', Apis, 'Apis');

