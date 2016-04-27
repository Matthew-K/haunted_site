var mongoose = require("mongoose");
	
var hauntedPlaceSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
    	{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "Comment"
    	}
    ]
});

var HauntedPlace = mongoose.model("haunted_place", hauntedPlaceSchema);

module.exports = HauntedPlace;