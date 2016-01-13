var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db; // this pulls the db from app.js
	var collection = db.get('blog'); // get the db
	// Gets all the items from the database and then sets the view
	// the database items are passed to the view here
	collection.find({},{},function(err, docs){
		console.log(docs);
		res.render('index', {
			"posts" : docs,
			// "title" : 'Bryden Fogelman' 
		});
	});
});

/* GET new post */
router.get('/new_post', function(req, res, next) {
	res.render('new_post');
});

/* POST to add a new post */
router.post('/new_post', function(req, res, next) {
	var db = req.db;
	var title = req.body.title;
	var user = req.body.user;
	var abstract = req.body.abstract;
	var content = req.body.content;

	// Insert items into the database
	var collection = db.get('blog');

	collection.insert({
		"title" : title,
		"user" : user,
		"abstract" : abstract,
		"content" : content
	}, function(err, doc) {
		if(err) {
			// on error
			res.send('Making a new post failed.');
		} else {
			// on success
			res.redirect('/');
		}
	});
});

module.exports = router;
