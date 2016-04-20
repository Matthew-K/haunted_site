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
        data.forEach(function(seed){
            HauntedPlace.create(seed, function(err, haunted_place){
                if(err){
                    console.log(err);
                } else{
                    Comment.remove({}, function(err){
                        if(err){
                            console.log(err);
                        } else {
                            for (var i = 0; i < 5; i++){
                                Comment.create(
                                    {
                                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pharetra pharetra nunc, ac convallis mi faucibus ut. Ut varius sodales tellus at bibendum. Suspendisse et fermentum enim. Nullam a nisl sit amet massa tristique elementum quis nec urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc id dignissim augue. Mauris a lorem nec arcu vestibulum ultrices. Donec consectetur nunc quis ultrices sollicitudin. Pellentesque iaculis diam quis tellus ullamcorper tincidunt. Aenean nec lacus dui. Suspendisse et massa neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris ac luctus sapien, a ultricies leo. Duis interdum vehicula felis elementum tincidunt. Pellentesque a eros ac leo posuere cursus et vitae sem. Nulla ac elementum eros. Sed malesuada massa dictum, dignissim dui non",
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
                        }   
                    });
                }
            });
        });
    }); 
}

module.exports = seedDB;