require("dotenv").config(); //require all env variables;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// all routes:
app.use("/api/auth", authRoutes);

// Error handling if non of the routes is reached:
app.use(function(req, res, next){
	let err = new Error("Not Found") //Error is a built-in const func. in JS
	err.status = 404;
	next(err);
});

//takes incoming middleware w. error and prints out an arror
app.use(errorHandler);

app.listen(PORT, function(){
	console.log(`Server is starting on port ${PORT}`);
});