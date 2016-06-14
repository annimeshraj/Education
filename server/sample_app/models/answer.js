var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	AnswerSchema  = new Schema(db.tables["answers"]);

//object methods
AnswerSchema.methods = {
	response_obj:function(response) {
		return {
			answer_id: response['_id'],
			answer: response['answer'],
			author: response['author'],
			likes:  response['likes'],
			dislikes: response['dislikes'],
			satisfied: response['satisfied'],
			follows: response['follows'],
			replied: response['replied'],
			is_reply: response['is_reply'],
			created_at: response['created_at']
		}
	}
}

AnswerSchema.statics = {
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
	update_obj:function(criteria, updated_obj) {
		return this.findOneAndUpdate(criteria,updated_obj,{'new': true}).exec();
	},
	get_one:function(criteria) {
		return this.findOne(criteria).populate('author').populate('replied').exec();
	},
	get:function(criteria) {
		return this.find(criteria).populate('author').populate('replied').exec();
	}
}

var Answer = mongoose.model('Answer', AnswerSchema);