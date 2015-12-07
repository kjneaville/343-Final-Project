'use strict';

angular.module("PikeApp", ['ngSanitize', 'ui.router', 'ui.bootstrap']) //ngSanitize for HTML displaying
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', { //For homepage
		url: '/',
		templateUrl: 'partials/mainpartial.html',
		controller: 'MainCtrl'
	})
	.state('house', { 			   //For orders page
		url: '/House', 
		templateUrl: 'partials/house.html',
		controller: 'HouseCtrl'
	})
	.state('slag', {			   //For shopping cart
		url: '/SLAG',
		templateUrl: 'partials/slag.html',
		controller: 'SlagCtrl'
	})
	.state('beta', {			   //For details of each bean
			url: '/Beta-Beta',
			templateUrl: 'partials/beta.html',
			controller: 'BetaCtrl'
	})
	.state('events', {			   //For details of each bean
			url: '/Events',
			templateUrl: 'partials/events.html',
			controller: 'EventsCtrl'
	})
	.state('history', {			   //For details of each bean
			url: '/History',
			templateUrl: 'partials/history.html',
			controller: 'HistCtrl'
	})
	.state('members', {			   //For details of each bean
			url: '/Members',
			templateUrl: 'partials/members.html',
			controller: 'MembersCtrl'
	})
	.state('recruit', {			   //For details of each bean
			url: '/Recruitment',
			templateUrl: 'partials/recruit.html',
			controller: 'RecruitCtrl'
	})
	.state('contact', {			   //For details of each bean
			url: '/Contact_Us',
			templateUrl: 'partials/contact.html',
			controller: 'ContactCtrl'
	})
    .state('login', {              //For details of each bean
            url: '/Login',
            templateUrl: 'partials/memberlogin.html',
            controller: 'LoginCtrl'
    })
	$urlRouterProvider.otherwise('/'); //All invalid addresses route to homepage
})

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	var toggle = false;
	document.getElementById("nav").style.display = "none";

	$scope.hamburger = function() {
		if(toggle && $(window).width() <= 768) {
			toggle = false;
			document.getElementById("nav").style.display = "none";
		} else if(!toggle && $(window).width() <= 768) {
			toggle = true;
			document.getElementById("nav").style.display = "block";
		}
	}

}])

.controller('HouseCtrl', ['$scope', '$http', function($scope, $http) {

}])

.controller('SlagCtrl', ['$scope', '$http', function($scope, $http) {

}])

.controller('BetaCtrl', ['$scope', '$http', function($scope, $http) {
	
}])

.controller('HistCtrl', ['$scope', '$http', function($scope, $http) {
	
}])

.controller('MembersCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('data/members.json').then(function(response) {
 		$scope.members = response.data;
 	});
}])

.controller('RecruitCtrl', ['$scope', '$http', function($scope, $http){
	$scope.checkEmail = function() {
    	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.Email)) {
    		$scope.rushForm.Email.$setValidity('Email', true);
        } else {
            $scope.rushForm.Email.$setValidity('Email', false);
        }
    }

    $scope.checkLast = function() {
    	if($scope.lastName.length >= 1) {
    		$scope.rushForm.lastName.$setValidity('lastName', true);
        } else {
            $scope.rushForm.lastName.$setValidity('lastName', false);
        }
    }

    $scope.checkFirst = function() {
        if($scope.lastName.length >= 1) {
            $scope.rushForm.lastName.$setValidity('fName', true);
        } else {
            $scope.rushForm.lastName.$setValidity('fName', false);
        }
    }

    $scope.reset = function() {
    	document.getElementById("rushForm").reset();
        $scope.rushForm.$setPristine();
        $scope.rushForm.$setUntouched();
    }

}])

.controller('EventsCtrl', ['$scope', '$http', function($scope, $http){
	
}]) 

.controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {
	
}])

.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
    
}])





