var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	FacilitySchema  = new Schema(db.tables["facilities"])
	FacilitySchema.index({ name: 1}, { unique: true });
//object methods
FacilitySchema.methods = {

}

FacilitySchema.statics = {
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

var Facility = mongoose.model('Facility', FacilitySchema);