var Promise         = require('bluebird'),
    _               = require('lodash'),
    utility         = require('../../utility'),
    mongoose        = require('mongoose'),//Why we need this here
    appClient       = require('../../models/app_client'),
    AppClient       = mongoose.model('AppClient'),
    doc_name        = 'authentication',
    configuration   = require("../../configuration"),
    authentication;
    

authentication={
    is_authenticated:function(options){
        try{
            var api_key = options['x-api-key']
            var api_secret_key = options['x-api-secret-key']
            if (!api_key)
                {return Promise.join(utility.response_json.response(false,configuration.message.api_key_error,null));}
            if (!api_secret_key)
                {return Promise.join(utility.response_json.response(false,configuration.message.api_secret_key,null)); }
            else{
                return AppClient.find_one({api_key: api_key}).then(function(client){
                    var result={};
                    if(client){
                        var password_hash=utility.encrypt_decrypt.encrypt(api_secret_key,client['api_secret_key_salt']);  
                        if(password_hash!=client['api_secret_key_hash']){
                            return Promise.join(utility.response_json.response(false,configuration.message.invalid_api_key_secret_key,null));
                        }    
                        options['client_type'] = client.client_name
                        result=(utility.response_json.response(true,'',client));
                    }
                    else{
                        result=Promise.join(utility.response_json.response(false,configuration.message.invalid_api_key_secret_key,null));
                    }
                    return result;
                });                    
            }
        }
        catch(error){

        }
    }
};
module.exports = authentication;