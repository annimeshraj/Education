var Promise         = require('bluebird'),
    _               = require('lodash'),
    utility         = require('../../utility'),
    mongoose        = require('mongoose'),//Why we need this here
    user            = require('../../models/user'),
    User            = mongoose.model('User'),
    service         = require('../../libs/service'),
    docName         = 'authorization',
    user            = require('../service/user_service'),
    configuration   = require("../../configuration"),
    authorization;


authorization={
  is_authorization:function(options){
    try{
        if (options.auth_token != null){        
            var user_data ={};
            user_data =utility.encrypt_decrypt.decode_token(options.auth_token);
            var expire_date = new Date(user_data['expire_date']);
            var current_date = new Date();
            if (current_date > expire_date || (user_data['user_id']==undefined ||user_data['user_id']==null))
            {
                return Promise.reject(new Error("Session expired"));
            }
            else{
                return User.get({"$and":[{_id: user_data['user_id']}]}).then(function (user) {
                    if(user){
                        user = user[0];
                        var token=options.auth_token
                        return service.user_session_service.validate_auth_token(token).then(function(res) {
                            if(res){
                                return utility.response_json.response(true,'',user.response_obj(user));
                            }
                            else{
                                return utility.response_json.response(false,configuration.message.session_expired,{});
                            }
                        });
                    }
                    else{
                        return utility.response_json.response(false,configuration.message.session_expired,{});
                    }
                })
            }
        }
        else {
           return Promise.join(utility.response_json.response(false,configuration.message.key_mismatch,{}));
        }
    }
    catch(error){
        return Promise.reject(new Error(error.message));
    }
  }
};

module.exports = authorization;