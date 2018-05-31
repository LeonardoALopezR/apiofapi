const express = require('express'); 
const app = express();
const route = require('./routes/route');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',route)

app.use((req, res)=>{
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(port, () => console.log(`Example app listening on port ${port}`));