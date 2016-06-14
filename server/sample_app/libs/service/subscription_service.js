var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    subscription         = require('../../models/subscription'),
    Subscription         = mongoose.model('Subscription'),
    docName              = 'subscription_service',
    subscription_service,
    private_methods;

    private_methods={ 
    };

    subscription_service={
        create:function(email_id) {
            try{
                return Subscription.add({email_id: email_id}).then(function(response) {
                    return response.response_obj(response);
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };
    Promise.longStackTraces();
    module.exports = subscription_service;