var _                   = require('lodash'),
    Promise             = require('bluebird'),
    // Include Endpoints
    contact_us          = require('./contact_us'),
    subscriptions       = require('./subscriptions'),
    users               = require('./users'),
    schools             = require('./schools'),
    subjects            = require('./subjects'),
    questions           = require('./questions'),
    answers             = require('./answers'),
    facilities          = require('./facilities'),
    search              = require('./search'),
    errors              = require('../libs/errors'),
    validation          = require('../libs/validations'),
    utility             = require('../utility'),
    configuration       = require('../configuration'),
    api_routes          = require('../routes/filter_routes'),    
    http,
    init;
/**
 * ### Init
 * Initialise the API - populate the settings cache
 * @return {Promise(Settings)} Resolves to Settings Collection
 */
init = function () {
    return ;//settings.updateSettingsCache();
};

/**
 * ### HTTP
 *
 * Decorator for API functions which are called via an HTTP request. Takes the API method and wraps it so that it gets
 * data from the request and returns a sensible JSON response.
 *
 * @public
 * @param {Function} api_method API method to call
 * @return {Function} middleware format function to be called by the route when a matching request is made
 */
http = function (api_method) {    
    return function (req, res) {
        try{
            if(!_.isFunction(api_method))
            {
                return res.send(utility.response_json.response(false,configuration.message.wrong_url,{}));
            }
            // We define 2 properties for using as arguments in API calls:
            if(!_.isEmpty(req.body)){
                var object =_.extend({}, req.body, req.headers, {
                    user: {}
                });
            }
            else{
                var object =_.extend({}, req.headers,req.params, {
                    user: {}
                });
            }
            if(!_.isEmpty(req.query)){
                object = _.extend({},object, req.query)
            }
            var request_type=req.method;//value will be GET,POST,PUT,PATCH,DELETE
            var request_url=req["route"]["path"];
            var response;

            if (!req['headers']['x-api-key'])
                return res.send(utility.response_json.response(false,configuration.message.API_KEY,{}));
            if (!req['headers']['x-api-secret-key'])
                return res.send(utility.response_json.response(false,configuration.message.API_SECRET_KEY,{}));
            // If this is a GET, or a DELETE, req.body should be null, so we only have options (route and query params)
            // If this is a PUT, POST, or PATCH, req.body is an object
            validation.authentication.is_authenticated(req['headers']).then(function(response){
                //Remove x-api-key and x-api-secret-key from object
                delete object['x-api-key'];
                delete object['x-api-secret-key'];
                if(Array.isArray(response))
                {
                    response=response[0];
                }
                if(!response['status']) {
                    res.send(response);
                }
                else {
                    api_routes.filter_routes=_.map(api_routes.filter_routes, function(api) { return api.toUpperCase(); });
                    if(api_routes.filter_routes.indexOf(request_url.toUpperCase()) != -1){
                        console.log("authetication done");
                        validation.authorization.is_authorization(object,req.url,req.baseUrl).then(function(auth_res){
                            if(Array.isArray(auth_res))
                            {
                                auth_res=auth_res[0];
                            }
                            if(!auth_res['status'] && api_routes.exclude_routes.indexOf(request_url) == -1) {
                                res.send(auth_res);
                            }
                            else{

                                object.user = auth_res['data'];
                                //Authenticated Request
                                api_method(object).then(function(response){
                                    if(Array.isArray(response)){
                                        response=response[0];
                                    }
                                    res.send(response);
                                },function OnError(error){
                                    console.log("**ERROR**");
                                    console.log(error.message);
                                    if(error.name=="Error")
                                    {res.send(utility.response_json.response(false,error.message,{}));}
                                    else
                                    {
                                        errors.logError(error,object,request_url,object["user"]["user_id"],req.headers.host).then(function(){
                                            res.send(utility.response_json.response(false,error,null));
                                        });
                                    }
                                    
                                });   
                            }
                        }).catch(function OnError(error){
                            if(error.name=="Error")
                            {res.send(utility.response_json.response(false,error.message,{}));}
                            else
                            {
                                errors.logError(error,object,request_url,object["user"]["user_id"],req.headers.host).then(function(){
                                    res.send(utility.response_json.response(false,error.message,null));
                                });
                            }
                        });
                    }
                    else{
                        //If contains authToken then get User data
                        console.log("unauthetication request");
                        api_method(object).then(function(response){
                            if(Array.isArray(response)){
                                response=response[0];
                            }

                            res.send(response);
                        },function OnError(error){
                            console.log("**unauthetication request ERROR**")
                            if(error.name=="Error")
                            {res.send(utility.response_json.response(false,error.message,{}));}
                            else
                            {
                                errors.logError(error,object,request_url,null,req.headers.host).then(function(){
                                    res.send(utility.response_json.response(false,error,{}));
                                });
                                
                            }
                        });                    
                    }
                }
            });
        }
        catch(error)
        {
           errors.logError(error,object,request_url,object["user"]["userId"],req.headers.host).then(function(){
                res.send(utility.response_json.response(false,error,{}));
            });
        }
        
    };
};

/**
 * ## Public API
 */
module.exports = {
    // Extras
    init          : init,
    http          : http,
    subscriptions : subscriptions,
    contact_us    : contact_us,
    users         : users,
    subjects      : subjects,
    schools       : schools,
    questions     : questions,
    answers       : answers,
    facilities    : facilities,
    search        : search
};
Promise.longStackTraces();