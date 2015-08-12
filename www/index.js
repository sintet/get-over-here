var express = require('express')
var path = require('path')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
//
var methodOverride = require('method-override')
var morgan = require('morgan');
var app = express();
// var favicon = require('serve-favicon');
// config
mongoose.connect('mongodb://admin:12345@ds045882.mongolab.com:45882/cats');

app.use(express.static(path.join(__dirname, '/'))); //

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
// app.use(favicon(__dirname + '/favicon.ico'));

  var server = app.listen(process.env.PORT || 5000)


    var kittySchema = mongoose.Schema({
      name : String,
      pic  : String,
      count: Number,
      viewed: Boolean
    });

    var Kitten = mongoose.model('Kitten', kittySchema);


  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

    app.get('/api/cats', function(req, res) {
          Kitten.find(function(err, cats) {
                if (err)
                    res.send(err)

                res.json(cats);
            });
        });

    app.get('/api/cats/:id', function(req, res) {
      Kitten.findOne({_id: req.params.id}, function(err, cat) {
          if (err)
              res.send(err)

          // _id : req.params.id
          res.json(cat);
      });
     });

    app.post('/api/cats', function(req, res) {
            Kitten.create({
                name : req.body.name,
                pic : req.body.pic,
                count : 0,
                viewed : false
            }, function(err, cat) {
                if (err)
                    res.send(err);
                Kitten.find(function(err, cats) {
                    if (err)
                        res.send(err)
                    res.json(cats);
                });
            });
        });

    app.delete('/api/cats/:cat_id', function(req, res) {
          Kitten.remove({
              _id : req.params.cat_id
          }, function(err, cat) {
              if (err)
                  res.send(err);
              Kitten.find(function(err, cats) {
                  if (err)
                      res.send(err)
                  res.json(cats);
              });
          });
      });
