var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	UserSessionSchema  = new Schema(db.tables["usersessions"])
//object methods
UserSessionSchema.methods = {

}

UserSessionSchema.statics = {
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
	},
	get: function(object) {
		return this.findOne(object).populate('user').exec();
	}
}

var UserSession = mongoose.model('UserSession', UserSessionSchema);