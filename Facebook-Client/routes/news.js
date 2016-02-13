/**
 * New node file
 */
var app = angular.module('myApp', []);
angular.module('myApp', []).controller('orderCtrl', function($scope,$http,$interval){
$scope.interests=[];
$scope.interes=[];
	
		load_news();
	$interval(function(){
	load_news();
	
	},30000);
	
	load_about();	
	load_interest();
	$interval(function(){
		load_interest();
		},8000);
	
	

	
	function load_about(){
		console.log("in angular");
	$http.get('http://localhost:3000/success').success(function(data){
		console.log("and");	
		console.log(data);
			$scope.abouts=data;
			
			
	});
	};
	function load_interest(){
		console.log("in angular");
	$http.get('http://localhost:3000/interest').success(function(data){
		console.log("and");	
		console.log(data);

			$scope.interests=data;
			
			
	});
	};
	function load_news(){
		console.log("in angular");
	$http.get('http://localhost:3000/news').success(function(data){
		console.log("anddddddddddddddddddddddddd");	
		console.log(data);
			$scope.news=data;
			
			
	});
	};
	});