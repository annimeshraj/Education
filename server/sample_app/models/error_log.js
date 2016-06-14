var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	ErrorLogSchema  = new Schema(db.tables["error_logs"])

//object methods
ErrorLogSchema.methods = {

}

ErrorLogSchema.statics = {
	add: function(obj){
		return ErrorLog.create(obj).then(function(response){
			return response
		});		
	}
}

var ErrorLog = mongoose.model('ErrorLog', ErrorLogSchema);