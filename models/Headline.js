
var mongoose = require("mongoose");

//schema class
var Schema = mongoose.Schema;

//artilce schema
var articleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

//creating article model using mongoose's model method
var Article = mongoose.model("Article", articleSchema);

//export the article model
module.exports = Article;