var express = require('express');
const { Homepage } = require('../controllers/indexCont');
const { signUppage, signInpage, Logout , CreateBlogs } = require('../controllers/userCont');
var router = express.Router();

/* GET users listing. */
router.get('/', Homepage);

router.post('/register' , signUppage);

router.post('/login' , signInpage); 

router.get('/logout', Logout);

router.post('/createblogs', CreateBlogs );


module.exports = router;
