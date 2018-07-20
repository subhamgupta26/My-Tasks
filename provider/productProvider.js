var Task = require("../models/task.js");

productProvider = function () {
    this.getProducts = function (callback) {
        Task.find(function (err, products) {
            callback(err, products);
        });
    };

    this.getProductsFromIds = function (productIds,callback) {
        Task.find({ _id: { $in: productIds } }, function(err, products) {
            callback(err,products);
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
}

exports.productProvider = productProvider;