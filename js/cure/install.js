angular.module('cure').controller("installController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Install = {};
	$scope.Install.Error = false;
	$scope.Install.Act = false;
	$scope.Install.Addon = false;
	$scope.Install.Installing = false;
	$scope.Install.ChooseLocation = false;
	$scope.Install.ActInstallLocation = "";

	$scope.Install.Progress = {};
	$scope.Install.Progress.CurrentFile = "";
	$scope.Install.Progress.Current = 0;
	$scope.Install.Progress.Total = 0;

	const clear = function() {
		$scope.Install.Act = false;
		$scope.Install.Addon = false;
		$scope.Install.Installing = false;
		$scope.Install.Complete = false;
	}

	const reset = function() {
		$scope.Install.Progress.CurrentFile = "";
		$scope.Install.Progress.Current = 0;
		$scope.Install.Progress.Total = 0;
	}

	const installActView = function() {
		if($location.path() != "/install/act") {
			return;
		}
		$scope.Install.Act = true;
		$scope.Install.Addon = false;
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
		installActView();
		installAddonView();
	};

	$scope.Retry = function(view) {
		$scope.Install.Error = false;
		$location.path(view)
		clear();
		installActView();
		installAddonView();
	}

	$scope.StartInstall = function(progName) {
		if($location.path() != "/install/" + progName) {
			console.log("return 1");
			return;
		}
		if($scope.Install.Installing) {
			console.log("return 2");
			return;
		}

		$scope.Install.Complete = false;
		$scope.Install.Act = false;
		$scope.Install.Addon = false;

		reset();

		$http.get("http://localhost:8080/install/" + progName + "/start")
		.then(function(response) {
			$scope.Install.Installing = response.data.Installing;
			$scope.Install.Progress.Current = response.data.Current;
			$scope.Install.Progress.Total = response.data.Total;
			$scope.Install.Progress.CurrentFile = response.data.CurrentFile;
		}, function(response) {
			$scope.Install.Data = response.data;
		});
	}

	$scope.CheckInstall = function(progName) {
		if(!$scope.Install.Installing) {
			return false;
		}

		$http.get("http://localhost:8080/install/" + progName + "/progress")
		.then(function(response) {
			$scope.Install.Installing = response.data.Installing;
			$scope.Install.Progress.Current = response.data.Current;
			$scope.Install.Progress.Total = response.data.Total;
			$scope.Install.Progress.CurrentFile = response.data.CurrentFile;
		}, function(response) {
			$scope.Install.Data = response.data;
			$scope.Install.Installing = false;
		});

		$scope.Install.Complete = true;
	}

	clear();
	installActView();
	installAddonView();
}]);
