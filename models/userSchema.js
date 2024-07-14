const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username : String ,
    fullname : String ,
    email : String ,
    password : String ,
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "blog"
    }]
});

userSchema.plugin(plm);

module.exports = mongoose.model("user" , userSchema);

