var express = require('express');
const { Homepage } = require('../controllers/indexCont');
const { signUppage, signInpage, Logout , CreateBlogs ,UpdateBlog ,DeleteBlog  ,profileUpdate ,profileUpdatedata ,Comment} = require('../controllers/userCont');
const { isLoggedin } = require('../utils/middelware');
var router = express.Router();

/* GET users listing. */
router.get('/', Homepage);

router.post('/register' , signUppage);

router.post('/login' , signInpage); 

router.get('/logout', isLoggedin, Logout);

router.post('/createblogs',isLoggedin, CreateBlogs );

router.post("/updateblogs/:id" , isLoggedin, UpdateBlog );

router.get("/delete/:id" , isLoggedin, DeleteBlog );

router.post("/update-profile/:id" , isLoggedin, profileUpdate  );

router.post("/update-profile-data/:id" , isLoggedin, profileUpdatedata  );

router.post("/comment/:id", isLoggedin , Comment);

module.exports = router;
