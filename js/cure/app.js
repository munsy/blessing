var app = angular.module('cure', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "html/load.html"
        })
        .when("/retry", {
            templateUrl: "./html/load.html"
        })
        .when("/find/act", {
            templateUrl: "./html/find/find.html"
        })
        .when("/find/act", {
            templateUrl: "./html/find/find.html"
        })
        .when("/install/act", {
        	templateUrl: "./html/install/install.html"
        })
        .when("/install/act", {
            templateUrl: "./html/install/install.html"
        });

        $routeProvider.otherwise({
		    redirectTo: '/'
		});

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
});

app.controller("cureController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.ChangeView = function(view) {
	 	$location.path(view);
	};
}]);

app.controller("findController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Find = {};
	$scope.Find.Act = false;
	$scope.Find.Addon = false;

	if($location.path() == "/find/act") {
		$scope.Find.Act = true;
		$scope.Find.Addon = false;
	} else if($location.path() == "/find/addon") {
		$scope.Find.Act = false;
		$scope.Find.Addon = true;
	}

	$scope.ChangeView = function(view) {
		if(view == "find/act") {
			$scope.Find.Act = true;
			$scope.Find.Addon = false;
		} else if(view == "find/addon") {
			$scope.Find.Act = false;
			$scope.Find.Addon = true;
		} else {
			$scope.Find.Act = false;
			$scope.Find.Addon = false;
		}

	 	$location.path(view);
	};
}]);

app.controller("installController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Install = {};
	$scope.Install.Act = false;
	$scope.Install.Addon = false;

	if($location.path() == "/install/act") {
		$scope.Install.Act = true;
		$scope.Install.Addon = false;
	} else if($location.path() == "/install/addon") {
		$scope.Install.Act = false;
		$scope.Install.Addon = true;
	} else {
		$scope.Install.Act = false;
		$scope.Install.Addon = false;
	}

	$scope.ChangeView = function(view) {
		if(view == "install/act") {
			$scope.Install.Act = true;
			$scope.Install.Addon = false;
		} else if(view == "install/addon") {
			$scope.Install.Act = false;
			$scope.Install.Addon = true;
		}

	 	$location.path(view);
	};
}]);

app.controller("loadController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Service = {};
	$scope.Service.Response = {}
	$scope.Service.Loading = true;
	$scope.Service.LoadSucceeded = false;

	$http.get("http://localhost:8080/search")
	.then(function(response) {
		$scope.Service.Loading = false;
		$scope.Service.LoadSucceeded = true;
		$scope.Service.Response = response.data.length;
	}, function(response) {
		$scope.Service.Loading = false;
		$scope.Service.LoadSucceeded = false; 
	});

	$scope.ChangeView = function(view) {
		$scope.Service.Loading = true;
		$scope.Service.LoadSucceeded = false;

		if(view == "install") {
			http.get("http://localhost:8080/install")
			.then(function(response) {
				$scope.Service.Loading = false;
				$scope.Service.LoadSucceeded = true;
				$scope.Service.Response = response.data;
			}, function(response) {
				$scope.Service.Loading = false;
				$scope.Service.LoadSucceeded = false; 
			});
		}

		$scope.Service.Loading = false;
		
		$location.path(view);
	};
}]);

app.directive('cureHeader', function() {
	return {
		templateUrl: './html/header.html',
	};
})
.directive('cureFooter', function() {
	return {
		templateUrl: './html/footer.html',
	};
})
.directive('cureContent', function() {
	return {
		templateUrl: function(elem, attr) {
			return "./html/" + attr.appPage + ".html";
		}
	};
});
