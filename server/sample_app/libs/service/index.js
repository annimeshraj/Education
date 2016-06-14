var _                           = require('lodash'),
    Promise                     = require('bluebird'),
    user                        = require('./user_service'),
    user_session                = require('./user_session_service'),
    school                      = require('./school_service'),
    subject                     = require('./subject_service'),
    question                    = require('./question_service'),
    answer                      = require('./answer_service'),
    contact_us                  = require('./contact_us_service'),
    subscription                = require('./subscription_service')

module.exports = {
    subscription_service        : subscription,
    contact_us_service          : contact_us,
    user_session_service        : user_session,
    user_service                : user,
    school_service              : school,
    subject_service             : subject,
    question_service            : question,
    answer_service              : answer
};