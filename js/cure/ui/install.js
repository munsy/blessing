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

	$scope.Count = 0;

	ipc.on('install-status-reply', (event, data) => {
		if(data) {
			console.log('reply:');
			console.log(data);
			$scope.Install.Progress.Current = data.Current;
			$scope.Install.Progress.Total = data.Total;
			$scope.Install.Progress.CurrentFile = data.CurrentFile;
		}
		$scope.Install.Installing = data.Installing;
		$scope.$apply();
	});

	const clear = function() {
		$scope.Install.Act = false;
		$scope.Install.Addon = false;
		$scope.Install.Installing = false;
		$scope.Install.Complete = false;
	};

	const reset = function() {
		$scope.Install.Progress.CurrentFile = "";
		$scope.Install.Progress.Current = 0;
		$scope.Install.Progress.Total = 0;
	};

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
	};

	$scope.StartInstall = function(progName) {
		if($location.path() != "/install/" + progName) {
			console.log('bad path');
			return;
		}
		if($scope.Install.Installing) {
			console.log('already installing');
			return;
		}

		$scope.Install.Complete = false;
		$scope.Install.Act = false;
		$scope.Install.Addon = false;

		reset();

		console.log('starting');
		$scope.Install.Installing = true;
		ipc.send('install-' + progName, 'start');
		console.log('started');
	};

	clear();
	installActView();
	installAddonView();
}]);
