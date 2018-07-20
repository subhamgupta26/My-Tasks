var productProvider = new(require("../provider/productProvider.js").productProvider)();

productService = function () {
    this.getProducts = function (callback) {
        productProvider.getProducts(function (err, products) {
            callback(err, products);
        });
    }

    this.getProductsFromIds = function (productIds,callback) {
        productProvider.getProductsFromIds(productIds,function (err,products){
            callback(err,products);
        })
    } 

    this.addTask = function (name, type, description, checkboxes, callback){
        productProvider.addTask(name, type, description,checkboxes, function(err, user){
            callback(err, user);
        });
    }
}

exports.productService = productService;