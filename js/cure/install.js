angular.module('cure').controller("installController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Install = {};
	$scope.Install.Act = false;
	$scope.Install.Addon = false;

	const clear = function() {
		$scope.Install.Act = false;
		$scope.Install.Addon = false;
	}

	const installAct = function() {
		if($location.path() != "/install/act") {
			return;
		}
		$scope.Install.Act = true;
		$scope.Install.Addon = false;
	};

	const installAddon = function() {
		if($location.path() != "/install/addon") {
			return;
		}
		$scope.Install.Act = true;
		$scope.Install.Addon = false;
	};

	$scope.ChangeView = function(view) {
		$location.path(view);
		clear();
		installAct();
		installAddon();
	};

	clear();
	installAct();
	installAddon();
}]);
