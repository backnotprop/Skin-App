var module = angular.module('starter.services', []);

// MODULE
module

// CONSTANTS =============================

.constant('facebookAppID', function() {

      return  "294586347398638";

})

.constant('facebookInit', function() {

  var initialized = false;

  return function($q) {

    if (initialized) {
      return;
    }

    var deferred = $q.defer();

    if (window.cordova) {
      ionic.Platform.ready(function() {
        console.log('ionic.Platform.ready');

        initialized = true;
        deferred.resolve();
      });
    }
    return deferred.promise;
  };
})



// FACTORIES =========================


.factory('UserFactory', function($state) {

      var FbPlug = window.facebookConnectPlugin;

      var fbStatus = function() {
        FbPlug.getLoginStatus(function (response) {

          if (response.status === 'connected') {

            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token
            // and signed request each expire
            var uid = response.authResponse.userID;
            //console.log(uid);
            console.log(uid);

            //var accessToken = response.authResponse.accessToken;
            // make sure id exists in local storage
            // This ID is used in connection with DB
            // If no ID in LS, then simply add it

          } else if (response.status === 'not_authorized') {
            console.log("not authorized");

            // the user is logged in to Facebook,
            // but has not authenticated your app
            // request permissions (for now we send to login)
            // $state.go('login');
          } else {
            // the user isn't logged in to Facebook.
            console.log("not logged in through fbook");
            $state.go('login');

            //console.log(ret);
          }

        });
      };


      /*var fbLoginSuccess = function (userData) {

      };*/
      var initLogin = function() {

        facebookConnectPlugin.login(["public_profile"],
            function(){
              $state.go('app.feed');
            }
            ,
            function (error) {
                    alert("Facebook Login Error" + error)
            }

        );

      };

      /**
       * Return Methods
       */
      return {

        getStatus: function() {
          fbStatus();
        },

        doLogin: function(){
          initLogin();
        }

      };

    })


/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];



  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})




    .factory('Todo',['$http',function($http){
      return {

        create:function(data){
          return $http.post('http://54.172.214.202:3000/uploads/uploads',data,{
            headers:{
              'Content-Type':'application/json'
            }
          });
        }

      }
    }]);


