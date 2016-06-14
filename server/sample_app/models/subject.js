var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	SubjectSchema  = new Schema(db.tables["subjects"])
	SubjectSchema.index({ name: 1, sub_category:1}, { unique: true });
//object methods
SubjectSchema.methods = {
	response_obj:function(object) {
		return {
			subject_id: object['_id'].toString(),
			name: object['name'],
			sub_category: object['sub_category']
		}
	}
}

SubjectSchema.statics = {
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
	get:function(criteria, limit, page_no) {
		if(limit && page_no){
			return this.find(criteria).skip(page_no > 0 ? ((page_no-1)*limit) : 0).limit(parseInt(limit)).exec()
		}
		else{
			return this.find(criteria).exec()
		}
	},
	find_and_update:function(criteria,updated_obj) {
		return this.findOneAndUpdate(criteria,updated_obj,{new: true}).exec()
	},
	get_one:function(criteria) {
		return this.findOne(criteria).exec();
	},
	destroy:function(criteria) {
		return this.remove(criteria).exec();
	}
}

var Subject = mongoose.model('Subject', SubjectSchema);