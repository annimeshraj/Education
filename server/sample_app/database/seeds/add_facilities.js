var Promise     = require('bluebird');
var _             = require('lodash');
var	mongoose = require('mongoose');
var	facility = require('../../models/facility');
var Facility = mongoose.model('Facility');
mongoose.connect('mongodb://localhost:27017/sample_dev')

var object = [
    {name: "Fees - Online Payent", type: "MAIN"},
    {name: "Library", type: "MAIN"},
    {name: "Science Laboratories", type: "MAIN"},
    {name: "Computer Laboratory", type: "MAIN"},
    {name: "Music", type: "MAIN"},
    {name: "Art & Craft", type: "MAIN"},
    {name: "Transport", type: "MAIN"},
    {name: "Medical Aid", type: "OTHER"},
    {name: "Amphitheatre", type: "OTHER"},
    {name: "Security", type: "OTHER"},
    {name: "Dining Hall", type: "OTHER"},
    {name: "Swimming Pool", type: "OTHER"},
    {name: "Athletic Field", type: "OTHER"},
    {name: "Gymnasium", type: "OTHER"},
    {name: "Squash Court", type: "OTHER"},
    {name: "Horse Riding", type: "OTHER"}
]

return Facility.add(object).then(function(response) {
    console.log("done")
    return true;
})

