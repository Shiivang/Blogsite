const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username : String ,
    fullname : String ,
    email : String ,
    password : String ,
    profileImg: {
    type:String,
    default:"https://cdn.vectorstock.com/i/1000v/26/40/profile-placeholder-image-gray-silhouette-vector-22122640.jpg"
    },
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "blog"
    }],
});

userSchema.plugin(plm);

module.exports = mongoose.model("user" , userSchema);

