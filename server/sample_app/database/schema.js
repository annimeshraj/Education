var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

db={
    applog:{

    },
	appclients:{
        client_name            : {type: String, required: true},
        description            : {type: String},
        api_key                : {type: String, required: true},
        api_secret_key_hash    : {type: String, required: true},
        api_secret_key_salt    : {type: String, required: true},
        is_active              : {type: Boolean, default: true},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    },
	subscriptions:{
		email_id               : {type: String,  required: true},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
	},
	contactus   : {
        name                   : {type: String, required: true},
        email_id               : {type: String, required: true},
        address_1              : {type: String},
        address_2              : {type: String},
        subject                : {type: String, required: true},
        message                : {type: String, required: true, minlength: [50,'Messsage length should be minimum of 50 characters']},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    },
    errorlogs:{
    	// user_id 		       : {type: String,nullable: true, references: 'users._id'},
        user                   : {type: Schema.Types.ObjectId, ref: 'User'},
    	api 		           : {type: String,nullable: false},
    	origin 		           : {type: String,nullable: false},
    	user_input 	           : {type: String,nullable: false},
    	error_type 	           : {type: String,nullable: false},
    	error_message          : {type: String,nullable: false},
    	stack_trace 	       : {type: String,nullable: false},
        created_at             : {type: Date, nullable: false, default:Date.now},
    	updated_at 	           : {type: Date, nullable: false, default:Date.now}
    },
    usersessions:{
        auth_token               : {type: String,required: true},
        user                     : {type: Schema.Types.ObjectId, ref: 'User',required: true},
        device_id                : {type: String, default: null},
        device_unique_identifier : {type: String, default: null},
        client_type              : {type: String, required: true},
        longitude                : {type: Number, default: null},
        latitude                 : {type: Number, default: null},
        ip_address               : {type: String, default: null},
        created_at               : { type: Date, nullable: false, default: Date.now},
        updated_at               : { type: Date, nullable: false, default: Date.now},
        // duration
    },
    schools:{
        name                   : {type: String, required: true},
        board                  : {type: String, required: true, enum: ['STATE', 'CBSE','ICSC']},
        photo                  : {type: String, default: null},
        address                : {type: String, default: null},
        city                   : {type: String, required: true},
        state                  : {type: String, required: true},
        country                : {type: String, required: true},
        zip_code               : {type: String, required: true},
        longitude              : {type: Number, default: null},
        latitude               : {type: Number, default: null},
        ranking                : {type: Number, default: null},
        facilities             : [{type: Schema.Types.ObjectId, ref: 'Facility'}],
        facilities_percentage  : {type: Number, default: 0},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    },
    facilities:{
        name                   : {type: String, required: true}, 
        type                   : {type: String, required: true, enum: ['MAIN', 'OTHER']},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    },
    subjects   : {
        name                   : {type: String, required: true},
        sub_category           : {type: String, required: true},
        is_active              : {type: Boolean, default: true},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    },
    users:{
        first_name             : {type: String, default: ''},
        last_name              : {type: String, default: ''},
        role                   : {type: String, required: true, enum: ['STUDENT', 'TEACHER','SCHOOL']},
        date_of_birth          : {type: Date, default: null},
        photo                  : {type: String, default: null},
        state                  : {type: String, default: null},
        city                   : {type: String, default: null},
        class_s                : {type: String, default: null},
        gender                 : {type: String, required: true, enum: ['M', 'F']},
        email_id               : {type: String,  required: true},
        password_hash          : {type: String, required: true, default: '' },
        password_salt          : {type: String, required: true, default: '' },
        mobile_no              : {type: String, default: null},
        ranking                : {type: Number, default: null},
        school                 : {type: Schema.Types.ObjectId, ref: 'School', default: null},
        subject                : {type: Schema.Types.ObjectId, ref: 'Subject', default: null},
        fb_settings            : {},
        twitter_settings       : {},
        linkedin_settings      : {},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    },
    questions:{
        title                  : {type: String, required: true},
        description            : {type: String, required: true},
        author                 : {type: Schema.Types.ObjectId, ref: 'User',required: true},  
        likes                  : [],
        followers              : [],
        category               : [], //subject
        sub_category           : [],
        answers                : [{type: Schema.Types.ObjectId, ref: 'Answer'}],
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    },
    answers:{
        answer                 : {type: String, required: true},
        question               : {type: Schema.Types.ObjectId, ref: 'Question',required: true},
        author                 : {type: Schema.Types.ObjectId, ref: 'User',required: true},
        likes                  : [],
        dislikes               : [],
        satisfied              : [],
        follows                : [],
        replied                : [{type: Schema.Types.ObjectId, ref: 'Answer',default: null}],
        is_reply               : {type: Boolean, default: false},
        created_at             : {type: Date, nullable: false, default:Date.now},
        updated_at             : {type: Date, nullable: false, default:Date.now}
    }

};
function is_email_id(email){
    var emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);  
    return emailRegex.test(email);
}
function validation_error(err){
        message = []
        if (err) {
            for (field in err.errors) {
                message.push(err.errors[field].message);
            }
        }
        return message
}
module.exports.tables = db;
module.exports.checks = {
    validate_email_id:is_email_id,
    validation_error:validation_error
};
