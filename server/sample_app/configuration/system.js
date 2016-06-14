var _  = require('lodash');
/*
	All the url values, which are changable as per server
*/
var port;
var adminPort = "6003";
var baseURI;
var adminURI;
var webURI;
if(process.env.NODE_ENV=="production"){
	port = process.env.PORT || 8082
}
else if(process.env.NODE_ENV=="test"){
	port = process.env.PORT || 8081
}
else{
	port = process.env.PORT || 8080
}
function get_path(source){
    var is_split=false;
    var return_value='';
    var path = require.main.filename.split("/");
   if(path.length==1)
   {
       is_split=true;
       path = require.main.filename.split("\\");
   }
    var actual_path = _.first(path, (path.length -1));
    return_value=is_split?(actual_path.join("\\")+"\\media\\"+source+"\\"):(actual_path.join("/")+"/media/"+source+"/");
    return return_value;
};
/*
	All the configuration values, which are changable as per server
*/
var configuration={
	user_image_path: get_path("User"),
	school_image_path: get_path("School")
};
 
module.exports = configuration;


