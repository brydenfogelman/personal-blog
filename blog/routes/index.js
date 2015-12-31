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

/* POST new post */

module.exports = router;
