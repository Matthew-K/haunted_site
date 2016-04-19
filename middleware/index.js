var HauntedPlace = require("../models/haunted_place");
var Comment = require("../models/comment");

var middleware = {};

middleware.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You Need To Login First");
	res.redirect("/login");
};

middleware.checkHauntedPlaceOwner = function(req, res, next){
	//check if user is logged in
	if(req.isAuthenticated()){
		//check if user submitted haunted place
		HauntedPlace.findById(req.params.id, function(err, haunted_place){
			if(err){
				req.flash("error", "The Haunted Place was not found.");
				console.log(err);
				res.redirect("back");
			} else {
				if(haunted_place.author.id.equals(req.user._id)){
					req.flash("success");
					next();
				} else {
					req.flash("error", "Permission Denied");
					res.redirect("back");
				}
			}
		});
	} else{
		req.flash("error", "You Need To Login First");
		res.redirect("back");
	}
};

middleware.checkCommentOwner = function(req, res, next){
	//check if user is logged in
	if(req.isAuthenticated()){
		//check if user submitted comment
		Comment.findById(req.params.comment_id, function(err, comment){
			if(err){
				req.flash("error", "Unable to locate comment.");
				res.redirect("back");
			} else {
				if(comment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "Permission Denied");
					res.redirect("back");
				}
			}
		});
	} else{
		req.flash("error", "You Need To Login First");
		res.redirect("back");
	}
};

module.exports = middleware;