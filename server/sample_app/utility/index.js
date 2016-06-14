var _               = require('lodash'),
Promise             = require('bluebird'),
crypto              = require("crypto"),
jwt_secret_key      = 'eyJ0eXAiOiJKV1QiLCJhbGci',
config              = require('../configuration/system.js'),
phone               = require('node-phonenumber'),
htmlToText          = require('html-to-text'),
syncHttpRequest     = require('sync-request'),
rp      = require('request-promise'),
// ffmpeg              = require('fluent-ffmpeg-extended'),
response_json,
validations,
encrypt_decrypt,
convert;

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
};
response_json = {
	response : function(status, message, data,status_code){
		var validate_object = {
           status: status,
           message: message,
           data: data,
           status_code: status_code ? status_code : null
       };
       return validate_object;
   }
};
validations={
    is_valid_email:  function (email) {
        // First check if any value was actually set
        if (email.length == 0) return false;
        // Now validate the email format using Regex
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return re.test(email);
    },
    password_match : function(password, confirm_password){
        return (password  === confirm_password)
    },
};
encrypt_decrypt={
    random_string:function(length, chars) {
        if(!chars){
            chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    },
    create_salt:function (length) {
        var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(!length)
        {
            length=16;
        }
        var result = '';
        var salt='';
        //for (var i = 32; i > 0; --i) {result += chars[Math.round(Math.random() * (chars.length - 1))]};
        for (var i = 32; i > 0; --i) {salt += chars[Math.round(Math.random() * (chars.length - 1))]};
            var cipher=crypto.createCipher('aes-256-cbc-hmac-sha1',salt);
        var crypted=cipher.update(result,'utf8','base64');
        crypted +=cipher.final('base64');
        return (crypted).substr(0,length);
    },
    encrypt:function(text,salt){
      var hash= crypto.createHmac('sha256',salt).update(text).digest("base64");
      return hash;
    },
    create_token:function(user_id,obj)
    {
        var current_date = new Date();
        var expired_date = current_date.setFullYear(current_date.getFullYear() + 10);
        var user_hash_data = {expire_date: expired_date,user_id: user_id};
        if(obj) {
            user_hash_data=obj; 
        }
        user_hash_data=JSON.stringify(user_hash_data);
        var cipher = crypto.createCipher('aes-256-cbc',jwt_secret_key)
        var crypted = cipher.update(user_hash_data,'utf8','hex')
        crypted += cipher.final('hex');
        return crypted;
    },
    encode_token:function(userId){
        try{
            //token will expired after one day
            var current_date = new Date();
            expired_date = current_date.addMinutes(24*60);
            var hash_data = {expired_date: expired_date,userId: userId};
            hash_data=JSON.stringify(hash_data);
            var cipher = crypto.createCipher('aes-256-cbc',jwt_secret_key);
            var crypted = cipher.update(hash_data,'utf8','hex')
            crypted += cipher.final('hex');
            return crypted;
        }
        catch(error){
            return Promise.reject(new TypeError(error.message));
        }
    },
    decode_token:function(text)
    {
        try{
            var decipher = crypto.createDecipher('aes-256-cbc',jwt_secret_key)
            var dec = decipher.update(text,'hex','utf8')
            dec += decipher.final('utf8');
            dec=JSON.parse(dec);
            return dec;
        }
        catch(error){
           throw (new Error("Invalid Token"));
        }
    }
};
module.exports = {
	response_json   : response_json,
    validations      : validations,
    encrypt_decrypt : encrypt_decrypt
};

