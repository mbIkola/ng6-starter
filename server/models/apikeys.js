const mongoose = require('mongoose');
const sha1 = require('sha1');
const crypto = require('crypto');
const Schema = mongoose.Schema;



let ApiKeySchema = new Schema({
  title : { type: String },
  key : { type: String, required : true },
  salt : { type : String, required: true },
  createdAt : { type: Date, default: Date.now },
  deletedAt : { type: Date, default: null},
  deleted: { type: Boolean, default: false },
  accountId : { type: Schema.Types.ObjectId, ref: 'User', required: true}
});


ApiKeySchema.statics.encode = (userId, salt) => {
  return crypto.createHmac('sha1', salt).update(userId.toString()).digest('hex');
}

ApiKeySchema.methods = {
  verify : function() {
    return this.key === encode(this.accountId, this.salt);
  },
  toJSON : function() {
    var res = this.toObject();
    delete res.salt;
    return res;
  }
};

ApiKey = mongoose.model('ApiKeys', ApiKeySchema);

module.exports = ApiKey;
