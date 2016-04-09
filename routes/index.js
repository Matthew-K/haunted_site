var express 	= require("express"),
	router 		= express.Router(),
	passport 	= require("passport"),
	User 		= require("../models/user");

// HOME PAGE
router.get("/", function(req, res) {
  res.render("home");
});

// Show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// Sign up new user
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/haunted_places");
		});
	});
});

// Show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// Log in a user
router.post("/login", passport.authenticate("local", {
		successRedirect: "/haunted_places",
		failureRedirect: "/login"
	}), function(req, res){
});

// Log out user
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/haunted_places");
});

module.exports = router;