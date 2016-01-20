var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); // for testing purposes
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/my_app';

var getPosts = function(db, callback) {
	var cursor = db.collection('blog_post').find();
	// retrieve the items for the database and check if they exist
	cursor.each( function(err, result) {
		assert.equal(err, null);
		if (result != null) {
			console.dir(result);
		} else {
			callback();
		}
	});
};
console.log(items)

MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	getPosts(db, function(result){
		db.close(); // on completing the getPosts function, will close db
	});
	
});