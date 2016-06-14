var Promise         	= require('bluebird'),
	_                   = require('lodash'),
	utility    		    = require('../utility'),
	service        		= require('../libs/service'),
	configuration       = require('../configuration/system'),
	messages            = require('../configuration/messages'),
	doc_name            = 'answers',
	answers,
	private_method,
	validation;

validation={
	create:function(options) {
		try{
			var object = {};
			if(!options['answer']){
				return Promise.reject(new Error(messages[doc_name]['answer_missing']))
			}
			else{
				object['answer'] = decodeURIComponent(options['answer'])
			}
			if(!options['question_id']){
				return Promise.reject(new Error(messages[doc_name]['question_missing']))
			}
			else{
				object['question_id'] = options['question_id']
			}
			object['author_id'] = options['user']['user_id'];
			return Promise.join(object)
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	reply:function(options) {
		try{
			var object = {};
			if(!options['reply']){
				return Promise.reject(new Error(messages[doc_name]['reply_missing']))
			}
			else{
				object['reply'] = decodeURIComponent(options['reply'])
			}
			if(!options['answer_id']){
				return Promise.reject(new Error(messages[doc_name]['answer_id_missing']))
			}
			else{
				object['answer_id'] = options['answer_id']
			}
			if(!options['question_id']){
				return Promise.reject(new Error(messages[doc_name]['question_missing']))
			}
			else{
				object['question_id'] = options['question_id']
			}
			object['author_id'] = options['user']['user_id'];
			return Promise.join(object)
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
private_method={
	
};
answers={
	create: function(options) {
		try{

			return validation.create(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.answer_service.create(object).then(function(response) {
					return utility.response_json.response(true,'Thanks to giving your answer',response,200);
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
	},
	reply:function(options) {
		try{
			console.log(1656778788989)
			return validation.reply(options).then(function(object) {
				return object[0]
			}).then(function(object) {
				return service.answer_service.reply(object).then(function(response) {
					return utility.response_json.response(true,'Thanks to giving your reply',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
Promise.longStackTraces();
module.exports = answers;
