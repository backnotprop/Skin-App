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

.controller('FeedCtrl', function(userInit, $scope) {

        // console.log(userInit);
        //console.log(userInit);
        $scope.userName = userInit[0].username;
        // console.log($scope.userName);
        $scope.items = userInit;
        console.log($scope.items);


})




.controller('ExploreCtrl', function(InitFactory, $state) {

        InitFactory.initStart().then(function(thisUser){

            console.log(thisUser);



        });


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

                var pIndex = Math.floor((Math.random() * 100000000));
                var fileName = pIndex + ".jpg";

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


    $scope.items = [
        { id: 1, op: 'Dallas Nix', op1: '@Dallas', image: 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10500398_10152229918746989_2816016453113228482_n.jpg?oh=ef5ba2adfcff90fe4cebe78d4b6a1622&oe=551F11B6&__gda__=1425761440_bbcc9bf7a408d34ce8e75e6784b54beb'},
        { id: 2, op: 'Michael Ramos', op1: '@Mdramos', image: 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/10557395_766183823403926_3579221947388743754_n.jpg?oh=1fd75f2db575957094f4327fc3869b23&oe=55165893&__gda__=1427924002_b3d661bed021ae470c80555eb3f5dbbb'},
        { id: 3, op: 'Michael Butchko', op1: '@Butchko', image: 'https://scontent-b-atl.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/7341_10153047715993747_4428269012739172386_n.jpg?oh=73839ee8de43802e3240c6615391ec31&oe=54FB0A11'},
        { id: 4, op: 'Katlynn Belcher', op1: '@Beltwerka', image: 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10303173_10203146113357311_1926158143358056309_n.jpg?oh=30ba1b80520e2ffa7ca463f52b73148d&oe=5507D6DF&__gda__=1426510537_0acadb2fc113d17adc655b3549fb4ed8'},
        { id: 5, op: 'Tracy Lewis', op1: '@TLewis', image:'https://scontent-b-atl.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10600637_784334528255522_8604158862161503808_n.jpg?oh=2075a393e74ad8ace85ddd59cbd0e301&oe=54FE4379'}
    ];




    })

.controller('ProfileCtrl', function(userInit, $scope) {

       // console.log(userInit);
        //console.log(userInit);
        $scope.userName = userInit[0].username;
       // console.log($scope.userName);
        $scope.items = userInit[0].inks;
        //console.log($scope.items);


});

