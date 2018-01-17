var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.result = [];
    $scope.parsedData = [];
    $scope.debug = true;

    for(var i = 0; i < 2; i ++){

    }
    $http.get("https://api.instagram.com/v1/users/self/media/recent/?access_token=3939283418.1677ed0.89cc4847e885479296ac97bbce7201d4")
    .then(function(response) {
        var httpResponse = response.data.data;
        for(var i = 0; i < httpResponse.length;i++){
            // console.log(httpResponse[i]);
            try{
                var tempObject = {
                    id      : httpResponse[i].id,
                    poster  : httpResponse[i].user.username,
                    img     : httpResponse[i].images.standard_resolution.url,
                    source  : 'instagram',
                    likes   : httpResponse[i].likes.count
                }
                var tempString     = httpResponse[i].caption.text
                tempString         = tempString.split("-")
                var nameStringPt1  = tempString[0].replace(/↵/g,"*")
                var tempStringName = nameStringPt1.replace(/([\n].*)\w+/g," ")
                var creatorInfo = [];

                if(tempStringName.indexOf('@') !== -1){
                    // console.log(tempStringName)
                    var stringNameFinal_p1 = tempStringName.split("@")
                    var finalName  = stringNameFinal_p1[0].replace("by","");
                    var finalInsta = "@"+stringNameFinal_p1[1]
                    var finalReff  = "http://www.instagram.com/"+stringNameFinal_p1[1]
                    finalName = finalName.slice(0, -1)
                    finalInsta = finalInsta.slice(0, -1)
                    finalReff  = finalReff.slice(0, -1)
                    tempObject.artist = finalName.trim();
                    tempObject.credit = finalInsta.trim();
                    tempObject.reff = finalReff.trim();

                    
                }else{
                    var finalName = tempStringName.replace("by","")
                    finalName = finalName.slice(0,-1)
                    tempObject.artist = finalName.trim();
                }
                // console.log(tempObject)
            }catch(e){
                console.warn("itt: "+i +" had an issue. parsing Json. \n Turn on debugging for stacktrace" )
                if($scope.debug)console.log(e)
            }
            $scope.parsedData.push(tempObject)
            console.log(tempObject)
            // console.log(tempObject);

        }
        // console.log(response.data.data)
        // $scope.result = response.data;
    });
});