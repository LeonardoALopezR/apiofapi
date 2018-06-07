const express = require('express');
const router = express.Router();
const {list,crt,rd,up,dlt,lst} = require('../controllers/curd');
const {rqt,srqt} = require('../controllers/req');
const {filter,sfilter} = require('../controllers/filter');
const {validator} = require('../controllers/validator');

router
  .get('/', list,rqt,filter)
  .post('/', validator,crt)
  .get('/:taskId',rd,srqt,sfilter)
  .put('/:taskId',up)
  .delete('/:taskId',dlt);
  
module.exports = router;