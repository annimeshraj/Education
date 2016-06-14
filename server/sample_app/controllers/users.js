var Promise         	= require('bluebird'),
	_                   = require('lodash'),
	utility    		    = require('../utility'),
	service        		= require('../libs/service'),
	configuration       = require('../configuration/system'),
	messages            = require('../configuration/messages'),
	doc_name            = 'users',
	users,
	private_method,
	validation;

validation={
	sign_up:function(options,currentUser){
		try{
			var object = {};
			var username_regex = new RegExp(/^[a-zA-Z0-9_\.]{4,15}$/);
			if (!options['email_id']){
				return Promise.reject(new Error(messages[doc_name]['email_missing']));
			}
			
			if (!utility.validations.is_valid_email(options['email_id'])){
				return Promise.reject(new Error(messages[doc_name]['invalid_email']));
			}
			else{
				object['email_id'] = options['email_id']
			}
			if (!options['password']){
				return Promise.reject(new Error(messages[doc_name]['password_missing']));  
			}
			else{
				object['password'] = options['password'];
			}
			if (!options['confirm_password']){
				return Promise.reject(new Error(messages[doc_name]['confirm_password_missing']));
			}
			if (!utility.validations.password_match(options['password'],options['confirm_password'])) {        
				return Promise.reject(new Error(messages[doc_name]['password_mismatch']));
			}
			if (!options['role']){
				return Promise.reject(new Error(messages[doc_name]['role_missing']));
			}
			else{
				object['role'] = options['role']
			}
			if(options['first_name']){
				object['first_name'] = options['first_name']
			}
			if(options['last_name']){
				object['last_name'] = options['last_name']
			}
			if(!options['gender']){
				return Promise.reject(new Error(messages[doc_name]['gender_missing']));
			}
			

			else if(['M','F'].indexOf(options['gender'].toUpperCase())<0){
				return Promise.reject(new Error(messages['invalid_gender']));
			}
			else{
				object['gender'] = options['gender']
			}
			if(options['date_of_birth']){
				object['date_of_birth'] = new Date(options['date_of_birth'])
			}
			if(options['mobile_no']){
				object['mobile_no'] = options['mobile_no']
			}
			if(options['state']){
				object['state'] = options['state']
			}
			if(options['city']){
				object['city'] = options['city']
			}
			if(options['class_s']){
				object['class_s'] = options['class_s']
			}
			if(options['longitude']){
				object['longitude'] = options['longitude'];
			}
			if(options['latitude']){
				object['latitude'] = options['latitude'];
			}
			if(options['ip_address']){
				object['ip_address'] = options['ip_address'];
			}
			if(options['device_id']){
				object['device_id'] = options['device_id'];
			}

			if(options['device_unique_identifier']){
				object['device_unique_identifier'] = options['device_unique_identifier'];
			}
			if(options['client_type']){
				object['client_type'] = options['client_type'];
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message));
		}
	},
	sign_in:function(options){
		try{
			var object = {};
			if (!options['email_id']){
				return Promise.reject(new Error(messages[doc_name]['email_missing']));
			}
			if (!utility.validations.is_valid_email(options['email_id'])){
				return Promise.reject(new Error(messages[doc_name]['invalid_email']));
			}
			else{
				object['email_id'] = options['email_id']
			}
			if (!options['password'])
				return Promise.reject(new Error(messages[doc_name]['password_missing']));
			else{
				object['password'] = options['password']
			}
			if(options['longitude']){
				object['longitude'] = options['longitude'];
			}
			if(options['latitude']){
				object['latitude'] = options['latitude'];
			}
			if(options['ip_address']){
				object['ip_address'] = options['ip_address'];
			}
			if(options['device_id']){
				object['device_id'] = options['device_id'];
			}
			if(options['device_unique_identifier']){
				object['device_unique_identifier'] = options['device_unique_identifier'];
			}
			if(options['client_type']){
				object['client_type'] = options['client_type'];
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message));
		}
	},
};
private_method={
};
users={
	sign_up:function(options){
		try{
			return validation.sign_up(options).then(function(object){
				return object[0];
			}).then(function(object) {
				return service.user_service.sign_up(object).then(function(response) {
					return utility.response_json.response(true,'Register successfully',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message));
		}
	},
	sign_in:function(options){
		try{
			return validation.sign_in(options).then(function(object){
				return object[0];
			}).then(function(object) {
				return service.user_service.sign_in(object).then(function(response) {
					return utility.response_json.response(true,'Login successfully',response,200);
				})
			})			
		}
		catch(error){
			return Promise.reject(new TypeError(error.message));
		}
	},
	
	edit:function(options) {
		// body...
	},
	update:function(options) {
		// body...
	},
	show:function(options) {
		// body...
	},
	index:function(options) {
		// body...
	},
	destroy:function(options) {
		// body...
	}
};
Promise.longStackTraces();
module.exports = users;
