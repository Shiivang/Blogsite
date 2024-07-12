var express = require('express');
const { Homepage, Loginpage, Registerpage, Profilepage } = require('../controllers/indexCont');
var router = express.Router();

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
};
 
/* GET home page. */
router.get('/', Homepage);

router.get('/login',Loginpage);

router.get('/register',Registerpage);

router.get('/profile',isLoggedin,Profilepage);

module.exports = router;
