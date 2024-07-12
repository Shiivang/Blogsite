
const passport = require("passport");
const userModel = require("../models/userSchema");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


exports.signUppage = async (req,res,next)=>{
    try {
        const newUser = userModel({
            username : req.body.username ,
            fullname : req.body.fullname ,
            email : req.body.email
        })
        userModel.register(newUser,req.body.password).then((registereduser)=>{
            passport.authenticate('local')(req,res,()=>{
                res.redirect("/login");
            })
        })
        
    } catch (error) {
        console.log(error.message);
    }
};

exports.signInpage = passport.authenticate('local',{
    successRedirect : "/profile" ,
    failureRedirect : "/login" 
}) , (req,res,next)=>{};

exports.Logout = async (req,res,next)=>{
    try {
        req.logout(
            ()=>{
                res.redirect("/login")
            }
        )        
    } catch (error) {
        console.log(error);
    }
};