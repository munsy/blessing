angular.module('cure').controller("loadController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Loading = true;
	$scope.LoadSucceeded = false;

	ipc.on('find-act-reply', (event, data) => {
		$scope.Loading = false;
		$scope.LoadSucceeded = data;
		$scope.$apply();
	});

	ipc.send('find-act');

	$scope.ChangeView = function(view) {
		$scope.Loading = true;
		$scope.Loading = false;
		
		$location.path(view);
	};
}]);