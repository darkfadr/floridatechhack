// import expores from 'express';
var express = require('express'),
    parser = require('body-parser'),
    kairos = require('kairos-api');

const app   = express(),
      k     = new kairos('d9b56175', '85f8ebddb7132df84c6df281d52b1d50');
      port  = process.env.PORT || 3000;

app.use(parser());
app.get('/enroll',(req, res) => {
  var opts = {
    image: 'http://media.kairos.com/kairos-elizabeth.jpg',
    subject_id: 'kairos-test',
    gallery_name: 'kairos-test',
    selector: 'SETPOSE'
  };

  k.enroll(opts)
    .then(function(result) {
        if(result.status < 400) {
          res.json(result);
        } else{
          throw new Error(result)
        }
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get('/auth', (req, res) => {
  var opts = {
    image: 'http://media.kairos.com/kairos-elizabeth.jpg',
    gallery_name: 'kairos-test',
  };

  k.recognize(opts)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
      res.json({
        message: 'user was not properly authenticated'
      });
    });
});

app.listen(port, function(){
  console.log(`server listening on port:${port}`);
});
