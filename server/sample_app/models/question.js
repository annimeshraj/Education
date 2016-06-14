var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	QuestionSchema  = new Schema(db.tables["questions"]);

//object methods
QuestionSchema.methods = {
	response_obj:function(response) {
		return {
			question_id      : response['_id'],
			title            : response['title']?response['title']:"",
			description      : response['description']?response['description']:"",
			author           : response['author']?response['author']:"",
			likes            : response['likes']?response['likes']:"",
			followers        : response['followers']?response['followers']:"",
			category         : response['category']?response['category']:"",
			sub_category     : response['sub_category']?response['sub_category']:"",
			answers          : response['answers']?response['answers']:[],
			created_at       : response['created_at']?response['created_at']:"",
			updated_at       : response['updated_at']?response['updated_at']:"",
		}
	}
}

QuestionSchema.statics = {
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
	update:function(criteria, updated_obj) {
		return this.findOneAndUpdate(criteria,updated_obj,{'new': true}).exec();
	},
	get_one:function(criteria) {
		return this.findOne(criteria).populate('author').exec();
	},
	get_one_with_answers:function(criteria) {
		return this.findOne(criteria).populate('author').populate('answers').exec();
	},
	get_list:function(criteria, limit, page_no) {
		if(limit && page_no){
			return this.find(criteria).sort({"updated_at":-1}).skip(page_no > 0 ? ((page_no-1)*limit) : 0).limit(parseInt(limit)).exec()
		}
		else{
			return this.find(criteria).populate('author').exec()
		}
	}
}

var Question = mongoose.model('Question', QuestionSchema);