var _              = require('lodash'),
    Promise        = require('bluebird'),
    mongoose       = require('mongoose'),
    errorLog       = require('../../models/error_log'), 
    configuration  =require('../../configuration'),
	ErrorLog       = mongoose.model('ErrorLog'),
   errors;

errors = {
	logError:function(error, userinput, requestUrl,userId,origin,requestParameter)
	{
    	var objError= {					
    			userId 		:   userId,
		    	api 		: 	requestUrl,
                origin      :   origin, 
		    	userInput 	: 	userinput,
		    	errorType 	: 	error.name,
		    	errorMessage: 	error.message,
		    	stackTrace 	: 	error.stack
    		};

    		return ErrorLog.add(objError).then(function(e){
    			console.log("==========ERROR==========")
                console.log(error.name);
                console.log(error.message);
    			return Promise.join();
    		}).then(function(argument) {
                var plainMessage = JSON.stringify({"url":requestUrl,"options":userinput,"message":error.message,"type":error.name,"errorStack":error.stack});                
                //send error log email    
                return Promise.join();
            });

	}
};

module.exports = errors;