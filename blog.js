
var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
 , assert = require('assert');

// this is the backend of our blog project

// Connect to MongoDB
var url = 'mongodb://localhost:27017/blog';
var db = '';
// connect to the database


app.get('/', function (req,res) {
    var collection = db.collection('names');
    collection.find({}).toArray(function(err, docs) {
	assert.equal(err, null);
	var resp = ""
	for (var i = 0; i < docs.length; i++ ) {
	    resp = resp + docs[i].fullname + "<p>";
	    console.log('doc:  %s', docs[i].fullname);
	}
	res.send(resp);

    })
})

// this will send back an array of blog posts to display on the page
// it is meant to be called by the front end
app.get('/recent_posts', function(request, response) {
    var posts = db.collection('posts');
    posts.find().sort({'date':-1}).limit(10).toArray(function(err, entries) {
	response.send(entries);
    })
}
);


MongoClient.connect(url, function(err, dbconn) {
    assert.equal(null, err);
    console.log("Connected correctly to database server");
    db = dbconn;
});




var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s.%s', host, port)

})







