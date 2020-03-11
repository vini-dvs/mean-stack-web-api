var config = require('config.json');
var express = require('express');
var router = express.Router();
var questionService = require('services/question.service');

// routes
router.get('/', getQuestions);
router.post('/newQuestion', newQuestion);

function getQuestions(req, res){
    questionService.listQuestions()
        .then(function (questions) {
            if (questions) {
                res.send(questions);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function newQuestion(req, res) {
    questionService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

module.exports = router;