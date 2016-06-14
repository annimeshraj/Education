var Promise              = require('bluebird'),
    _                    = require('lodash'),    
    mongoose             = require('mongoose'),
    utility              = require('../../utility'),
    configuration        = require('../../configuration'),
    answer               = require('../../models/answer'),
    question             = require('../../models/question'),
    Answer               = mongoose.model('Answer'),
    Question             = mongoose.model('Question'),
    docName              = 'answer_service',
    answer_service,
    private_methods;

    private_methods={ 
        create:function(object) {
            try{
                var answer_object = {
                    answer: object['answer'],
                    question: object['question_id'],
                    author: object['author_id'],
                    likes: [],
                    dislikes: [],
                    satisfied: [],
                    follows: [],
                    replied: [],
                    is_reply: false
                }
                return Promise.join(answer_object)
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        reply:function(object) {
            try{
                var reply_object = {
                    answer: object['reply'],
                    question: object['question_id'],
                    author: object['author_id'],
                    likes:[],
                    dislikes:[],
                    satisfied: [],
                    follows: [],
                    replied: [],
                    is_reply: true,
                }
                return Promise.join(reply_object)
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };

    answer_service={
        create:function(object) {
            try{
                return private_methods.create(object).then(function(answer_object) {
                    return answer_object[0]
                }).then(function(answer_object) {
                    return Answer.add(answer_object).then(function(response) {
                        return response
                    }).then(function(object) {
                        return Question.get_one({"_id":answer_object['question'].toString()}).then(function(ques_obj) {
                            return ques_obj['answers']
                        }).then(function(answers) {
                            answers.push(object['_id'])
                            return Question.update({"_id":answer_object['question']},{"$set":{"answers":answers}}).then(function(res) {
                                return object.response_obj(object);
                            })
                        })
                    })
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        },
        reply:function(object) {
            try{
                return private_methods.reply(object).then(function(answer_object) {
                    return answer_object[0]
                }).then(function(answer_object) {
                    return Answer.add(answer_object).then(function(response) {
                        return response
                    })
                }).then(function(response) {
                    return Answer.get_one({_id: object['answer_id']}).then(function(ans) {
                        return ans['replied']
                    }).then(function(replied) {
                        replied.push(response['_id'])
                        return Answer.update_obj({"_id":object['answer_id']},{"$set":{replied: replied}}).then(function(response) {
                            return response.response_obj(response);
                        })
                    })
                })
            }
            catch(error){
                return Promise.reject(new TypeError(error.message))
            }
        }
    };
    Promise.longStackTraces();
    module.exports = answer_service;