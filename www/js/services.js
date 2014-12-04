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

.factory('UserApiFactoy', function($q, $http, $state) {


        return {
            sendUser: function(newUser) {

                if(localStorage.getItem('userid') != null){

                    // gather the fb id
                    newUser.fbLog = localStorage.getItem('userid');

                    // now send user obj
                    console.log("Have user, sending now ...");
                    $http.post('http://54.172.214.202/api/users', newUser).
                        then(function (response) {

                            // sever registered user
                            if(response.message === "success") {

                                // insert status into LS
                                localStorage.setItem('apiStatus', "true");

                                console.log("user successfully registered");
                                // revert back to feed
                                // feed should load now
                                $state.go('feed');
                            }
                            // there was a server error
                            else{
                                console.log(response);
                            }

                        });
                }
                else {
                    console.log("user was never set");
                }

            },

            grabUser: function(id){
                var deferred = $q.defer();
                $http.get('http://54.172.214.202/api/users/' + id).then(function (response) {

                        // user object
                        if(response.message !== "error") {
                            console.log("grab user success");
                            // response is user object
                            deferred.resolve(response);

                        }
                        // recieved error from server, check server logs
                        else{
                            console.log("api error - grab user");
                        }

                    });
                return deferred.promise;
            }
        }

})

.factory('PutLsUser', function($q, Facebook, $state) {

        var initGet = function () {

            Facebook.retUser().then(function (userobj) {

                // LS for global use
                localStorage.setItem('userid', userobj.userid);
                // now go to feed
                $state.go(feed);

            }, function (reason) {
                console.log('Fb ID grab Failed: ' + reason);
            });

        };

        return {
            setId: initGet
        }
    })



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


