var Task = require("../models/task.js");

taskProvider = function () {
    this.getTasks = function (callback) {
        Task.find(function (err, tasks) {
            callback(err, tasks);
        });
    };

    this.getTasksFromIds = function (productIds,callback) {
        Task.find({ _id: { $in: productIds } }, function(err, tasks) {
            callback(err,tasks);
        });
    };

    this.addTask = function (name, type, description, checkboxes, callback) {
        console.log('task provider',name,description);
        Task.create({
            name: name,
             type: type,
            description: description,
            checkboxes: checkboxes
        },
            function (err, task) {
                if(err){
                    console.log(err);
                }
                callback(err, task)
            });
    }

    this.updateTask = function (taskId, task, callback) {
        Task.update({ _id: taskId }, task, function (err, task) {
            callback(err, task);
        });
    };

    this.removeTask = function (taskId, callback) {
        Task.remove({ _id: taskId }, function (err, task) {
            callback(err, task);
        });
    };
}

exports.taskProvider = taskProvider;