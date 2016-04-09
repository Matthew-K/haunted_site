var express 		= require("express"),
	router 			= express.Router(),
	HauntedPlace 	= require("../models/haunted_place");

// INDEX - list all the haunted places with a description and option to show more info
router.get("/", function(req, res){
	HauntedPlace.find({}, function(err, haunted_places){
		if(err){
			console.log(err);
		} else {
			res.render("haunted_places/index", {haunted_places: haunted_places});
		}
	});
});

// NEW - show form to create a new haunted place
router.get("/new", function(req, res){
	res.render("haunted_places/new");
});

// CREATE - create a new haunted place
router.post("/", function(req, res){
	//add new haunted place to haunted_places collection
	HauntedPlace.create(
     {name: req.body.name, image: req.body.image, description: req.body.description},
     function(err, haunted_place){
      if(err){
          console.log(err);
      } else {
      	//render haunted_places with new haunted place now on the page
		res.redirect("/haunted_places");
      }
    });
});

// SHOW - show more info and comments about a haunted place
router.get("/:id", function(req, res){
	HauntedPlace.findById(req.params.id).populate("comments").exec(function (err, haunted_place) {
		if(err){
			console.log(err);
		} else {
			res.render("haunted_places/show", {haunted_place: haunted_place});
		}
	});
});

// EDIT - show edit form for a haunted place
router.get("/:id/edit", function(req, res){
	HauntedPlace.findById(req.params.id, function(err, haunted_place){
		if(err){
			console.log(err);
		} else {
			res.render("haunted_places/edit", {haunted_place: haunted_place});
		}
	});
});

// UPDATE - update a haunted place
router.put("/:id", function(req, res){
	HauntedPlace.findByIdAndUpdate(req.params.id, req.body.haunted_place, function(err, updated_haunted_place){
		if(err){
			console.log(err);
			consolelog("errror");
			res.redirect("/haunted_places");
		} else {
			res.redirect("/haunted_places/" + req.params.id);
		}
	});
});

// DELETE 
router.delete("/:id", function(req, res){
	HauntedPlace.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/haunted_places");
		} else {
			res.redirect("/haunted_places");
		}
	});
});

module.exports = router;