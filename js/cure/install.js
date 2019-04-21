angular.module('cure').controller("installController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Install = {};
	$scope.Install.Act = false;
	$scope.Install.Addon = false;
	$scope.Install.Installing = false;
	$scope.Install.Progress = {};
	$scope.Install.Progress.Current = 0;
	$scope.Install.Progress.Total = 0;

	const clear = function() {
		$scope.Install.Progress.Current = 0;
		$scope.Install.Progress.Total = 0;
		$scope.Install.Act = false;
		$scope.Install.Addon = false;
		$scope.Install.Installing = false;
	}

	const installAct = function() {
		if($location.path() != "/install/act") {
			return;
		}
		$scope.Install.Act = true;
		$scope.Install.Addon = false;
		$scope.Install.Installing = false;
	};

	const installAddon = function() {
		if($location.path() != "/install/addon") {
			return;
		}
		$scope.Install.Act = true;
		$scope.Install.Addon = false;
		$scope.Install.Installing = false;
	};

	$scope.ChangeView = function(view) {
		$location.path(view);
		clear();
		installAct();
		installAddon();
	};

	$scope.InstallAct = function() {

	}

	clear();
	installAct();
	installAddon();
}]);
