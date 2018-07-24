var taskProvider = new(require("../provider/taskProvider.js").taskProvider)();

taskService = function () {
    this.getTasks = function (callback) {
        taskProvider.getTasks(function (err, tasks) {
            callback(err, tasks);
        });
    }

    this.getTasksFromIds = function (productIds,callback) {
        taskProvider.getTasksFromIds(productIds,function (err,tasks){
            callback(err,tasks);
        })
    } 

    this.addTask = function (name, type, description, checkboxes, callback){
        taskProvider.addTask(name, type, description,checkboxes, function(err, task){
            callback(err, task);
        });
    }

    this.updateTask = function (taskId, task ,callback) {
        taskProvider.removeTask(taskId,task,function (err , task){
            callback(err,task);
        });
    };

    this.removeTask = function (taskId ,callback) {
        taskProvider.removeTask(taskId,function (err , task){
            callback(err,task);
        });
    };
}

exports.taskService = taskService;