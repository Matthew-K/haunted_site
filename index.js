var express 			= require("express"),
	bodyParser 			= require("body-parser"),
	mongoose 			= require("mongoose"),
	methodOverride		= require("method-override"),
	passport			= require("passport"),
	LocalStrategy		= require("passport-local"),
	flash				= require("connect-flash"),
	app 				= express(),
	seedDB				= require("./seeds"),
	HauntedPlace 		= require("./models/haunted_place"),
	Comment				= require("./models/comment"),
	User				= require("./models/user");

var commentRoutes 		= require("./routes/comments"),
	hauntedRoutes 		= require("./routes/haunted_places"),
	indexRoutes			= require("./routes/index");

mongoose.connect("mongodb://localhost/haunted_website");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());

// Passport config
app.use(require("express-session")({
	secret: "Don't tell anyone this a secret. Blah blah blah",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/haunted_places", hauntedRoutes);
app.use("/haunted_places/:id/comments", commentRoutes);

//Seed the database
// seedDB();

app.listen(3000, function () {
  console.log("Server started");
});

