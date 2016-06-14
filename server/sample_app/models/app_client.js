var mongoose = require ("mongoose"),
 Schema = mongoose.Schema,
 ObjectId = Schema.ObjectId,
 db=require("../database/schema"),
 AppClientSchema= new Schema(db.tables["appclients"]);


//object methods
AppClientSchema.methods = {
}

AppClientSchema.statics = {
	find_one: function(object){
		return this.findOne(object).exec();		
	}
	
}

var AppClient = mongoose.model('AppClient', AppClientSchema);