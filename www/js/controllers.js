angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope){



})

.controller('AuthCtrl', function ($scope, Facebook) {

        // User clicks Facebook login, so we run fb login service
      $scope.fbLogin = function(){
         Facebook.initLogin();

      };


        // Eventually can add other login methods here

})

.controller('RegCtrl', function ($scope, UserApiFactory) {

    // User clicks Register button, so we run fb login service
    $scope.userSub = function(user){
        var newUser = angular.copy(user);
        // send user input to api
        // this function loops back to feed
        // were in a function still ()
        UserApiFactory.sendUser(newUser);

    };
})

.controller('FeedCtrl', function(InitFactory) {



        InitFactory.initStart().then(function(thisUser){

           // var x = "username";
              //console.log(thisUser);
           // console.log(thisUser[0].inks[0].[username]);
            //$scope.user = thisUser;


        });



})



.controller('ExploreCtrl', function() {


})

.controller('InkCtrl', ['$scope', 'Todo', 'UserApiFactory', '$state',
        function($scope,Todo, UserApiFactory) {


            var pictureSource; // picture source
            var destinationType; // sets the format of returned value

            ionic.Platform.ready(function() {

                if (!navigator.camera)
                {
                    // error handling

                    // **** S1. Check ****
                   // alert("S1. camera error!");
                    return;
                }
                else{

                    // **** S1. Check ****
                   // alert("S1. camera ready");
                }
                //pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
                pictureSource=navigator.camera.PictureSourceType.CAMERA;
                destinationType=navigator.camera.DestinationType.FILE_URI;
            });


            $scope.takePicture = function() {

                // **** S3. Check ****
               //alert("got camera button click");

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

                    // **** S4. Check ****
                    alert(" Error - Problem Loading Camera");

                    // error handling
                    return;
                }
                navigator.camera.getPicture(
                    function (imageURI) {

                        // **** S5. Check ****
                        //alert("S5. got picture success ", imageURI);

                        $scope.mypicture = imageURI;

                        // **** S5. Check ****
                        //alert($scope.mypicture);
                    },
                    function (err) {

                        // **** S5. Check ****
                        //alert("S5. got no picture error ", err);

                        // error handling camera plugin
                    },
                    options);
            };

            // do POST on upload url form by http / html form
            $scope.upload = function() {

                // **** S6. Check ****
                //alert("S6. UPLOAD HIT");

                    var ft = new FileTransfer(),
                        options = new FileUploadOptions();

                    var fileName = $scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);

                    options.fileKey = "file";
                    options.fileName = fileName;
                    options.mimeType = "image/jpeg";
                    options.chunkedMode = false;

                    Todo.create({"fileName": fileName})

                        .success(function (data) {

                            // **** S7. Check ****
                            //alert("S7. Server Contact Good");

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

                                    alert("Hey " + e);
                                    var toSend = "https://s3-us-west-1.amazonaws.com/skinimage1/" + fileName;
                                    // send url to our server
                                    UserApiFactory.sendImageUrl(toSend);
                                },
                                function (e) {
                                 //   alert("Upload failed");
                                 alert("Error - Photo Not Uploaded" + e);
                                }, options);

                        })
                        .error(function (error) {

                            // **** S7. Json Error ****
                            //alert(JSON.stringify(error));

                            alert("Error - Photo Server Down" + error);

                        });
                    }

}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('LocateCtrl', function($scope) {
})

.controller('ProfileCtrl', function(userInit, $scope) {

        //console.log(userInit);
        $scope.userName = "Halo";//userInit[0].username;
        console.log($scope.userName);
        $scope.items = userInit[0].inks;
        console.log($scope.items);


});

