const express = require('express');
const router = express.Router();
const {list,crt,rd,up,dlt,lst} = require('../controllers/curd');
const {rqt} = require('../controllers/req');

router
  .get('/', list,rqt)
  .post('/', crt)
  .get('/:taskId',rd)
  .put('/:taskId',up)
  .delete('/:taskId',dlt);
  
module.exports = router;