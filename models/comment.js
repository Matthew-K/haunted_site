var mongoose = require("mongoose");
	
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

var Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;