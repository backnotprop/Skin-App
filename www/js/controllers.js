angular.module('skin.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AuthCtrl', function ($scope, $state) {

    // normally this would be a login feature ...
    // will have to update code to include this but for now it fowards to Register state
    // afterwards a temp login id will be used for taking/uploading photos
    $scope.loginAction = function(){
        $state.go('register');
    };

})

.controller('RegCtrl', function ($scope, UserApiFactory) {

    // User clicks Register button, complete simple register
    $scope.userSub = function(user){
        var newUser = angular.copy(user);
        // send user input to api
        // this function loops back to feed
        // were in a function still ()
        UserApiFactory.sendUser(newUser);
    };

})

.controller('FeedCtrl', function(userInit, $scope, $state) {

    var loginCheck = localStorage.getItem('userid');
    if(!loginCheck || loginCheck === null){
        $state.go('login');
    }

    $scope.items = userInit;
    console.log($scope.items);

})

.controller('ExploreCtrl', function(InitFactory, $state) {

})

.controller('InkCtrl', ['$scope', 'PicData', 'UserApiFactory',

      function($scope, PicData, UserApiFactory) {

          var pictureSource; // picture source
          var destinationType; // sets the format of returned value

          ionic.Platform.ready(function() {

            if (!navigator.camera)
            {
                alert("Camera not found");
                return;
            }
            pictureSource=navigator.camera.PictureSourceType.CAMERA;
            destinationType=navigator.camera.DestinationType.FILE_URI;
          });

          $scope.takePicture = function() {

            var options = {
                quality: 50,
                targetWidth: 640,
                targetHeight: 640,
                destinationType: destinationType,
                sourceType: pictureSource,
                encodingType: 0
            };

            if (!navigator.camera)
            {
                alert(" Error - Problem Loading Camera");
                return;
            }
            navigator.camera.getPicture(
                function (imageURI) {
                    $scope.mypicture = imageURI;
                },
                function (err) {
                  alert("Error processing photo");
                },
                options);
          };

    // do POST on upload url form by http / html form
      $scope.upload = function() {

          var ft = new FileTransfer(),
              options = new FileUploadOptions(),
              pIndex = Math.floor((Math.random() * 100000000)),
              fileName = pIndex + ".jpg";

            options.fileKey = "file";
            options.fileName = fileName;
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;


            PicData.create({"fileName": fileName})
            .success(function (data) {
                options.params = {
                    "key": fileName,
                    "AWSAccessKeyId": data.awsKey,
                    "acl": "public-read",
                    "policy": data.policy,
                    "signature": data.signature,
                    "Content-Type": "image/jpeg"
                };

               ft.upload($scope.mypicture, "https://" + data.bucket + ".s3.amazonaws.com/",
                  function (e) {
                      console.log("may have been error going to aws: " + e);
                      console.log("about to send to aws");
                      var toSend = "https://s3-us-west-1.amazonaws.com/skinimage1/" + fileName;
                      // send url to our server
                      UserApiFactory.sendImageUrl(toSend);
                  },
                  function (e) {
                      //   alert("Upload failed");
                      console.log("Error - Photo Not Uploaded" + e);
                  }, options);
            })
            .error(function (error) {
                console.log("Error - Photo Server Down" + error);
            });
        };
}])

.controller('LocateCtrl', function($scope) {

    $scope.items = [
        { id: 1, op: 'Dallas Nix', op1: '@Dallas', image:  ''},
        { id: 2, op: 'Michael Ramos', op1: '@Mdramos', image:  ''},
        { id: 3, op: 'Michael Butchko', op1: '@Butchko', image: ''},
        { id: 4, op: 'Katlynn Belcher', op1: '@Beltwerka', image:  ''},
        { id: 5, op: 'Tracy Lewis', op1: '@TLewis', image: ''}
    ];

})

.controller('ProfileCtrl', function(userInit, $scope) {

        // TODO load user photos with id

        // console.log(userInit);
        // console.log(userInit);
        $scope.userName = userInit[0].username;
        // console.log($scope.userName);
        $scope.items = userInit[0].inks;
        //console.log($scope.items);

});
