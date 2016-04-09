var HauntedPlace = require("../models/haunted_place");
var Comment = require("../models/comment");

var middleware = {};

middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = middleware;