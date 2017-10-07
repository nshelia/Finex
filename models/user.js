const mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema,
userSchema = new Schema({
	firstname: {type:String,required:true},
	lastname: {type:String,required:true},
	username: {type:String,required:true,unique:true,trim:true},
	password: {type:String,required:true},
	firsttime: {type:Boolean,required:true,default: true},
	created_at: {type:String,required:true}
});
userSchema.statics.authenticate = (username,password,callback) => {
	User.findOne({username})
		.exec((err,user) => {
			if (err) {
				return next(err)
			} else if(!user) {
				var err = "User with that information doesn't exists."
				return callback(err);
			}
			bcrypt.compare(password,user.password,(error,result) => {
				if (result === false) {
					var err = "Sorry, your password was incorrect. Please double-check your password.";
					return callback(err);
				}
				callback(null,user);
			})
		})
}

userSchema.pre('save',function(next) {
	const user = this;
	bcrypt.hash(user.password,10,(err,hash) => {
		if (err) {
			return next(err)
		}
		user.password = hash;
		next();
	})
})

const User = mongoose.model('User',userSchema);

module.exports = User;
