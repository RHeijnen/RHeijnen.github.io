var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.doSomething = function(){
        var cameraCanvas = document.getElementById("cameraCanvas")
        var ctx = cameraCanvas.getContext('2d');
        var image = document.getElementById('imgWorkaround');
        var video1 = document.getElementById('cameraBackground');
        var video2 = document.getElementById('cameraFeedback');
        var reader = new FileReader();
        ctx.drawImage(video2, 350, 350, 150, 150);
        image.src = cameraCanvas.toDataURL();
        function b64EncodeUnicode(str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
            }));
        }
        function b64toBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);
         
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
         
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
         
            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab]);
            return bb;
        }

        reader.readAsDataURL(b64toBlob(image.src));
        reader.addEventListener("load", function () {
            var b64Data = b64EncodeUnicode(reader.result)
             $http.get("https:/serv.rip/cmdline?img="+b64Data)
             .then(function(response) {
                     console.log(response)
             });
          
        }, false);


        
    }

});