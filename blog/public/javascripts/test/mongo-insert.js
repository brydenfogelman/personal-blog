/*
Code added to aid in the testing and adding of blog posts.
*/

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/my_app';

// Creates a new post in the database, document = db item
var insertDocument = function(db, callback) {
	db.collection('blog_post').insertOne( {
		"title" : "Test",
		"content": "test test test test test!"
	}, function(err, result) {
		assert.equal(err, null); 
		// checks if the result, throws an exception if there is an error
		console.log("Success");
		callback(result);
	});
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});