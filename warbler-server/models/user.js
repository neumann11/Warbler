const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //passw hashing. turn plain passw into smt. that cannot be reversed;

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String
	}
});

//Add pre-save hooks->hash passw. before user saved to db:
userSchema.pre("save", async function(next){ //run func. before sav e
	try{
		if(!this.isModified("password")){
			return next();
		}
		//async action:
		let hashedPassword = await bcrypt.hash(this.password, 10); //10-salting, put addit. info into hash -> diff. hashes for same passw.
		this.Password = hashedPassword;
		return next(); //saving the doc. w. hashed passw. 
	} catch(err){
		return next(err); //-> goes to errHandler;
	}
});

//async passw. comparison func
//every doc. made from user model can compare another hashed passw. with their passw in db. To check if user put right passw.
userSchema.method.comparePassword = async function(candidatePassword, next){
	try {
		let isMatch = await bcrypt.compare(candidatePassword, this.password); //compares passw from the form to encr. passw. in db
		return isMatch; //returns true or false;
	} catch(err) {
		return next(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;