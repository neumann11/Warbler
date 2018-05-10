require("dotenv").load();
const jwt = require("jsonwebtoken"); //decode tokens that are passed;

// Authentication - make sure user is logged in;
exports.loginRequired = function(req, res, next){
	try {
		const token = req.headers.authorization.split(" ")[1]; // Format: Bearer <token> -> so we split by space
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){ //decoded - payload
			if(decoded){
				next();
			} else {
				return next({
					status: 401, //Unauthorized
					message: "Please log in first"
				});
			}
		});
	} catch (err) {
		return next({
			status: 401, 
			message: "Please log in first"
		});
	}
};

// Authorization - make sure we get correct user; Users can't change other users info;
exports.ensureCorrectUser = function(req, res, next){
	try {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
			if(decoded && decoded.id === req.params.id){ // /api/users/:id/messages
				return next();
			} else {
				return next({
					status: 401,//Unauthorized
					message: "Unauthorized"
				});
			}
		});
	} catch (err) {
		return next({
			status: 401,
			message: "Unauthorized"
		});
	}
};