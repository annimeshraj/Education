var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    question             = require('../../models/question'),
    answer               = require('../../models/answer'),
    Question             = mongoose.model('Question'),
    Answer               = mongoose.model('Answer'),
    docName              = 'question_service',
    question_service,
    private_methods;

    private_methods={ 
        create:function(object) {
            try{
                var question_object = {
                    title: object['title'],
                    description: object['description'],
                    author: object['author_id'],
                    like: [],
                    category: object['category'],
                    followers: [],
                    sub_category: [],
                    answers: []
                }
                return Promise.join(question_object)
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        index_criteria:function(object) {
            try{
                if(object['type'] == "NEW"){
                    var criteria = {"updatedt_at":{"$gt": new Date().addHours(-48)}};
                }
                else if(object['type'] == "ANSWERED"){
                    var criteria = {"answers":{"$ne":[]}}
                }
                else if(object['type'] == "UNANSWERED"){
                    var criteria = {"answers":[]}
                }
                else{
                    var criteria = {"likes": {"$ne":[]}};
                }
                return Promise.join(criteria)
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };

    question_service={
        create:function(object) {
            try{
                return private_methods.create(object).then(function(question_object) {
                    return question_object[0]
                }).then(function(question_object) {
                    return Question.add(question_object).then(function(response) {
                        return response.response_obj(response);
                    })
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        show:function(object) {
            try{
                return Question.get_one({"_id":object['question_id']}).then(function(response) {
                    return response.response_obj(response);
                }).then(function(question) {
                    console.log(1)
                    if(question['answers'] && question['answers'].length>0){
                        console.log(2)                        
                        return Answer.get({"_id":{"$in": question['answers']}}).then(function(answers) {
                        console.log(3)                        
                            
                            answers = answers.map(function(ans) {
                                return ans.response_obj(ans)
                            })
                        console.log(4)                        

                            question['answers'] = answers;
                        console.log(5)                        

                            console.log(JSON.stringify(question));
                            return question;
                        })
                    }
                    return question
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        index:function(object) {
            return private_methods.index_criteria(object).then(function(criteria) {
                return criteria[0]
            }).then(function(criteria) {
                console.log(criteria)
                return Question.get_list({}).then(function(response) {
                    if(response && response.length>0){
                        return response.map(function(res) {return res.response_obj(res); })
                    }
                })
            })
        }
    };
    Promise.longStackTraces();
    module.exports = question_service;