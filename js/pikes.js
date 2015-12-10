'use strict';

angular.module("PikeApp", ['ngSanitize', 'ui.router', 'ui.bootstrap', 'firebase']) //ngSanitize for HTML displaying
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', { //For homepage
		url: '/',
		templateUrl: 'partials/mainpartial.html',
		controller: 'MainCtrl'
	})
	.state('house', { 			   
		url: '/House', 
		templateUrl: 'partials/house.html',
		controller: 'HouseCtrl'
	})
	.state('slag', {			   
		url: '/SLAG',
		templateUrl: 'partials/slag.html',
		controller: 'SlagCtrl'
	})
	.state('beta', {			   
			url: '/Beta-Beta',
			templateUrl: 'partials/beta.html',
			controller: 'BetaCtrl'
	})
	.state('events', {			   
			url: '/Events',
			templateUrl: 'partials/events.html',
			controller: 'EventsCtrl'
	})
	.state('history', {			   
			url: '/History',
			templateUrl: 'partials/history.html',
			controller: 'HistCtrl'
	})
	.state('members', {			   
			url: '/Members',
			templateUrl: 'partials/members.html',
			controller: 'MembersCtrl'
	})
	.state('recruit', {			   
			url: '/Recruitment',
			templateUrl: 'partials/recruit.html',
			controller: 'RecruitCtrl'
	})
	.state('contact', {			   
			url: '/Contact_Us',
			templateUrl: 'partials/contact.html',
			controller: 'ContactCtrl'
	})
    .state('log', {              
            url: '/Login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
    })
    .state('login', {   
            url: '/Members-Area',        
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

.controller('LoginCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$location', '$uibModal', function($scope, $firebaseArray, $firebaseObject, $firebaseAuth, $location, $uibModal) {

    var ref = new Firebase("https://pikappaalphabetabeta.firebaseio.com");

    var chirpsRef = ref.child('chirps'); //"chirps" object inside the JSON object
    var usersRef = ref.child('users');

    $scope.chirps = $firebaseArray(chirpsRef);
    $scope.users = $firebaseObject(usersRef);

    var Auth = $firebaseAuth(ref);

    $scope.go = function (url) {
        $location.path(url);
    }

    $scope.newUser = {};

    $scope.signIn = function() {
      ref.authWithPassword({
          email    : $scope.newUser.email,
          password : $scope.newUser.password
        }, function(error, authData) {
          if (error) {
            alert("You must be a member of the Beta Beta chapter");
          } else {
            console.log("Success!");
            $scope.signI;
            var newUserInfo = {
                'handle': $scope.newUser.handle,
            }
            console.log("Success2!");
            $scope.users[authData.uid] = newUserInfo;
            $scope.users.$save();
            $scope.userId = authData.uid; 
            window.location.href = '#/Members-Area';
          }
        }
        
      )
    }
    $scope.signI = function() {
      var promise = Auth.$authWithPassword({
        'email': $scope.newUser.email,
        'password': $scope.newUser.password
      });
      return promise;
    }
    //Make LogOut function available to views
    $scope.logOut = function() {
       Auth.$unauth(); //"unauthorize" to log out
    };

    //Any time auth status updates, set the userId so we know
    Auth.$onAuth(function(authData) {
       if(authData) { //if we are authorized
          $scope.userId = authData.uid;
       }
       else {
          $scope.userId = undefined;
       }
    });

    //Test if already logged in (when page load)
    var authData = Auth.$getAuth(); //get if we're authorized
    if(authData) {
       $scope.userId = authData.uid;
    }

    $scope.chirp = function(){
      $scope.chirps.$add({
        text:$scope.newChirp,
        userId: $scope.userId,
        likes:0,
        dislikes:0,
        comments:0,
        time:Firebase.ServerValue.TIMESTAMP
      }).then(function(){
        $scope.newChirp = '';
      })
    }

    // Function to like a tweet
    $scope.like = function(chirp) {
      if($scope.userId) {
        chirp.likes += 1;
        $scope.chirps.$save(chirp)
      }
    };
    $scope.dislike = function(chirp) {
      if($scope.userId) {
        chirp.dislikes += 1;
        $scope.chirps.$save(chirp)
      }
    };

    $scope.changePass = function() {
    ref.changePassword({
      email: "bobtony@firebase.com",
      oldPassword: "correcthorsebatterystaple",
      newPassword: "shinynewpassword"
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          default:
            console.log("Error changing password:", error);
        }
      } else {
        console.log("User password changed successfully!");
      }
    }
  )}
    $scope.openModal = function() { //Opens the modal saying that the order has been added to the shopping cart
      var modalInstance = $uibModal.open({
         templateUrl: 'partials/settings-modal.html',
         controller: 'SelectModalCtrl',
         scope: $scope //pass in all our scope variables!
      });
    }
}])
.controller('SelectModalCtrl', function($scope, $http, $uibModalInstance) {
  $scope.changePass = function() {
    ref.changePassword({
      email: "bobtony@firebase.com",
      oldPassword: "correcthorsebatterystaple",
      newPassword: "shinynewpassword"
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          default:
            console.log("Error changing password:", error);
        }
      } else {
        console.log("User password changed successfully!");
      }
    }
  )}
  $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };
})




