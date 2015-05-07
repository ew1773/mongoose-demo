var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); // windows: bcrypt-nodejs

var schema = new mongoose.Schema({
	name: String,
	age: { type:  Number, min: 14, required: true },
	gender: { type: String, enum: ['male', 'female', 'undecided'] },
	active: { type: Boolean, default: true },
	password: { type: String, required: true },
	timestamp: { type: Date }
});

schema.pre('save', function(next){
	var user = this;
	if(!this.password) return next('Need a password!');
	this.timestamp = new Date();	
	bcrypt.genSalt(function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);
			else {
				user.password = hash;
				next();
			}
		});
	})
});

schema.methods.comparePw = function(password, cb){
	var user = this;
	bcrypt.compare(password, user.password, function(err, res){
		if(err) return cb(err, null);
		else cb(null, res);
	})
}

var User = mongoose.model('User', schema);

module.exports = User;
