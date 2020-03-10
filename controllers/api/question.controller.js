var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/question.service');

// routes
router.get('/', getQuestions);

function getQuestions(res){
    userService.listQuestions()
        .then(function (questions) {
            if (questions) {
                //res.send(questions);
                res.send(200);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

module.exports = router;