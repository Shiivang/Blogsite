const blogModel = require("../models/BlogsSchema");
const userModel = require("../models/userSchema");



exports.Homepage = async function(req, res, next) {
    const posts = await blogModel.find().populate("user");
    const user = req.user;
    res.render('index',{user : user , posts : posts} );
  }

exports.Loginpage = function(req, res, next) {
    res.render('login' , {user :req.user});
}

exports.Registerpage = function(req, res, next) {
    res.render('register',{user :req.user});
}

exports.Profilepage = async function(req, res, next) {
    const user = await userModel.findById(req.user._id).populate("blogs")
    // const user = req.user;
    res.render('profile' , {user : user });
}

exports.Blogpage = function(req, res, next) {
    res.render('createblog' ,{user :req.user});
}

exports.BlogUpdate = async function(req, res, next) {
    try {
        const posts = await blogModel.findById(req.params.id);
        const user = req.user;
        res.render('update',{user : user , posts : posts} );
    } catch (error) {
        console.log(error)
    }
   
}

exports.ReadBlogs = async (req,res,next) =>{
    try {
        const id = await req.params.id ;
        const blogU = await blogModel.findById(id).populate("user");
       const blog = await blogModel.findById(id).populate({
        path: "comments",
        populate: { path: "postedBy", model: "user" }}
    ).exec();
        res.render("ReadBlogs" , {blog : blog , blogU : blogU , user :req.user});
    } catch (error) {
        console.log(error)
    }
    
}

exports.UpdateProfile = async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.params.id) ;
        res.render("update-profile" , {  user});
    } catch (error) {
        console.log(error)
    }
    
}

