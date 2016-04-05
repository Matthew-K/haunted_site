var mongoose = require("mongoose");
	
var hauntedPlaceSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var HauntedPlace = mongoose.model('haunted_place', hauntedPlaceSchema);

module.exports = HauntedPlace;