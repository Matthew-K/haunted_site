var express 		= require("express"),
	router 			= express.Router({mergeParams: true}),
	HauntedPlace 	= require("../models/haunted_place"),
	Comment			= require("../models/comment");

// NEW - show new comment form
router.get("/new", function(req, res){
	HauntedPlace.findById(req.params.id, function(err, haunted_place){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {haunted_place: haunted_place});
		}
	});
});

// CREATE - create a new comment
router.post("/", function(req, res){
	HauntedPlace.findById(req.params.id, function(err, haunted_place){
		if(err){
			console.log(err);
			res.redirect("/haunted_places");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					haunted_place.comments.push(comment);
					haunted_place.save();
					res.redirect("/haunted_places/" + haunted_place._id);
				}
			});
		}
	});
});	

module.exports = router;