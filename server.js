//dependencies
var express = require("express");
var bodyParser = require("body-parser");
//var request = require("request");
//var cheerio = require("cheerio");

var mongoose = require("mongoose");
mongoose.Promise = Promise;

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Make public a static dir
app.use(express.static("public"));

//database configuration
mongoose.connect("mongodb://localhost/npr-project");
var db = mongoose.connection;

db.on("error", function(err){
	console.log("There is an error: ", err);
})

db.once("open", function(){
	console.log("Mongoose is successfully connected!");
})

//routes

var routes = require("./controllers/controller.js");
app.use("/", routes);

app.listen(port, function(){
	console.log("Port listening on: " + port);
})