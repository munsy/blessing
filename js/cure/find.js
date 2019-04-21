angular.module('cure').controller("findController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Find = {};
	$scope.Find.Act = false;
	$scope.Find.Addon = false;

	if($location.path() == "/find/act") {
		$scope.Find.Act = true;
		$scope.Find.Addon = false;
	} else if($location.path() == "/find/addon") {
		$scope.Find.Act = false;
		$scope.Find.Addon = true;
	} else {
		$scope.Find.Act = false;
		$scope.Find.Addon = false;
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