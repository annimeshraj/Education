var Promise     = require('bluebird');
var _             = require('lodash');
var	mongoose = require('mongoose');
var	subject = require('../../models/subject');
var Subject = mongoose.model('Subject');
mongoose.connect('mongodb://localhost:27017/sample_dev')

var object = [
    {name: "Physics"},
    {name: "Chemistry"},
    {name: "Biology"},
    {name: "Mathematics"},
    {name: "Music"},
    {name: "Art & Craft"},
    {name: "History"},
    {name: "Civics"},
    {name: "Geography"},
    {name: "Economics"},
    {name: "Hindi"},
    {name: "English"},
    {name: "Sanskrit"},
    {name: "Political Science"}
]

return Subject.add(object).then(function(response) {
    console.log("done")
    return true;
})

