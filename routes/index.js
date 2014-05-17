var config = require('./config');
var foursquare = require('node-foursquare')(config);
var savedAccessToken;

exports.index = function(req, res){
  if(!savedAccessToken){
    res.render('index', { title: 'Before Login', result: "" });
  } else {
    foursquare.Users.getUser("self", savedAccessToken, function(err, result){
      if(err){
        console.log("accessToken get corrected but getUser failure");
      } else {
        res.render('index', {
          title: 'Login Success',
          result: result
        });
      }
    });
  }
};

exports.login = function(req, res) {
  res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
  res.end();
};

exports.callback = function(req, res){
  foursquare.getAccessToken({
    code: req.query.code
  }, function (error, accessToken) {
    if(error) {
      res.send('An error was thrown: ' + error.message);
    }
    else {
      // Save the accessToken and redirect.
      console.log("get valid access token : " + accessToken);
      savedAccessToken = accessToken;
      res.redirect("/");
    }
  });
};

exports.getUserSelf = function(req, res) {
  foursquare.Users.getUser("self", savedAccessToken, function(err, result) {
    if(err) {
      console.log("getUser error");
      res.send('getUser error');
    }
    if(result) {
      // APIで得たjsonをクライアントに返す
      res.json(result);
    }
  });
};

exports.getVenueHistorySelf = function(req, res) {
  var params = req.query;
  foursquare.Users.getVenueHistory("self", params, savedAccessToken, function(err, result){
    if(err) {
      console.log("getVenueHistory error");
      res.send('getVenueHistory error');
    }
    if(result) {
      res.json(result);
    }
  });
};
