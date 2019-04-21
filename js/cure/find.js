angular.module('cure').controller("findController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Find = {};
	$scope.Find.Act = false;
	$scope.Find.Addon = false;

	const clear = function() {
		$scope.Find.Act = false;
		$scope.Find.Addon = false;
	}

	const findAct = function() {
		if($location.path() != "/find/act") {
			return;
		}

		$scope.Find.Act = true;
		$scope.Find.Addon = false;

		$http.get("http://localhost:8080/find/act")
		.then(function(response) {
			$scope.Find.Data = response.data;
		}, function(response) {
			$scope.Find.Data = response.data;
		});
	};

	const findAddon = function() {
		if($location.path() != "/find/addon") {
			return;
		}
		
		$scope.Find.Act = true;
		$scope.Find.Addon = false;

		$http.get("http://localhost:8080/find/addon")
		.then(function(response) {
			$scope.Find.Data = response.data;
		}, function(response) {
			$scope.Find.Data = response.data;
		});
	};

	$scope.ChangeView = function(view) {
		$location.path(view);
		clear();
		findAct();
		findAddon();
	};

	clear();
	findAct();
	findAddon();
}]);
