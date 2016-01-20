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

// GET projects
router.get('/projects', function(req, res, next) {
	res.render('projects');
});

// GET resume
router.get('/resume', function(req, res, next){
	var path = require('path');
	res.sendFile(path.resolve('public/files/resume-jan19.pdf'));
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

/* POST send email */
// TODO add oauth to send emails
router.post('/contact', function(req, res, next){
	var nodemailer = require('nodemailer');
	var email = req.body.email;
	var name = req.body.name;
	var message = req.body.message;

	// create reusable transporter object using the default SMTP transport
	// THIS PART=
	var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '<' + email +'>', // sender address, name + ' ' + 
	    to: 'bryden1995@gmail.com', // list of receivers
	    subject: 'Message to Bryden Fogelman', // Subject line
	    text: message
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	}, function(err, doc) {
		if(err) {
			// on error
			res.send('Sending email failed');
		} else {
			// on success
			res.redirect('/');
		}
	});
});

module.exports = router;
