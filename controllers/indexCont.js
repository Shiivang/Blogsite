exports.Homepage = function(req, res, next) {
    res.render('index');
  }

exports.Loginpage = function(req, res, next) {
    res.render('login');
}

exports.Registerpage = function(req, res, next) {
    res.render('register');
}

exports.Profilepage = function(req, res, next) {
    const user = req.user;
    res.render('profile' , {user : user});
}






