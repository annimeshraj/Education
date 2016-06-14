var Promise         	= require('bluebird'),
	_                   = require('lodash'),
	utility    		    = require('../utility'),
	service        		= require('../libs/service'),
	configuration       = require('../configuration/system'),
	messages            = require('../configuration/messages'),
	doc_name            = 'subscriptions',
	subscriptions,
	private_method,
	validation;

validation={
	create:function(email_id) {
		try{
			if (!email_id){
				return Promise.reject(new Error(messages['email_missing']));
			}			
			if (!utility.validations.IsValidEmail(email_id)){
				return Promise.reject(new Error(messages['invalid_email']));
			}
			return Promise.join(email_id);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
private_method={
};
subscriptions={
	create: function(options) {
		try{
			return validation.create(options['email_id']).then(function(email_id) {
				return email_id[0];
			}).then(function(email_id) {
				return service.subscription_service.create(email_id).then(function(response) {
					return utility.response_json.response(true,'Subscribe successfully',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
Promise.longStackTraces();
module.exports = subscriptions;
