// Ionic skin App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'skin' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'skin.services' is found in services.js
// 'skin.controllers' is found in controllers.js
angular.module('skin', ['ionic', 'skin.controllers', 'skin.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }


  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

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
        }
      }
    })

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
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/feed');

});
