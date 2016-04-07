var app = angular.module('app', ['ngRoute']);

app.constant('routes', [
			{ route: '/', templateUrl: 'html/default.html', controller: 'App1Main', controllerAs: 'ctrl' },
			{ route: '/login', templateUrl: 'html/login.html', controller: 'App1Login', controllerAs: 'ctrl' },
			{ route: '/1', templateUrl: 'html/page1.html', controller: 'App1Page1', controllerAs: 'ctrl', menu: 'Strona 1' },
			{ route: '/2', templateUrl: 'html/page2.html', controller: 'App1Page2', controllerAs: 'ctrl', menu: 'Strona 2' },
			{ route: '/3', templateUrl: 'html/page3.html', controller: 'App1Page3', controllerAs: 'ctrl', menu: 'Strona 3' }
]);

app.value('globals', {loggedUser: 'jarocki@wp.pl'});

app.factory('sessionInjector', [function($http) {
		return {
				request: function(config) {
					var self = this;
					if(!self.sessionToken) {
						var d = new Date().getTime();
						self.sessionToken = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
							var r = (d + Math.random()*16)%16 | 0;
							d = Math.floor(d/16);
							return (c=='x' ? r : (r&0x3|0x8)).toString(16);
						});
					}
					config.headers['X-Session-Token'] = self.sessionToken;
					return config;
				}
		};
}]);

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('sessionInjector');
}]);

app.config(['$routeProvider', 'routes', function($routeProvider, routes) {
	for(var i in routes) {
		$routeProvider.when(routes[i].route, routes[i]);
	}
	$routeProvider.otherwise({ redirectTo: '/' });
}]);

app.controller('App1Login', ['$http', '$location', 'globals',
	function($http, $location, globals) {
		
		globals.loggedUser = '';
		var self = this;

		self.login = function() {
			$http.post('/login/', self.loginData).then(
				function(response) {
					globals.loggedUser = self.loginData.name;
					$location.path('');
				},
				function(errResponse) {
					globals.loggedUser = '';
				}
			);
		};
	}
]);

app.controller('App1Main', ['$http', '$location', 'globals',
	function($http, $location, globals) {
		
		var self = this;
		self.globals = globals;
		
		if(!self.globals.loggedUser) {
			$location.path('/login');
			return;
		}

		self.msg = 'system ready';

		self.refresh = function() {
			$http.get('/user/').then(
				function(response) {
					self.users = response.data;
					if(self.users.length > 0) {
						self.selectedUserId = self.users[0]._id;
					} else {
						self.selectedUserId = 0;
					}
					self.displayUser();
				},
				function(errResponse) {
					self.users = [];
					self.selectedUserId = 0;
				}
			);
		};

		self.insert = function() {
			self.msg = 'Sending POST to REST server...';
			$http.post('/user/', self.user).then(
				function(response) {
					self.msg = 'User ' + self.user.firstName + ' ' + self.user.lastName + ' added';
					self.refresh();
				},
				function(errResponse) {
					self.msg = 'Error on adding user';
				}
			);
		};
		
		self.delete = function() {
			self.msg = 'Sending DELETE to REST server...';
			$http.delete('/user/' + self.selectedUserId).then(
				function(response) {
					self.msg = 'User ' + self.user.firstName + ' ' + self.user.lastName + ' deleted';
					self.refresh();
				},
				function(errResponse) {
					self.msg = 'Error on deleting user';
				}
			);
		};
		
		self.whoami = function() {
			$http.get("/login/").then(
				function(response) {
					return response;
				},
				function(errResponse) {
					return null;
				}
			)
		}
		
		self.displayUser = function() {
			$http.get('/user/' + self.selectedUserId).then(
				function(response) {
					var userLocal = response.data;
					self.msg = userLocal._id + ' ' + userLocal.mail + ' ' + userLocal.firstName + ' ' + userLocal.lastName + ' ' + userLocal.role;
				},
				function(errResponse) {
					self.msg = 'Error getting data about user';
				}
			);
		};
		
		self.refresh();
	}
]);

app.controller('App1Menu', ['$location', 'globals', 'routes',
	function($location, globals, routes) {
		var self = this;
		self.globals = globals;

		if(!self.globals.loggedUser) {
			$location.path('/login');
			return;
		}

		self.menu = [];
		for(var i in routes) {
			if(routes[i].menu) {
				self.menu.push({ route: routes[i].route, title: routes[i].menu });
			}
		}
		
		self.navClass = function(page) {
			return page === $location.path() ? 'active' : '';
		};
	}
]);

app.controller('App1Page1', ['$location', '$http', 'globals',
	function($location, $http, globals) {
		var self = this;
		self.limit = 10;
		self.skip = 0;
		self.nElements = 0;
		self.searchText = '';
		self.students = [];
		self.student = { _id: 0 };
		
		if(!globals.loggedUser) {
			$location.path('/login');
			return;
		}

		self.refresh = function() {
			$http.get('/students/?limit=' + self.limit + '&skip=' + self.skip + '&search=' + self.searchText).then(
				function(response) {
					self.nElements = response.headers('X-Records');
					self.students = response.data;
				},
				function(errResponse) {
					self.students = [];
				}
			);
		};
		
		self.backward = function() {
			self.skip -= self.limit;
			self.refresh();
		};
		
		self.forward = function() {
			self.skip += self.limit;
			self.refresh();
		};
		
		self.show = function(nr) {
			$http.get('/student/' + nr).then(
				function(response) {
					self.student = response.data;
					$("#showModal").modal();			
				},
				function(errResponse) {
				}
			);
		}
		
		self.update = function() {
			$http.put('/student/', self.student).then(
				function(response) {
					self.refresh();
				},
				function(errResponse) {}
			);
			$('#showModal').modal('hide');
		}
		
		self.refresh();
	}
]);

app.controller('App1Page2', ['$location', 'globals',
	function($location, globals) {
		var self = this;

		if(!globals.loggedUser) {
			$location.path('/login');
			return;
		}

	}
]);

app.controller('App1Page3', ['$location', 'globals',
	function($location, globals) {
		var self = this;
	
		if(!globals.loggedUser) {
			$location.path('/login');
			return;
		}

	}
]);