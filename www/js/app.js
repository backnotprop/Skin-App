// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider,  facebookInit) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the apps directive
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app.html',
      controller: 'MainCtrl',
      resolve: {
          waitForFacebook: facebookInit()
          }
    })

    // login
    .state('login', {
        url: '/login',
        templateUrl: 'templates/app-login.html',
        controller: 'AuthCtrl'
    })


      // login
      .state('register', {
          url: '/register',
          templateUrl: 'templates/app-regis.html',
          controller: 'RegCtrl'
      })


    // Each skin has its own nav history stack:

    .state('app.feed', {
      url: '/feed',
      views: {
            'app-feed': {
                templateUrl: 'templates/app-feed.html',
                controller: 'FeedCtrl',
                resolve: {
                    userInit: function(InitFactory){
                        return  InitFactory.loadUsers();
                    }
                }
            }
      }
    })



      .state('app.explore', {
          url: '/explore',
          views: {
              'app-explore': {
                  templateUrl: 'templates/app-explore.html',
                  controller: 'ExploreCtrl'
              }
          }
      })

      .state('app.ink', {
          url: '/ink',
          views: {
              'app-ink': {
                  templateUrl: 'templates/app-ink.html',
                  controller: 'InkCtrl'
              }
          }
      })

    .state('app.friends', {
      url: '/friends',
      views: {
        'app-friends': {
          templateUrl: 'templates/app-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('app.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'app-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

      .state('app.locate', {
          url: '/locate',
          views: {
              'app-locate': {
                  templateUrl: 'templates/app-locate.html',
                  controller: 'LocateCtrl'
              }
          }
      })

    .state('app.skin', {
      url: '/skin',
      views: {
        'app-skin': {
          templateUrl: 'templates/app-profile.html',
          controller: 'ProfileCtrl',
            resolve: {
                userInit: function(InitFactory){
                  return  InitFactory.loadUser();
                }
            }

        }
      }
    });

  // if none of the above states are matched, use this as the
  // take user to feed
  $urlRouterProvider.otherwise('/app/explore');

});

