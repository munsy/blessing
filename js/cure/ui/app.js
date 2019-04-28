const ipc = require('electron').ipcRenderer;

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

app.controller("cureController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.ChangeView = function(view) {
	 	$location.path(view);
	};
}]);
