var Promise         	= require('bluebird'),
	_                   = require('lodash'),
	utility    		    = require('../utility'),
	service        		= require('../libs/service'),
	configuration       = require('../configuration/system'),
	messages            = require('../configuration/messages'),
	doc_name            = 'subjects',
	subjects,
	private_method,
	validation;

validation={
		create:function(options) {
		try{
			var object = {};
			if(!options['name']){
				return Promise.reject(new Error(messages[doc_name]['name_missing']))
			}
			else{
				object['name'] = options['name']
			}
			if(!options['sub_category']){
				return Promise.reject(new Error(messages[doc_name]['sub_category_missing']))
			}
			else{
				object['sub_category'] = options['sub_category']
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	update:function(options) {
		try{
			var object = {};
			if(!options['subject_id']){
				return Promise.reject(new Error(messages[doc_name]['subject_id_missing']))
			}
			else{
				object['subject_id'] = options['subject_id']
			}
			if(options['name']){
				object['name'] = options['name']
			}
			if(options['sub_category']){
				object['sub_category'] = options['sub_category']
			}

			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	show:function(options) {
		try{
			var object = {};
			if(!options['id']){
				return Promise.reject(new Error(messages[doc_name]['	']))
			}
			else{
				object['subject_id'] = options['id'].toString();
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	index:function(options) {
		try{
			var object = {};
			if(options['limit']){
				object['limit'] = options['limit'];
			}
			if(options['page_no']){
				object['page_no'] = options['page_no']
			}
			return Promise.join(object);
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	destroy:function(options) {
		try{
			var object = {};
			if(!options['id']){
				return Promise.reject(new Error(messages[doc_name]['subject_id_missing']))
			}
			else{
				object['subject_id'] = options['id'].toString();
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
subjects={
	create: function(options) {
		try{
			console.log(options)
			return validation.create(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.subject_service.create(object).then(function(response) {
					return utility.response_json.response(true,'School register successfully',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},	
	update:function(options) {
		try{
			return validation.update(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.subject_service.update(object).then(function(response) {
					return utility.response_json.response(true,'Subject updated successfully',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	show:function(options) {
		try{
			return validation.show(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.subject_service.show(object).then(function(response) {
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
				return service.subject_service.index(object).then(function(response) {
					return utility.response_json.response(true,'',response,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	},
	destroy:function(options) {
		try{
			console.log(options)
			return validation.destroy(options).then(function(object) {
				return object[0];
			}).then(function(object) {
				return service.subject_service.destroy(object).then(function(response) {
					return utility.response_json.response(true,'Deleted successfully',null,200);
				})
			})
		}
		catch(error){
			return Promise.reject(new TypeError(error.message))
		}
	}
};
Promise.longStackTraces();
module.exports = subjects;
