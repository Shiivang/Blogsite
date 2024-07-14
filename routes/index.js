var express = require('express');
const { Homepage, Loginpage, Registerpage, Profilepage, Blogpage ,Blogs ,ReadBlogs } = require('../controllers/indexCont');
const { isLoggedin } = require('../utils/middelware');
var router = express.Router();


 
/* GET home page. */
router.get('/', Homepage);

router.get('/login',Loginpage);

router.get('/register',Registerpage);

router.get('/profile',isLoggedin,Profilepage);

router.get('/createblogs',isLoggedin, Blogpage);

router.get('/blogs',isLoggedin, Blogs);

router.get('/readblogs/:id',isLoggedin, ReadBlogs);

module.exports = router;
