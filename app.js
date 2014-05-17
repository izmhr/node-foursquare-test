var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index); // accessTokenの有無で画面が変わる

//node-foursquare
app.get('/login', routes.login);  // 4sqに対してOAuthの開始を要求する
app.get('/callback', routes.callback);  // OAuthの結果、4sqAPI側から呼ばれる

// testing
app.get('/Users/getUser/self', routes.getUserSelf); // ユーザー情報の取得
app.get('/Users/self/getVenueHistory', routes.getVenueHistorySelf );  // チェックイン履歴の取得

// server start
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
