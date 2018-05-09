//Middleware to use after 404 errHandler:
function errorHandler(error, request, response, next){
	//500: Route found but smt. wrong on server:
	return response.status(error.status || 500).json({
		error: {
			message: error.message || "Oops! Something went wrong."
		}
	});
}

module.exports = errorHandler;