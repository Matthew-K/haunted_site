var express 			= require("express"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	methodOverride		= require("method-override"),
	app 				= express(),
	HauntedPlace 		= require("./models/haunted_place"),
	seedDB				= require("./seeds"),
	Comment				= require("./models/comment");

seedDB();
mongoose.connect("mongodb://localhost/haunted_website");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


// HOME PAGE
app.get("/", function(req, res) {
  res.render("home");
});

// INDEX
app.get("/haunted_places", function(req, res){
	HauntedPlace.find({}, function(err, haunted_places){
		if(err){
			console.log(err);
		} else {
			res.render("haunted_places/index", {haunted_places: haunted_places});
		}
	});
});

// NEW
app.get("/haunted_places/new", function(req, res){
	res.render("haunted_places/new");
});

// CREATE
app.post("/haunted_places", function(req, res){
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

// SHOW
app.get("/haunted_places/:id", function(req, res){
	HauntedPlace.findById(req.params.id).populate("comments").exec(function (err, haunted_place) {
		if(err){
			console.log(err);
		} else {
			res.render("haunted_places/show", {haunted_place: haunted_place});
		}
	});
});

// EDIT
app.get("/haunted_places/:id/edit", function(req, res){
	HauntedPlace.findById(req.params.id, function(err, haunted_place){
		if(err){
			console.log(err);
		} else {
			res.render("haunted_places/edit", {haunted_place: haunted_place});
		}
	});
});

// UPDATE
app.put("/haunted_places/:id", function(req, res){
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
app.delete("/haunted_places/:id", function(req, res){
	HauntedPlace.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/haunted_places");
		} else {
			res.redirect("/haunted_places");
		}
	});
});

// ======================
//     COMMENT ROUTES    
// ======================

// NEW
app.get("/haunted_places/:id/comments/new", function(req, res){
	HauntedPlace.findById(req.params.id, function(err, haunted_place){
		if(err){
			console.log(err);
		} else{
			res.render("comments/new", {haunted_place: haunted_place});
		}
	});
});

// CREATE
app.post("/haunted_places/:id/comments", function(req, res){
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



app.listen(3000, function () {
  console.log("Server started");
});

