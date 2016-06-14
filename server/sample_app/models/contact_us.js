var mongoose             = require ("mongoose"),
_                        = require('lodash'),
Promise                  = require('bluebird'), 
utility    		         = require('../utility'),
Schema                   = mongoose.Schema,
ObjectId                 = Schema.ObjectId,
db                       = require("../database/schema"),
configuration			 = require("../configuration");

var ContactUsSchema= new Schema(db.tables["contactus"]);
// ContactUsSchema.index({ email_id: 1}, { unique: true });


//object methods
ContactUsSchema.methods = {
	response_obj:function(response) {
		return {
			name          : response['name'],
			email_id      : response['email_id'],
			address_1     : response['address_1'],
			address_2     : response['address_2'],     
			subject       : response['subject'],
			message       : response['message']
		}
	}
}
//class methods
ContactUsSchema.statics = {
	add: function(obj){
		return this.create(obj).then(function(res){
			return res;
		},function(error){
			if(error.name=="ValidationError"){
				throw (new Error(db.checks.validation_error(error)));
			}
			else
				{
					throw error['message'];
				}			
		});
	}
}
var ContactUs = mongoose.model('ContactUs', ContactUsSchema);
