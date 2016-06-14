var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	SubscriptionSchema  = new Schema(db.tables["subscriptions"])
	SubscriptionSchema.index({ email_id: 1}, { unique: true });

SubscriptionSchema.path('email_id').validate(function (email_id, fn) {
	if (this.isNew || this.isModified('email_id')) {
		return Subscription.find({ email_id: email_id }).exec(function (err, users) {
			return fn(!err && users.length === 0);
		});
	} else return fn(true);
}, 'EmailId already exists');

//object methods
SubscriptionSchema.methods = {
	response_obj:function(object) {
		return {
			"email_id": object['email_id']
		}
	}
}

SubscriptionSchema.statics = {
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

var Subscription = mongoose.model('Subscription', SubscriptionSchema);