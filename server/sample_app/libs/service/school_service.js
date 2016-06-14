var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    school               = require('../../models/school'),
    School               = mongoose.model('School'),
    docName              = 'school_service',
    school_service,
    private_methods;

    private_methods={ 
    };

    school_service={
        create:function(object) {
            try{
                return School.add(object).then(function(response) {
                    return response.response_obj(response);
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };
    Promise.longStackTraces();
    module.exports = school_service;