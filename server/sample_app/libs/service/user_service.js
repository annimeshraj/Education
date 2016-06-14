var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    user                 = require('../../models/user'),
    user_session         = require('../../models/user_session'),
    User                 = mongoose.model('User'),
    UserSession          = mongoose.model('UserSession'),
    docName              = 'user_service',
    user_service, private_methods;
    private_methods={
        sign_up:function(object) {
            try{
                var user_object = {
                    first_name    : object['first_name']?object['first_name']:"",
                    last_name    : object['last_name']?object['last_name']:"",
                    email_id      : object['email_id'],
                    role          : object['role'],
                    password_salt : utility.encrypt_decrypt.create_salt(16),
                    password_hash : '',
                    gender        : object['gender'],
                    date_of_birth : object['date_of_birth']?object['date_of_birth']:null,
                    mobile_no     : object['mobile_no']?object['mobile_no']:null,
                    state         : object['state']?object['state']:null,
                    city          : object['city']?object['city']:null,
                    class_s       : object['class_s']?object['class_s']:null,

                }
                user_object.password_hash = utility.encrypt_decrypt.encrypt(object['password'],user_object['password_salt']);
                return Promise.join(user_object)
            }
            catch(error){
                return Promise.reject(new TypeError(error.message));
            }
        },
        sign_in:function(object) {
            try{
                var user_object = {
                    email_id: object['email_id'] 
                }
                return Promise.join(user_object)
            }
            catch(error){
                return Promise.reject(new TypeError(error.message));
            }
        },
        add_user_session:function(user,object) {
            try{
                var user_session_obj = {
                    auth_token: utility.encrypt_decrypt.create_token(user['_id'].toString()),
                    user: user['_id'],
                    device_id: object['device_id']?object['device_id']:null,
                    device_unique_identifier: object['device_unique_identifier']?object['device_unique_identifier']:null,
                    client_type: object['client_type'],
                    longitude: object['longitude']?object['longitude']:null,
                    latitude: object['latitude']?object['latitude']:null,
                    ip_address: object['ip_address']?object['ip_address']:null
                }
                return UserSession.add(user_session_obj).then(function(response) {
                    return response;
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message));
            }
        }
    };

    user_service={
        sign_up:function(object) {
            try{
                return private_methods.sign_up(object).then(function(user_object) {
                    return user_object[0]
                }).then(function(user_object) {
                    return User.add(user_object).then(function(user) {
                        return user;
                    })
                }).then(function(user) {
                    return private_methods.add_user_session(user,object).then(function(response) {
                        user =user.response_obj(user);
                        user['auth_token'] = response['auth_token'];
                        return user
                    })
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message));
            }
        },

        sign_in:function(object) {
            try{
                return private_methods.sign_in(object).then(function(user_object) {
                    return user_object[0]
                }).then(function(user_object) {
                    return User.get(user_object).then(function(user) {
                        if(user && user.length>0){
                            user =user[0]
                            if (user.validate_password(object['password'], user.password_hash, user.password_salt)){
                                return user;
                            }
                        }
                        else{
                            return Promise.reject(new Error("Account does not exist"))
                        }
                    }).then(function(user) {
                        if(user){
                            return private_methods.add_user_session(user,object).then(function(response) {
                                user =user.response_obj(user);
                                user['auth_token'] = response['auth_token'];
                                return user
                            })
                        }
                        return user;
                    })
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message));
            }
        }
    };
    Promise.longStackTraces();
    module.exports = user_service;