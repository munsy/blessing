angular.module('cure').controller("installController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
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