/**
 * New node file
 */
	
	var app = angular.module('myApp2', []);
angular.module('myApp2', []).controller('orderCtrl2', function($scope,$http,$interval){

	
	load_members();

	
	function load_members(){
		console.log("in angular");
	$http.get('http://localhost:3000/selectgroups').success(function(data){
			$scope.members=data;
	});
	};

	});