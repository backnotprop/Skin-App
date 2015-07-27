<<<<<<< HEAD
angular.module('skin.services', [])

//
// User Api / Factory
//

.factory('UserApiFactory', function($q, $http, $state) {
    return {
        sendUser: function(newUser) {

            console.log("begging register");

            // generate a number for random profile
            var idGen = "1000";
            // as long as this is in local storage, you can post photos
            // to the randomly generated profile
            localStorage.setItem('userid', idGen);
            console.log(idGen);

            if( idGen !== null) {

                // gather the user id
                newUser.userId = idGen;

                // now send user obj
                console.log("Have user, sending now ...");
                $http.post('http://54.172.214.202:4000/api/users', newUser)
                    .then(function (response) {
                        console.log(response);
                        // insert status into LS
                        localStorage.setItem('apiStatus', "true");
                        console.log("user successfully registered");
                        // revert back to feed
                        // feed should load now
                        $state.go('tab.feed');
                    });
             }
             else {
                console.log("error generating user id");
             }

         },
         sendImageUrl: function(url,$state) {
            console.log("sending url" + url);

            var ob = {};
            ob.UrlLog = url;
            ob.userId = localStorage.getItem('userid');

            console.log("User Id " + ob.userId);
            console.log("Url " + ob.UrlLog);

            // now image url
            console.log("Have Image: " + ob);
            $http.post('http://54.172.214.202:4000/api/posts', ob)
                .then(function (response) {
                    console.log("URL http res" + response);
                    $state.go('feed');
                });
            },
=======
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

.factory('UserApiFactory', function($q, $http, $state) {


        return {
            sendUser: function(newUser) {

                if(localStorage.getItem('userid') != null){

                    // gather the fb id
                    newUser.fbLog = localStorage.getItem('userid');

                    // now send user obj
                    console.log("Have user, sending now ...");
                    $http.post('http://54.172.214.202/api/users', newUser).
                        then(function (response) {
                            console.log(response);
                            // insert status into LS
                            localStorage.setItem('apiStatus', "true");

                            console.log("user successfully registered");
                            // revert back to feed
                            // feed should load now
                            $state.go('app.feed');

                        });
                }
                else {
                    console.log("user was never set");
                }

            },

            sendImageUrl: function(url,$state) {
                console.log("sending url" + url);
                    var ob = {};
                    ob.fbLog = localStorage.getItem('userid');
                    ob.UrlLog = url;
                    console.log("Fb ID " + ob.fbLog);
                    console.log("Url " + ob.UrlLog);

                    // now image url
                    console.log("Have Image: " + ob);
                    $http.post('http://54.172.214.202/api/posts', ob).
                        then(function (response) {
                            console.log("URL http res" + response);
                            $state.go('feed');

                    });


            },

>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
            grabUser: function(){
                var deferred = $q.defer();
                var id = localStorage.getItem('userid');
                console.log("THIS IS ID: " + id);
<<<<<<< HEAD
                $http.get('http://54.172.214.202:4000/api/users/' + id)
                    .success(function(data) {
                        deferred.resolve(data);
=======
                $http.get('http://54.172.214.202/api/users/' + id)
                    .success(function(data) {

                            deferred.resolve(data);

>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
                    });
                return deferred.promise;
            },
            grabUsers: function(){
                var deferred = $q.defer();
                console.log("Grabbing Users");
<<<<<<< HEAD
                $http.get('http://54.172.214.202:4000/api/users/')
                    .success(function(data) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            regCheck: function(){
                var deferred = $q.defer();
                var status = localStorage.getItem('apiStatus');
=======
                $http.get('http://54.172.214.202/api/users/')
                    .success(function(data) {

                        deferred.resolve(data);

                    });
                return deferred.promise;
            },

            regCheck: function(){
                var deferred = $q.defer();
                var status = localStorage.getItem('apiStatus');

>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
                if(status === null){
                    $state.go('register');
                }
                else{
                    console.log("User Registered");
                    deferred.resolve();
                }
                return deferred.promise;
            }
<<<<<<< HEAD
        };
})

//
// Init factory
//

.factory('InitFactory', function(UserApiFactory, $q){

        return {
            initStart: function () {
                return;
            },
            loadUser: function(){
                var deferred = $q.defer();
                UserApiFactory.grabUser().then(function (user) {
                    deferred.resolve(user);
                });
                return deferred.promise;
            },
            loadUsers: function(){
                var deferred = $q.defer();
                UserApiFactory.grabUsers().then(function (user) {
                    // above/this response is the user object
                    console.log("Inside load Users");
                    deferred.resolve(user);
                });
                return deferred.promise;
            }
        };
    })

//
// Local Storage Factory
//

    .factory('LocalStorageFactory', function() {
        return {
            initStoreUser: function (userObj) {
                var toStore = userObj;
                //console.log("To Store: " + toStore);
                var userId = localStorage.getItem('userid');
                if(userId === null){
                    // LS for global use
                    localStorage.setItem('userid', toStore.userid);
                }
            }
        };
    })


    .factory('PicData', function($http){
        return {
            create: function(data){
                        return $http.post('http://54.172.214.202:4000/api/uploads', data);
                    }
        };
    });
=======
        }

})

.factory('InitFactory', function(Facebook, UserApiFactory, $q){

        return {

            initStart: function () {
                var deferred = $q.defer();

                Facebook.userAuth().then(function () {

                    // above response will be resolved

                    UserApiFactory.regCheck().then(function () {

                        //  above function is resolved
                        UserApiFactory.grabUser().then(function (user) {

                            // above/this response is the user object
                            deferred.resolve(user);

                        })

                    })
                });
                // user object
                return deferred.promise;
            },

            loadUser: function(){

                var deferred = $q.defer();
                UserApiFactory.grabUser().then(function (user) {

                    // above/this response is the user object
                    console.log("Inside load User");
                    console.log(user);
                    deferred.resolve(user);

                });
                return deferred.promise;


            },

            loadUsers: function(){

                var deferred = $q.defer();
                UserApiFactory.grabUsers().then(function (user) {

                    // above/this response is the user object
                    console.log("Inside load Users");
                    deferred.resolve(user);

                });
                return deferred.promise;


            }


        }

    })


.factory('LocalStorageFactory', function() {

        return {

            initStoreUser: function (userObj) {

                var toStore = userObj;
                //console.log("To Store: " + toStore);
                var fbUserId = localStorage.getItem('userid');
                if(fbUserId === null){
                    // LS for global use
                    localStorage.setItem('userid', toStore.userid);
                }

            }
        }
    })



/**
 * Facebook Factory
 *
 * So far User data is generated using the Facebook
 * plugin.
 */
    .factory('Facebook', function($q, $state, LocalStorageFactory) {

        var FB = window.facebookConnectPlugin;

        var doCheck  = function(){

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

                    //console.log(ob);
                    LocalStorageFactory.initStoreUser(ob);

                    deferred.resolve();


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

            userAuth: doCheck
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


>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
