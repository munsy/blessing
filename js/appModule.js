var app = angular.module('cure', ['ngRoute', 'ngCookies']);

app.controller("cureController", ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	$scope.Service.Loading = true;

	$http.get("http://www.google.com")
	.then(function(response) {
		$scope.Service.Loading = false;
		$scope.Service.LoadSuccesss = true;
	}, function(response) {
		$scope.Service.Loading = false;
		$scope.Service.LoadSuccesss = false;
	})

	$scope.ChangeView = function(view) {
	 	$location.path(view);
	};
}]);

app.directive('cureHeader', function() {
	return{
		templateUrl: './html/header.html',
	};
})
.directive('cureFooter', function() {
	return {
		templateUrl: './html/footer.html',
	};
})
.directive('cureContent', function() {
	return {
		templateUrl: function(elem, attr) {
			return "./html/" + attr.ptPage + ".html";
		}
	};
});
