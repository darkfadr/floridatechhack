// import expores from 'express';
var express = require('express')

const app = express(),
      port = process.env.PORT || 3000;


app.listen(port, function(){
  console.log(`server listening on port:${port}`);
})
