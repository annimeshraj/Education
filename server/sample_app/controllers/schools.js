var Promise         	= require('bluebird'),
	_                   = require('lodash'),
	utility    		    = require('../utility'),
	service        		= require('../libs/service'),
	configuration       = require('../configuration/system'),
	messages            = require('../configuration/messages'),
	fs                  = Promise.promisifyAll(require('fs')),
	doc_name            = 'schools',
	schools,
	private_method,
	validation;

validation={
};
private_method={
	create:function(options) {
		try{
			var object = {};
			if(!options['name']){
				return Promise.reject(new Error(messages[doc_name]['name_missing']))
			}
			else{
				object['name'] = options['name']
			}
			if(!options['board']){
				return Promise.reject(new Error(messages[doc_name]['board_missing']))
			}
			else{
				object['board'] = options['board']
			}
			if(!options['address']){
				object['address'] = options['address'];
			}
			if(!options['city']){
				return Promise.reject(new Error(messages[doc_name]['city_missing']))
			}
			else{
				object['city'] = options['city']
			}
			if(!options['state']){
				return Promise.reject(new Error(messages[doc_name]['state_missing']))
			}
			else{
				object['state'] = options['state']
			}
			if(!options['country']){
				return Promise.reject(new Error(messages[doc_name]['country_missing']))
			}
			else{
				object['country'] = options['country'];
			}			
			if(options['zip_code']){
				object['zip_code'] = options['zip_code'];	
			}
			if(options['longitude']){
				object['longitude'] = options['longitude'];
			}
			if(options['latitude']){
				object['latitude'] = options['latitude'];
			}
			if(options['ranking']){
				object['ranking'] = options['ranking'];
			}
			if(options['facilities']){
				object['facilities'] = options['facilities'];
			}
			if(options['photo'] && !_.isEmpty(options['photo'])){
				object['photo'] = {
					data      : new Buffer(options['photo']['data'], 'base64'),
					file_name : Math.random().toString(36).slice(2)+"."+extension,
					mime_type : options['photo']['mime_type'],
					extension : options['photo']['extension']
				}
				return fs.writeFileAsync(configuration['system']['school_image_path']+object['photo']['file_name'],object['photo']['data']).then(function(contents) {
					return object;
				})
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
schools={
	create: function(options) {
		try{
			return validation.create(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.school_service.create(object).then(function(response) {
					return utility.response_json.response(true,'School register successfully',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
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
module.exports = schools;
