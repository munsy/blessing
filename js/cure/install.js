angular.module('cure').controller("installController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Install = {};
	$scope.Install.Error = false;
	$scope.Install.Act = false;
	$scope.Install.Addon = false;
	$scope.Install.Installing = false;
	$scope.Install.ChooseLocation = false;

	$scope.Install.Progress = {};
	$scope.Install.Progress.CurrentFile = "";
	$scope.Install.Progress.Current = 0;
	$scope.Install.Progress.Total = 0;

	const clear = function() {
		$scope.Install.Progress.CurrentFile = "";
		$scope.Install.Progress.Current = 0;
		$scope.Install.Progress.Total = 0;
		$scope.Install.Act = false;
		$scope.Install.Addon = false;
		$scope.Install.Installing = false;
		$scope.Install.ChooseLocation = false;
	}

	const installAct = function() {
		if($location.path() != "/install/act") {
			return;
		}
					
		$scope.Install.Installing = true;

		while($scope.Install.Installing) {		
			$http.get("http://localhost:8080/install/act/progress")
			.then(function(response) {
				$scope.Install.Progress.Current = response.data.Current;
				$scope.Install.Progress.Total = response.data.Total;
				if($scope.Install.Progress.Total == 100) {
					$scope.Install.Installing = false;
				}
			}, function(response) {
				$scope.Install.Data = response.data;
				$scope.Install.Installing = false;
			});
		}
	}

	const installActView = function() {
		if($location.path() != "/install/act") {
			return;
		}
		$scope.Install.Act = true;
		$scope.Install.Addon = false;
		$scope.Install.Installing = false;
		$scope.Install.ChooseLocation = true;
	};

	const installAddonView = function() {
		if($location.path() != "/install/addon") {
			return;
		}
		$scope.Install.Act = false;
		$scope.Install.Addon = true;
		$scope.Install.Installing = false;
		$scope.Install.ChooseLocation = true;
	};

	$scope.ChangeView = function(view) {
		$location.path(view);
		clear();
		installAct();
		installAddon();
	};

	$scope.Retry = function(view) {
		$scope.Install.Error = false;
		$location.path(view)
		clear();
		installAct();
		installAddon();
	}

	$scope.InstallAct = function() {
		getProgress();
	}

	clear();
	installActView();
	installAddonView();
}]);
