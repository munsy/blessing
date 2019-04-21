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
	};

	const findAddon = function() {
		if($location.path() != "/find/addon") {
			return;
		}
		$scope.Find.Act = true;
		$scope.Find.Addon = false;
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
