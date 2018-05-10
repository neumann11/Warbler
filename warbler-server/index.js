require("dotenv").config(); //require all env variables load them into process.env.__;
const express = require("express");
const app = express();
const cors = require("cors"); //makes possible to make requests from another domain
const bodyParser = require("body-parser"); //allows to get data from the form via POST req.
const errorHandler = require("./handlers/error");//generic middleware that returns formatted error object
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// all routes:
app.use("/api/auth", authRoutes); 
app.use("/api/users/:id/messages", messagesRoutes); 

// Error handling if non of the routes is reached:
app.use(function(req, res, next){
	let err = new Error("Not Found") //Error is a built-in const func. in JS
	err.status = 404; //404 not found
	next(err);
});

//handles any incoming error with errorHandler middleware
app.use(errorHandler);

app.listen(PORT, function(){
	console.log(`Server is starting on port ${PORT}`);
});