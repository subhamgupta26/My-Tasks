var express = require('express');
var router = express.Router();

var taskService = new (require('../service/taskService.js')).taskService();

/* GET products listing. */
router.get('/', function(req, res, next) {

    taskService.getTasks(function (err, tasks) {
        if (err) {
            return res.status(500).send({message:"There was a problem finding the tasks."});
        }
        res.status(200).send({'response':tasks});        
    })
});


router.post('/addTask', function(req, res, next) {

    taskService.createTask(function (name, type, description, checkboxes, task) {
        if (err) {
            return res.status(500).send({message:"There was a problem adding the task"});
        }
        res.status(200).send({'response':task});        
    })
});

router.post('/updateTask', function(req, res, next) {

    taskService.updateTask(req.body._id,req.body,function (err, task) {
        if (err) {
            return res.status(500).send({message:"There was a problem updating the task"});
        }
        res.status(200).send({'response':task});        
    })
});

module.exports = router;
