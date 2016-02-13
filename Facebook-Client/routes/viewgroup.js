/**
 * New node file
 */

	
	var app = angular.module('myApp1', []);
angular.module('myApp1', []).controller('orderCtrl1', function($scope,$http,$interval){

	
	load_groups();

	
	function load_groups(){
		console.log("in angular group view");
	$http.get('http://localhost:3000/viewgroups').success(function(data){
		console.log(data);
			$scope.groups=data;
	});
	};

	});