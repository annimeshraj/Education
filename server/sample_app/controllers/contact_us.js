var Promise         	= require('bluebird'),
	_                   = require('lodash'),
	utility    		    = require('../utility'),
	service        		    = require('../libs/service'),
	configuration       = require('../configuration/system'),
	messages            = require('../configuration/messages'),
	doc_name            = 'contact_us',
	contact_us,
	private_method,
	validation;

validation={
	create:function(options) {
		try{
			var object = {}
			if (!options['email_id']){
				return Promise.reject(new Error(messages['email_missing']));
			}			
			if (!utility.validations.IsValidEmail(options['email_id'])){
				return Promise.reject(new Error(messages['invalid_email']));
			}
			else{
				object['email_id'] = options['email_id'];
			}
			if(!options['name']){
				return Promise.reject(new Error("Name is missing"))
			}
			else{
				object['name'] = options['name'];
			}
			if(!options['subject']){
				return Promise.reject(new Error("subject is missing"))
			}
			else{
				object['subject'] = options['subject']
			}
			if(!options['message']){
				return Promise.reject(new Error("message is missing"))
			}
			else{
				object['message'] = options['message']
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
private_method={
};
contact_us={
	create:function(options){
		try{
			return validation.create(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.contact_us_service.create(object).then(function(response) {
					return utility.response_json.response(true,'Feedback send successfully',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
Promise.longStackTraces();
module.exports = contact_us;
