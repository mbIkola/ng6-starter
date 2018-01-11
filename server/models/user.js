const mongoose = require('mongoose');
const crypto   = require('crypto');



const Schema = mongoose.Schema;

var notificationsSchema = new Schema({
    profile_changed: { type: Boolean, default: true} ,
    unusual_login: { type: Boolean, default: false} ,
    report_weekly: { type: Boolean, default: true },
    report_daily: { type: Boolean, default: false }
});

var userSchema = new Schema({
    email: { type: String, required: true, index: true, unique: true },

    email_verified: {type: Boolean, default: false},
    email_verified_at: { type: Date, default: null},
    email_verified_by: { type: String, default: null},

    password_hash:  {type: String, required: false}, /* empty password for case whe sign up via social net :: insecure!!!! */
    firstname: String,
    lastname: String,
    phone: String,
    notifications: { type: Object, default: null },
    googleId: String,
    facebookId: String,
    role: { type : String },
    salt : { type : String },
    created_at : {
        type: Date,
        default: Date.now
    },
    notifications: notificationsSchema
});


userSchema.virtual('password')
    .get(function() {
        return this._password;
    })
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.password_hash = this.encryptPassword(password);
    });

userSchema.virtual('displayName').get(function() {
    if ( this.firstname ) return this.firstname;
    if ( this.lastname ) return this.lastname;
    return this.email;
});
/**
 * Another way to do the same:
 *
 const bcrypt = require('nodejs-bcrypt');
 userSchema.pre('save', function(next) {
   var user = this;
   if ( ! user.isModified('password')) return next() ;
   bcrypt.genSalt(10, function(err, salt) {
    if ( err ) return next(err);
    bcrypt.hash(user.password, salt, null , function(err, hash)  {
        if ( err) return next(err);
        user.password =hash;
        next();
    }
   })
})
 */


/**
 *
 * @type {{authenticate: mongoose.Schema.methods.authenticate, makeSalt: mongoose.Schema.methods.makeSalt, encryptPassword: mongoose.Schema.methods.encryptPassword, getPublicProjection: mongoose.Schema.methods.getPublicProjection}}
 */

userSchema.methods = {
    authenticate: function(plainTextPass) {
        return this.encryptPassword(plainTextPass) === this.password_hash;
    },

    makeSalt: function() {
        return (Math.random() * ( + new Date())).toString(16);
    },
    encryptPassword: function(plaintextPass) {
        return crypto.createHmac('sha1', this.salt).update(plaintextPass).digest('hex');
    },
    getPublicProjection: function() {
        return this.toJSON();
    },
    toJSON : function() { // the same as "getPublicProjection" but better
        var user = this.toObject();
        delete user.password;
        delete user.password_hash;
        delete user.salt;
        user.displayName = this.displayName;
        return user;
    },

    setEmailVerified( isVerified, reasonOrVerificationSource ) {
       this.email_verified = isVerified;
       this.email_verified_at = new Date();
       this.email_verified_by = reasonOrVerificationSource || 'unknown';
    }

};


module.exports = mongoose.model('User', userSchema);
