var app = angular.module('cure', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "./html/load.html"
	})
	.when("/home", {
		templateUrl: "./html/main.html"
	})
	.when("/load", {
		templateUrl: "./html/load.html"
	});

	$locationProvider.html5Mode(true);
});

app.controller("cureController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Service.Loading = true;

	$http.get("http://www.google.com")
	.then(function(response) {
		$scope.Service.Loading = false;
		$scope.Service.LoadSuccesss = true;
	}, function(response) {
		$scope.Service.Loading = false;
		$scope.Service.LoadSuccesss = false;
	})

	$scope.ChangeView = function(view) {
	 	$location.path(view);
	};

	$scope.LoadStats = function() {
		$http.get("/api/v1/stats/disk/storage")
		.then(function(response) {
			for(var i = 0; i < response.data.members.length; i++) {
				response.data.members[i].character.class = ItoClasses(response.data.members[i].character.class);
				response.data.members[i].character.race = ItoRaces(response.data.members[i].character.race);
				response.data.members[i].rank = ItoRanks(response.data.members[i].rank);
			}
			$scope.Guild = response.data;
			console.log($scope.Guild);
		}, function (response) {
			console.log(response.data);
		});
	};
}]);

app.directive('cureHeader', function() {
	return{
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
			return "./html/" + attr.ptPage + ".html";
		}
	};
});
