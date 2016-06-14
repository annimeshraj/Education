/**
* Module dependencies.
*/
// Requires
var http          = require('http'),
    fs            = require('fs'),
    express       = require('express'),
    mongoose      = require ("mongoose"),
    body_parser   = require('body-parser'),
    cors          = require('cors'),
    routes        = require("./routes"),
    config        = require("./configuration/system.js"),
    utility       = require('./utility');


var app = express();
//Opt into Services
app.use(body_parser.json({limit: 153791147}));
app.use(body_parser.urlencoded({
    extended: true,
    limit:    153791147
}));
app.use(cors());
// Configure express
var uristring = ''
if(process.env.NODE_ENV == "production"){
    uristring = 'mongodb://localhost:27017/sample_prod'
    port = process.env.PORT || 8082;
}
else if(process.env.NODE_ENV == "test"){
    uristring = 'mongodb://localhost:27017/sample_test'
    port = process.env.PORT || 8081;
}
else{
    uristring = 'mongodb://localhost:27017/TwentyOneCS'
    port = process.env.PORT || 8080;
}
try{
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(uristring, options);
}
catch(ex){
	console.log(ex);
}
app.listen(port, function() {
    console.log("Listening application on port number: ", port);
});
app.use(routes.api_base_uri, routes.api(app));
process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  return false;
  process.exit(1);
})
// module.exports = app;
