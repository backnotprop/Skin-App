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
            grabUser: function(){
                var deferred = $q.defer();
                var id = localStorage.getItem('userid');
                console.log("THIS IS ID: " + id);
                $http.get('http://54.172.214.202:4000/api/users/' + id)
                    .success(function(data) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            grabUsers: function(){
                var deferred = $q.defer();
                console.log("Grabbing Users");
                $http.get('http://54.172.214.202:4000/api/users/')
                    .success(function(data) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            },
            regCheck: function(){
                var deferred = $q.defer();
                var status = localStorage.getItem('apiStatus');
                if(status === null){
                    $state.go('register');
                }
                else{
                    console.log("User Registered");
                    deferred.resolve();
                }
                return deferred.promise;
            }
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
