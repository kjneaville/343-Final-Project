'use strict';

angular.module("PikeApp", ['ngSanitize', 'ui.router', 'ui.bootstrap']) //ngSanitize for HTML displaying
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', { //For homepage
		url: '/',
		templateUrl: 'partials/mainpartial.html',
	})
	.state('house', { 			   //For orders page
		url: '/House', 
		templateUrl: 'partials/house.html',
	})
	.state('slag', {			   //For shopping cart
		url: '/SLAG',
		templateUrl: 'partials/slag.html',
	})
	.state('beta', {			   //For details of each bean
			url: '/Beta-Beta',
			templateUrl: 'partials/beta.html',
	})
	.state('events', {			   //For details of each bean
			url: '/Events',
			templateUrl: 'partials/events.html',
	})
	.state('history', {			   //For details of each bean
			url: '/History',
			templateUrl: 'partials/history.html',
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
	})
	$urlRouterProvider.otherwise('/'); //All invalid addresses route to homepage
})
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

    $scope.reset = function() {
        $scope.rushForm.$setPristine();
    }

}])



