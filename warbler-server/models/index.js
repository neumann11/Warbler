// Connecting to mongodb and settingup mongoose;

const mongoose = require("mongoose");
mongoose.set("debug", true); //show mongo queries in the terminal
mongoose.Promise = Promise; //specif. using ES15/17 Promises instead of using callbacks. Makes mongo methods return promises;
mongoose.connect("mongodb://localhost/warbler", { //connect to mongodb
	keepAlive: true,
	useMongoClient: true
});

module.exports.User = require("./user");
