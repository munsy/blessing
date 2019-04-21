angular.module('cure').controller("loadController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
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