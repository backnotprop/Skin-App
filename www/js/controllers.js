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

.controller('RegCtrl', function ($scope, $state, UserApiFactory) {

    // User clicks Register button, so we run fb login service
    $scope.userSub = function(user){

        var newUser = angular.copy(user);

        UserApiFactory.sendUser(newUser).then(function(response){

            if(response.message === "success"){
                $state.go('app.feed')
            }


        });



    };


    // Eventually can add other login methods here

})

.controller('FeedCtrl', function(GetUser) {

        var fbUserId = localStorage.getItem('userid');

        // grab fbID if not in LS
        if( fbUserId === null) {
            GetUser.retUser().then(function (thisUser) {

                console.log(thisUser);

            }, function (reason) {
                console.log('Failed: ' + reason);
            });
        }
        // else now see if connected with api
        else{

            //grabuser form api


        }

})



.controller('ExploreCtrl', function() {

        var local = localStorage.getItem('userid');
        alert(local);
})

.controller('InkCtrl', ['$scope', 'Todo', '$state',
        function($scope,Todo) {


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
                                   alert("Successfully Uploaded!");
                                   // alert(e);
                                },
                                function (e) {
                                 //   alert("Upload failed");
                                 alert("Error - Photo Not Uploaded");
                                }, options);

                        })
                        .error(function (error) {

                            // **** S7. Json Error ****
                            //alert(JSON.stringify(error));

                            alert("Error - Photo Server Down");

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

.controller('ProfileCtrl', function($scope) {


            $scope.items =
            {
                posts: [

                    {
                        username: "Bad Man",
                        type: "image",
                        urlRef: "Hello.txt",
                        post: "TIME TO GET WILD",
                        numFav: 7,
                        date: "date here",
                        comments: [
                            {com_user: "michael", com_post: "good stuff"},
                            {com_user: "alex", com_post: "hell yes"}
                        ]
                    },


                    {
                        username: "CheckerTats",
                        type: "image",
                        urlRef: "wild.txt",
                        post: "So glad to be able to do this",
                        numFav: 10,
                        date: "date here",
                        comments: [
                            {com_user: "basky", com_post: "wow awesome"}

                        ]
                    }

                ]
            };


});
