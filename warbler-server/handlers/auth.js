const db = require("../models"); //opens ../models/index.js
const jwt = require("jsonwebtoken"); //marks users as logged in

exports.signin = function() {};

exports.signup = async function(req, res, next) {
	try {
		let user = await db.User.create(req.body);
		let { id, username, profileImageUrl } = user;
		let token = jwt.sign({
			id,
			username,
			profileImageUrl
		}, process.env.SECRET_KEY
		);
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		});
	} catch(err) {
		//if validation fails;
		if(err.code === 11000) { //11000 code if validation fails; 
			err.message = "Sorry, that username and/or email is taken";
		}
		return next({
			status: 400,
			message: err.message
		});
	}
};