var mongoose        = require ("mongoose"),
	utility    		= require('../utility'),
	Schema          = mongoose.Schema,
	ObjectId        = Schema.ObjectId,
	db              =require("../database/schema"),
	UserSchema  = new Schema(db.tables["users"])
	UserSchema.index({ email_id: 1}, { unique: true });

//object methods
UserSchema.methods = {
	response_obj:function(response) {
		return {
			user_id: response['_id'],
			first_name: response['first_name']?response['first_name']:"",
			last_name: response['last_name']?response['last_name']:"",
			role: response['role'],
			date_of_birth: response['date_of_birth']?new Date(response['date_of_birth']):null,
			photo: response['photo']?response['photo']:null,
			email_id: response['email_id'], 
			state: response['state']?response['state']:"", 
			city: response['city']?response['city']:"", 
			phone_no: response['phone_no']?response['phone_no']:null,
			ranking: response['ranking']?response['ranking']:null,			
            school: response['school_id'],
            subject: response['subject_id'],
            class_s: response['class_s']
		}
	},
	validate_password: function(password, passwordHash,passwordSalt) {
		var encyrptKey=utility.encrypt_decrypt.encrypt(password,passwordSalt);
		return (encyrptKey==passwordHash);	
	},
}

UserSchema.statics = {
	add: function(obj){
		console.log(1)
		return this.create(obj).then(function(res){
			return res;
		},function(error){
			if(error.name=="ValidationError"){
				throw (new Error(db.checks.validation_error(error)));
			}
			else{
					throw error['message'];
				}			
		});		
	},
	get:function(criteria) {
		return this.find(criteria).exec();
	}
}

var User = mongoose.model('User', UserSchema);