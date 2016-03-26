var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

// HOME PAGE
app.get("/", function(req, res) {
  res.render("home");
});

var haunted_places = [
	{name: "Spooky Forest", image: "https://farm9.staticflickr.com/8638/16371527478_f7d0e1ba64.jpg"},
	{name: "Dead Man's Tunnel", image: "https://images.unsplash.com/reserve/Pu9MTKTuWOi7dDqIyZqA_urbex-ppc-062.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=b7fe9932e9cc5b5b6bbe2e25ef698211"},
	{name: "Creepy Cemetary", image: "https://farm4.staticflickr.com/3327/3213607772_320d7f63dc.jpg"}
];

// INDEX
app.get("/haunted_places", function(req, res){
	res.render("haunted_places", {haunted_places: haunted_places});
});

// NEW
app.get("/haunted_places/new", function(req, res){
	res.render("new");
});

// CREATE
app.post("/haunted_places", function(req, res){
	//add new haunted place to haunted_places array
	haunted_places.push(req.body);

	//render haunted_places with new haunted place now on the page
	res.redirect("haunted_places");
});


app.listen(3000, function () {
  console.log("Server started");
});

