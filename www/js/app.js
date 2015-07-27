<<<<<<< HEAD
// Ionic skin App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'skin' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'skin.services' is found in services.js
// 'skin.controllers' is found in controllers.js
angular.module('skin', ['ionic', 'skin.controllers', 'skin.services'])
=======
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
<<<<<<< HEAD
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
=======
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
    }


  });
})

<<<<<<< HEAD
.config(function($stateProvider, $urlRouterProvider) {
=======
.config(function($stateProvider, $urlRouterProvider,  facebookInit) {
>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

<<<<<<< HEAD
  // setup an abstract state for the tabs directive
.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // login
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })

  // register
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegCtrl'
  })

  // 'ink' feed (all photos) view
  .state('tab.feed', {
    url: '/feed',
    views: {
      'tab-feed': {
        templateUrl: 'templates/tab-feed.html',
        controller: 'FeedCtrl',
        resolve: {
          userInit: function(InitFactory) {
            return  InitFactory.loadUsers();
          }
        }
      }
    }
  })

  // explore view
  .state('tab.explore', {
    url: '/explore',
    views: {
      'tab-explore': {
        templateUrl: 'templates/tab-explore.html',
        controller: 'ExploreCtrl'
      }
    }
  })

  // take photo view 'ink'
  .state('tab.ink', {
    url: '/ink',
    views: {
      'tab-ink': {
        templateUrl: 'templates/tab-ink.html',
        controller: 'InkCtrl'
      }
    }
  })

    // find local artists view
    .state('tab.locate', {
      url: '/locate',
      views: {
        'tab-locate': {
          templateUrl: 'templates/tab-locate.html',
          controller: 'LocateCtrl'
=======
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
>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
        }
      }
    })

<<<<<<< HEAD
    // profile view
    .state('tab.skin', {
      url: '/skin',
      views: {
        'tab-skin': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl',
          resolve: {
            userInit: function(InitFactory){
              return  InitFactory.loadUser();
            }
          }
=======
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

>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
        }
      }
    });

<<<<<<< HEAD
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/feed');

});
=======
  // if none of the above states are matched, use this as the
  // take user to feed
  $urlRouterProvider.otherwise('/app/explore');

});

>>>>>>> cd9e7e7363fa9bf393f82ebd426d2fe8e72a8d44
