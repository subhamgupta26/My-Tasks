var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {type: String, required: true, max: 100},
    password: {type: String, max: 100},
    name: {type: String, max: 100},
    tasks : [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    googleProvider: {
      type: {
          id: String,
          token: String
      },
      select: false
  }
  }
);
UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  console.log('inside upsert method',profile);
  var that = this;
  return this.findOne({
      'googleProvider.id': profile.id
  }, function(err, user) {
    console.log('user not found',user);
      // no user was found, lets create a new one
      if (!user) {
          var newUser = new that({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleProvider: {
                  id: profile.id,
                  token: accessToken
              }
          });
          console.log('newUser',newUser);

          newUser.save(function(error, savedUser) {
              if (error) {
                  console.log(error);
              }
              console.log('savedUser',savedUser)
              return cb(error, savedUser);
          });
      } else {
          return cb(err, user);
      }
  });
};

module.exports = mongoose.model('User', UserSchema);