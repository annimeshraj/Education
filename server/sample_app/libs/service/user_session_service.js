var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    user_session         = require('../../models/user_session'),
    UserSession            = mongoose.model('UserSession'),
    docName              = 'user_session_service',
    contact_us_service, private_methods;
    private_methods={
    };

    user_session_service={
        validate_auth_token:function(auth_token) {
            try{
                return UserSession.get({auth_token: auth_token}).then(function (res) {
                    if(res){
                        return true;
                    }
                    else{                    
                        return false;
                    }
                });
            }
            catch(error){
                return Promise.reject(new TypeError(error.message));
            }
            
        }
    };
    Promise.longStackTraces();
    module.exports = user_session_service;

