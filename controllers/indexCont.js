const blogModel = require("../models/BlogsSchema");


exports.Homepage = function(req, res, next) {
    res.render('index');
  }

exports.Loginpage = function(req, res, next) {
    res.render('login');
}

exports.Registerpage = function(req, res, next) {
    res.render('register');
}

exports.Profilepage = async function(req, res, next) {
   
    const user = req.user;
    res.render('profile' , {user : user });
}

exports.Blogpage = function(req, res, next) {
    res.render('createblog');
}

exports.Blogs = async function(req, res, next) {
    try {
        const posts = await blogModel.find().populate("user");
        const user = req.user;
        res.render('blogs',{user : user , posts : posts} );
    } catch (error) {
        console.log(error)
    }
   
}

exports.ReadBlogs = async (req,res,next) =>{
    try {
        const id = await req.params.id ;
       const blog = await blogModel.findById(id).populate("user");
        res.render("ReadBlogs" , {blog : blog});
    } catch (error) {
        console.log(error)
    }
    
}




