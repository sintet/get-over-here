var express = require('express')
var path = require('path')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
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

  var server = app.listen(process.env.PORT || 5000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
  })

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  var userSchema=mongoose.Schema({
      login: String,
      password : String,
      email : String,
      // events: [{name:String,
        requests : [{
          receiver : String,
          sender : String,
          place : String,
          urgency : String
        }]
      // }]

  })

  var User = mongoose.model('User', userSchema)

  // Event model

  // var eventSchema=mongoose.Schema({
  // })
  // var Event = mongoose.model('Event', eventSchema);


    // Users router
    // Get Users
    app.get('/api/users', function(req, res) {
          User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
    });
    // Get user by id
    app.get('/api/users/:id', function(req, res) {
      User.findOne({_id: req.params.id}, function(err, user) {
          if (err)
              res.send(err)

          // _id : req.params.id
          res.json(user);
      });
     });

    // Get user requests by id
    app.get('/api/users/:id/requests', function(req, res) {
      User.findOne({_id: req.params.id}, function(err, user) {
          if (err)
              res.send(err)

          res.json(user.requests);
      });
     });
    // get user request
    app.get('/api/users/:id/requests/:req_id', function(req, res) {
       User.findOne({_id: req.params.id}, function(err, user) {
           if (err)
               res.send(err)
          //  console.log(user.requests.id(req.params.req_id))
           res.json(user.requests.id(req.params.req_id));
       });
    });
    // Create user
    app.post('/api/users', function(req, res) {
        User.create({
            login : req.body.login,
            password: req.body.password,
            email: req.body.email
        }, function(err, user) {
            if (err)
                res.send(err);
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });
      });
      // Delete User
      app.delete('/api/users/:user_id', function(req, res) {
            User.remove({
                _id : req.params.user_id
            }, function(err, user) {
                if (err)
                    res.send(err);
                User.find(function(err, users) {
                    if (err)
                        res.send(err)
                    res.json(users);
                });
            });
        });

     // Send request
     app.post('/api/users/:id', function (req, res){
       return User.findById(req.params.id, function (err, user) {
         user.requests.push(req.body)

         return user.save(function (err) {
           if (!err) {
             console.log("updated");
           } else {
             console.log(err);
           }
           return res.send(user);
         });
       });
     });
     // Delete request
     app.delete('/api/users/:user_id', function(req, res) {
         User.remove({
             _id : req.params.user_id
         }, function(err, user) {
             if (err)
                 res.send(err);
             User.find(function(err, users) {
                 if (err)
                     res.send(err)
                 res.json(users);
             });
         });
     });
