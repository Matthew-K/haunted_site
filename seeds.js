var mongoose = require("mongoose");
var HauntedPlace = require("./models/haunted_place");
var Comment	= require("./models/comment");

var data = [
	{
		name: "Mansion filled with Ghosts",
		image: "https://farm7.staticflickr.com/6150/5977199445_ce6fe31d1b.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati minus, nostrum aliquid dicta modi, velit facilis atque amet nemo saepe ducimus numquam asperiores id molestias!"
	},
		{
		name: "Creepy Cemetary",
		image: "https://farm5.staticflickr.com/4151/4966250554_dde8b9169e.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati minus, nostrum aliquid dicta modi, velit facilis atque amet nemo saepe ducimus numquam asperiores id molestias!"
	},
	{
		name: "Forest of Doom",
		image: "https://images.unsplash.com/photo-1440074121584-e4acb8b6e954?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=2d00bff7772be4639fb34a199f1702f9",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati minus, nostrum aliquid dicta modi, velit facilis atque amet nemo saepe ducimus numquam asperiores id molestias!"
	},
	{
		name: "Scary Tunnel",
		image: "https://images.unsplash.com/reserve/Pu9MTKTuWOi7dDqIyZqA_urbex-ppc-062.jpg?crop=entropy&fit=crop&fm=jpg&h=650&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1375",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati minus, nostrum aliquid dicta modi, velit facilis atque amet nemo saepe ducimus numquam asperiores id molestias!"
	}
];

function seedDB(){
   //Remove all haunted places
   HauntedPlace.remove({}, function(err){
        if(err){
            console.log(err);
        }
         //add some haunted places
        data.forEach(function(seed){
            HauntedPlace.create(seed, function(err, haunted_place){
                if(err){
                    console.log(err);
                } else{
                    Comment.create(
                        {
                            text: "This is a spooky place.",
                            author: "Albert"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                haunted_place.comments.push(comment);
                                haunted_place.save();
                            }
                        });
                }
            });
        });
    }); 
}

module.exports = seedDB;