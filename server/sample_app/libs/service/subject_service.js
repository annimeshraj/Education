var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    subject              = require('../../models/subject'),
    Subject              = mongoose.model('Subject'),
    docName              = 'subject_service',
    subject_service,
    private_methods;

    private_methods={ 
        update:function(object) {
            try{
                var obj = {}
                if(object['name']){
                    obj['name'] = object['name']
                }
                if(object['sub_category']){
                    obj['sub_category'] = object['sub_category']
                }
                var sub_object = {
                    criteria: {"_id":object['subject_id'].toString()},
                    updated_obj: {$set:obj}
                }
                return Promise.join(sub_object);
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };

    subject_service={
        create:function(object) {
            try{
                return Subject.add(object).then(function(response) {
                    return response.response_obj(response);
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        update:function(object) {
            try{
                return private_methods.update(object).then(function(sub_object) {
                    return sub_object[0];
                }).then(function(sub_object) {
                    return Subject.find_and_update(sub_object['criteria'], sub_object['updated_obj']).then(function(response) {
                        if(response){
                            return response.response_obj(response);
                        }
                        else{
                            return null;
                        }
                    })
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        show:function(object) {
            try{
                return Subject.get_one({"_id":object['subject_id']}).then(function(response) {
                    return response.response_obj(response);
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        index:function(object) {
            try{
                return Subject.get({},object['limit'],object['page_no']).then(function(response) {
                    if(response && response.length>0){
                        return response.map(function(res) {return res.response_obj(res)});
                    }
                    else{
                        return null;
                    }                    
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        destroy:function(object) {
            try{
                return Subject.destroy({"_id":object['subject_id']}).then(function(response) {
                    return true
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };
    Promise.longStackTraces();
    module.exports = subject_service;