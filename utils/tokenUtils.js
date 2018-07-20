var jwt = require('jsonwebtoken');
var config = require('../config');

var createToken = function(auth) {
    var token = jwt.sign({ id: auth.id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
    return token;
};

module.exports = {
  generateToken: function(req, res, next) {
      console.log('inside generate token');
      req.token = createToken(req.auth);
      return next();
  },
  sendToken: function(req, res) {
    console.log('inside send token');
      res.setHeader('authorization', req.token);
      return res.status(200).send(JSON.stringify(req.user));
  }
};