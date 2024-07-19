
const passport = require("passport");
const userModel = require("../models/userSchema");
const blogModel = require("../models/BlogsSchema");


const localStrategy = require("passport-local");

const imagekit = require("../utils/imagekit");
const commentModel = require("../models/commentSchema");

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

exports.CreateBlogs = async (req,res,next) => {
    try {
        const newBlog = await blogModel({
            title : req.body.title ,
            desc : req.body.desc ,
            blogImage : req.body.blogImage ,
            user : req.user._id ,
        })

        req.user.blogs.push(newBlog._id)

        await newBlog.save();
       
        await req.user.save()

        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
};

exports.UpdateBlog = async (req,res,next) =>{
    try {

        const updateBlog = await blogModel.findByIdAndUpdate(req.params.id , req.body) ;

        await updateBlog.save();
        res.redirect("/profile");
        
    } catch (error) {
        console.log(error)
    }
};

exports.DeleteBlog = async (req,res,next)=>{
    try {
        const deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
        res.redirect("/profile");
    } catch (error) {
        console.log(error)
    }
};

exports.profileUpdate = async (req,res,next)=>{
    try {

        const user = await userModel.findById(req.params.id);
       
       

        if (!user) {
            res.send("user not found");
          }
      
        const { fileId, url, thumbnailUrl } = await imagekit.upload({
          file: req.files.avatar.data,
          fileName: req.files.avatar.name,
        });
      
       
        if (!url) {
    res.send("their is some error while genrating url through imagekit");
  }
        user.profileImg = url;
        await user.save();
        res.render("update-profile", { user });
        
    } catch (error) {
        console.log(error)
    }
};

exports.profileUpdatedata =  async (req,res,next)=>{ 
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id,req.body);
        await user.save()
        res.redirect("/profile");
    } catch (error) {
        console.log(error)
    }
}

exports.Comment = async (req,res,next)=>{
    try {

        const newComment = await new commentModel({
            commentText: req.body.comment,
            postedBy: req.user._id,
            blogId:req.params.id
        })
        await newComment.save();

        const currentBlog = await blogModel.findByIdAndUpdate(req.params.id,({$push:{comments:newComment._id}}));
        await currentBlog.save();
        res.redirect(`/readblogs/${req.params.id}`)
        
    } catch (error) {
        console.log(error)
    }
}