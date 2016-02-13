/**
 * New node file
 */
var app = angular.module('myApp1', []);
angular.module('myApp1', []).controller('orderCtrl1', function($scope,$http,$interval){

	console.log("i am right here");
		load_news();
	$interval(function(){
	load_news();
	
	},300000);
	
	
	function load_news(){
		console.log("in angular");
	$http.get('http://localhost:3000/interest').success(function(data){
		console.log("and");	
		console.log(data);
			$scope.interests=data;
			
			
	});
	};

	});