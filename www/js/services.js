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


.factory('UserApiFactoy', function($q, $http) {


        return {
            sendUser: function(newUser) {
                var deferred = $q.defer();


                if(localStorage.getItem('userid') != null){
                    newUser.fbLog = localStorage.getItem('userid');
                    console.log("Have user, sending now ...");

                        $http.post('http://54.172.214.202/api/users', newUser).
                            success(function (response) {
                                console.log("success");
                                deferred.resolve(response);
                            }).
                            error(function (response) {
                                console.log("error");
                                deferred.resolve(response);

                            });

                    return deferred.promise;
                }
                else {
                    console.log("user was never set");
                }

            },

            grabUser: function(id){
                var deferred = $q.defer();

                $http.get('http://54.172.214.202/api/users/' + id).
                    success(function (response) {
                        console.log("grab user success");
                        deferred.resolve(response);
                    }).
                    error(function (response) {
                        console.log("error getting user");
                        deferred.resolve(response);

                    });

                return deferred.promise;



            }
        }

})

.factory('GetUser', function($q, Facebook, $state) {

        var initGet = function () {
            var deferred = $q.defer();

            Facebook.retUser().then(function (userobj) {

                localStorage.setItem('userid', userobj.userid);

                deferred.resolve(userobj);

            }, function (reason) {
                console.log('Failed: ' + reason);
            });
            return deferred.promise;

        };

        return {
            retUser: initGet
        }
    })

// FACTORIES =========================

/**
 * Facebook Factory
 *
 * So far User data is generated using the Facebook
 * plugin.
 */
    .factory('Facebook', function($q, $state) {

        var FB = window.facebookConnectPlugin;

        var getUser  = function(){

            var deferred = $q.defer();
            FB.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    console.log('User Seems to be connected');
                    // the user is logged in and has authenticated the
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token
                    // and signed request each expire
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                    var ob = {};

                    ob['userid'] = uid;
                    ob['token'] = accessToken;

                    deferred.resolve(ob);

                } else if (response.status === 'not_authorized') {
                    console.log("not authorized");
                    $state.go('login');

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
            return deferred.promise;
        };


        return {

            retUser: getUser
            ,
            initLogin: function(){
            FB.login(["public_profile"],
            function () {
                $state.go('app.feed');
            }
            ,
            function (error) {
                alert("Facebook Login Error" + error)
            }
            );
            }
        }
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


