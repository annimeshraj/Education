var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    contact_us           = require('../../models/contact_us'),
    ContactUs            = mongoose.model('ContactUs'),
    docName              = 'contact_us_service',
    contact_us_service, private_methods;
    private_methods={
        create:function(object) {
            try{
                var contact_us_obj = {
                    name         : object['name'],
                    email_id     : object['email_id'],
                    address_1    : object['address_1']?object['address_1']:"",
                    address_2    : object['address_2']?object['address_2']:"",
                    subject      : object['subject'],
                    message      : object['message'],
                }
                return Promise.join(contact_us_obj)
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        } 
    };

    contact_us_service={
        create:function(object) {
            try{
                return private_methods.create(object).then(function(contact_us_obj) {
                    return contact_us_obj[0]
                }).then(function(contact_us_obj) {
                    return ContactUs.add(contact_us_obj).then(function(response) {
                        return response.response_obj(response)
                    })
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };
    Promise.longStackTraces();
    module.exports = contact_us_service;