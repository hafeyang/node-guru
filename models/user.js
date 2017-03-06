const mongoose = require('mongoose');
const db = require("../lib/mongo").guru;
const hash = require('password-hash');
const uuidV4 = require('uuid/v4');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  loginId: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    index: true,
    unique: true
  }
}, {
  timestamps: {},  // createdAt,updatedAt 字段并自动更新
  toObject: { getters: true, virtuals: false },
  toJSON: { getters: true, virtuals: false },
});


// stored in db password is : hash(md5(originPwd))
UserSchema.pre('save', function (next) {
  const self = this;
  self.password = hash.generate(self.password);
  self.accessToken || (self.accessToken = uuidV4());
  next();
});

// @see http://stackoverflow.com/questions/11761819/mongoose-jobschema-preupdate-functionnn-throws-typeerror-cannot-rea
UserSchema.pre('update', function () {
  const self = this;
  const update = self.getUpdate();
  self.update({}, {
    $set: {
      password: hash.generate(update.$set.password)
    }
  });
});

// 定义复合索引
// UserSchema.index({ field1: 1, field2: 1 });

module.exports = db.model('user', UserSchema, 'users');
