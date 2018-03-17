var express = require("express");
var router = express.Router();

//Article and Comment models
var db = require("../models");


//scraping
var cheerio = require("cheerio");
var axios = require("axios");


//routes

//html route 

router.get("/", function(req, res){
	db.Article.find({})
	.populate("comments")
	.exec(function(error, doc) {
		if (error) {
			console.log(error);
		}
		else {
			console.log("all article with comments: "+ doc);
			res.render("index", {articles: doc});
		}
	});
})


// api routes

//get request

router.get("/scrape", function(req, res){
	axios.get("http://www.npr.org/sections/world/").then(function(response) {
		var results = [];
		var $ = cheerio.load(response.data);
		$('.has-image').each(function(i, element){
			var link = $(element).children(".item-info").children(".title").children().attr("href");
			var title = $(element).children(".item-info").children(".title").children().text();
			var text = $(element).children(".item-info").children(".teaser").children("a").text();
			//var image = $(element).children(".item-image").children(".imagewrap").children("a").children("img").attr("src");

			results.push({
				title: title,
				link: link,
				text: text
			})
		});
		db.Article.create(results)
		.then(function(dbArticle){
			console.log(dbArticle);
		})
		.catch(function(err){
			return res.json(err);
		})
	})
	res.json(results);
	res.redirect("/");
});




router.get("/articles", function(req, res) {
    // Grab every doc in the Articles array
    db.Article.find({})
    .then(function(dbArticle){
    	res.json(dbArticle);
    })
    .catch(function(err) {
    	res.json(err)
    });
  })



module.exports = router