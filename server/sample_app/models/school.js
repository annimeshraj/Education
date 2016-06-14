var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	SchoolSchema  = new Schema(db.tables["schools"])
	// SchoolSchema.index({ name: 1}, { unique: true });

//object methods
SchoolSchema.methods = {
	response_obj: function(object) {
		return {
			name                  : object['name'],
			board                 : object['board'],
			address               : object['address'],
			city                  : object['city'],
			state                 : object['state'],
			country               : object['country'],
			zip_code              : object['zip_code'],
			longitude             : object['longitude'],
			latitude              : object['latitude'],
			ranking               : object['ranking'],
			facilities            : object['facilities'],
			facilities_percentage : object['facilities_percentage']
		}
	}
}

SchoolSchema.statics = {
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

var School = mongoose.model('School', SchoolSchema);