var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('questions');

var service = {};


service.listQuestions = listQuestions;

function listQuestions(){
    var deferred = Q.defer();

    db.questions.find(function (err, questions) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (questions) {
            // return user (without hashed password)
            deferred.resolve(questions);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(question) {
    var deferred = Q.defer();

    function createQuestion() {
        db.questions.insert(
            question,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    }
    return deferred.promise;
}


module.exports = service;