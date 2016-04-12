var express 		= require("express"),
	router 			= express.Router({mergeParams: true}),
	HauntedPlace 	= require("../models/haunted_place"),
	Comment			= require("../models/comment"),
	middleware 		= require("../middleware");

// NEW - show new comment form
router.get("/new", middleware.isLoggedIn, function(req, res){
	HauntedPlace.findById(req.params.id, function(err, haunted_place){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {haunted_place: haunted_place});
		}
	});
});

// CREATE - create a new comment
router.post("/", middleware.isLoggedIn, function(req, res){
	HauntedPlace.findById(req.params.id, function(err, haunted_place){
		if(err){
			console.log(err);
			res.redirect("/haunted_places");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					// username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					haunted_place.comments.push(comment);
					haunted_place.save();
					res.redirect("/haunted_places/" + haunted_place._id);
				}
			});
		}
	});
});	

// EDIT - show edit form for a comment
router.get("/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/edit", {haunted_place_id: req.params.id, comment: foundComment});
		}
	});
});

// UPDATE - update a comment
router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated_comment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/haunted_places/" + req.params.id);
		}
	});
});

// DELETE - delete a comment
router.delete("/:comment_id", function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
			res.redirect("/haunted_places" + req.params.id);
		} else {
			res.redirect("/haunted_places/" + req.params.id);
		}
	});
});




module.exports = router;