var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/haunted_website");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


var hauntedPlaceSchema = mongoose.Schema({
    name: String,
    image: String
});

var HauntedPlace = mongoose.model('haunted_place', hauntedPlaceSchema);


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
			res.render("haunted_places", {haunted_places: haunted_places});
		}
	});
});

// NEW
app.get("/haunted_places/new", function(req, res){
	res.render("new");
});

// CREATE
app.post("/haunted_places", function(req, res){
	//add new haunted place to haunted_places collection
	HauntedPlace.create(
     {name: req.body.name, image: req.body.image},
     function(err, haunted_place){
      if(err){
          console.log(err);
      } else {
      	//render haunted_places with new haunted place now on the page
		res.redirect("haunted_places");
      }
    });
});


app.listen(3000, function () {
  console.log("Server started");
});

