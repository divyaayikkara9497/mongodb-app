var mongoose = require("mongoose");

//schema class
var Schema = mongoose.Schema;

//comment schema
var commentSchema = new Schema({
	author: {
		type: String
	},
	message: {
		type: String
	}
});

//creating comment model using mongoose's model method
var Comment = mongoose.model("Comment", commentSchema);

//export the comment model
module.exports = Comment;