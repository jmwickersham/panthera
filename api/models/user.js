const mongoose = require("mongoose"),
      crypto   = require('crypto'),
      jwt      = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    first_name: String,
    last_name: String,
    email: String,
    imageURL: String,
    created_by: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    updated_by: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    hash: String,
    salt: String
},
{
    timestamps: true
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username, 
        first_name: this.first_name,
        last_name: this.last_name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "Super secret passphrase thing!"); // Change to different env variable later
};

module.exports = mongoose.model("User", userSchema);
