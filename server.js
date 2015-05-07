/*
 * Modules
 */

var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

/*
 * local imports
 */

var User = require('./User.js');


/*
 * Config
 */

var app = express();
var port = 9001;
var mongoUri = 'localhost/mongoose-project';

/*
 * Middleware
 */

app.use(cors());
app.use(bodyParser.json());

/*
 * Routes
 */

app.post('/api/users', function(req, res){
	User.create(req.body, function(err, response){
		console.log(err);
		if(err) res.status(500).json(err);
		else res.json(response);
	});
});

app.post('/api/users/pw', function(req, res){
	User.findOne(req.query, function(err, response){
		response.comparePw(req.body.password, function(err, results){
			if(err) return res.status(500).json({
				results: err
			});
			else return res.json({
				results: results
			});
		})
	});
});

/*
app.get('/api/users', function(req, res){
});
*/

/*
var pageNum = req.query.pageNum
var limit = req.query.limit
*/

/* Chaining and pagination 
var pageNum = 1;
var limit = 3;

User
	.find()
	.where('age').gt(20)
	.sort('age')
	.skip(limit * (pageNum - 1)).limit(limit)
	.select('name age')
	.exec(function(err, res){
		console.log(err, res);
	});
*/

/*
User.find({ age: { $gt: 20 } }, function(err, response){
	
});
*/



/*
 * Initialize
 */

mongoose.connect(mongoUri, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Mongoose listening here: ', mongoUri);
		app.listen(port, function(){
			console.log('Now listening on port: ', port);
		});
	}
});
