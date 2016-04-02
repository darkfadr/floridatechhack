// import expores from 'express';
var fs      = require('fs'),
    express = require('express'),
    parser  = require('body-parser'),
    kairos  = require('kairos-api');

const app   = express(),
      k     = new kairos('d9b56175', '85f8ebddb7132df84c6df281d52b1d50');
      appid = 'kairos-test' || 'overwatch_users',
      port  = process.env.PORT || 3000;

app.use(parser.urlencoded({ extended: false }));

app.get('/test', (req, res) =>{
  //SEED action
  // fs.readdir(`${__dirname}/tests`, (err, files) => {
  //     // files.forEach((img, i) => {
  //       fs.readFile(`${__dirname}/tests/${img}`, (err, data) => {
  //         console.log(data)
  //           var data = new Buffer(data, 'base64').toString('base64');
  //
  //
  //           k.enroll({
  //             image: data,
  //             subject_id: `ash-test-${i}`,
  //             gallery_name: 'kairos-test',
  //             selector: 'SETPOSE'
  //           }).then((json) => {
  //             res.json(json);
  //           });
  //       // });
  //     });
  //
  // });


  fs.readFile(`${__dirname}/tests/IMG_20160213_192513.jpg`, (err, file) => {
    var data = new Buffer(file, 'base64').toString('base64'),
        opts = {
          image: data,
          gallery_name: appid,
        };

    k.recognize(opts)
      .then(function(result) {
          res.json(result);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
});

app.get('/gallery', (req, res) => {
  k.galleryView({
      gallery_name: 'kairos-test'
    })
    .then((data) => {
      res.json(data);
    })
})

app.post('/enroll',(req, res) => {

  var opts = {
    image: req.body.image,
    subject_id: req.body.id,
    gallery_name: appid,
    selector: 'SETPOSE'
  };

  k.enroll(opts)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post('/auth', (req, res) => {
  var opts = {
    image: req.body.image,
    gallery_name: appid,
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
