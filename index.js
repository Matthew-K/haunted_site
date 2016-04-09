var express 			= require("express"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	methodOverride		= require("method-override"),
	app 				= express(),
	seedDB				= require("./seeds"),
	HauntedPlace 		= require("./models/haunted_place"),
	Comment				= require("./models/comment");

var commentRoutes 	= require("./routes/comments"),
	hauntedRoutes 	= require("./routes/haunted_places"),
	indexRoutes		= require("./routes/index");

mongoose.connect("mongodb://localhost/haunted_website");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.use("/", indexRoutes);
app.use("/haunted_places", hauntedRoutes);
app.use("/haunted_places/:id/comments", commentRoutes);

//Seed the database
seedDB();

app.listen(3000, function () {
  console.log("Server started");
});

