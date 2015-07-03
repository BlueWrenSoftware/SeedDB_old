require('module')
// TODO: async
// TODO: get favicon.ico

var Router = function() {
	this.routes = {};
}	

Router.prototype.getRoute = function(endpoint, action) {
	if (!this.routes[endpoint] || !this.routes[endpoint][action]) {
		console.log('unexpected: ' + action + ': ' + endpoint); //TODO: remove
		// TODO: Return 404
		return function () {return ''};
	}
	return this.routes[endpoint][action];	
}

Router.prototype.defineRoute = function(endpoint, action, method) {
	// TODO: check this route doesn't already exist.
	// TODO: make action a formal object (?)
	// TODO: check action is valid
	this.routes[endpoint] = {};
	this.routes[endpoint][action] = method;
}

module.exports = new Router();
	
