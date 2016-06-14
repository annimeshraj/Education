var Promise         	= require('bluebird'),
	_                   = require('lodash'),
	utility    		    = require('../utility'),
	service        		= require('../libs/service'),
	configuration       = require('../configuration/system'),
	messages            = require('../configuration/messages'),
	doc_name            = 'questions',
	questions,
	private_method,
	validation;

validation={
	create:function(options) {
		try{
			var object = {}
			if(!options['title']){
				return Promise.reject(new Error(messages[doc_name]['title_missing']));
			}
			else{
				object['title'] = options['title']
			}
			if(!options['description']){
				return Promise.reject(new Error(messages[doc_name]['description_missing']));
			}
			else{
				object['description'] = decodeURIComponent(options['description'])
			}
			object['author_id'] = options['user']['user_id'];
			if(options['category']){
				object['category'] = options['category']
			}
			else{
				object['category'] =[];
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.messages))
		}
	},
	show:function(options) {
		try{
			var object = {};
			if(!options['id']){
				return Promise.reject(new Error(messages[doc_name]['question_id_missing']))
			}
			else{
				object['question_id'] = options['id'].toString();
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	index:function(options) {
		try{
			var object = {limit: null, page_no: null};
			if(options['type']){
				object['type'] = options['type'].toUpperCase()
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
questions={
	create: function(options) {
		try{
			return validation.create(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.question_service.create(object).then(function(response) {
					return utility.response_json.response(true,'Question created successfully',response,200);
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
		try{
			return validation.show(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.question_service.show(object).then(function(response) {
					return utility.response_json.response(true,'',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	index:function(options) {
		try{
			return validation.index(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.question_service.index(object).then(function(response) {
					return utility.response_json.response(true,'',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	destroy:function(options) {
		// body...
	}
};
Promise.longStackTraces();
module.exports = questions;
