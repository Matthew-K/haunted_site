var express 	= require("express"),
	router 		= express.Router(),
	passport 	= require("passport"),
	User 		= require("../models/user"),
	middleware 	= require("../middleware");

// HOME PAGE
router.get("/", function(req, res) {
  res.render("home");
});

// Show register form
router.get("/register", function(req, res){
   res.render("register", {userMessage: req.flash("userMessage"), passwordMessage: req.flash("passwordMessage")}); 
});

// Sign up new user
router.post("/register", middleware.checkUsernameLength, middleware.checkPassword, function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("userMessage", "The given username is already registered");
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome " + user.username);
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
		failureRedirect: "/login",
		failureFlash: "Invalid Username or Password",
	}), function(req, res){
});

// Log out user
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully Logged out");
	res.redirect("/haunted_places");
});

module.exports = router;