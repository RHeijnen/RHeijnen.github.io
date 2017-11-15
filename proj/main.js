window.onload = function() {
    // the items in this array are the whitelisted 'QR codes'
    var validationArr = [ "appidaapi","appidaapi2"];
    var imageHolder;

    var width         = 320;    // We will scale the photo width to this
    var height        = 0;     // This will be computed based on the input stream
    var streaming     = false;
    var scanning      = false;
    var playing       = false;
    var video         = document.getElementById('video');
    var canvas        = document.getElementById('canvas');
    var photo         = document.getElementById('photo');
    var upload        = document.getElementById('upload');
    var preview       = document.getElementById('preview');
    var qr            = new QrCode();
    const constraints = {advanced: [{facingMode: "environment"}]}
    // this function takes a key and checks if it is whitelisted
    function validationKey(key){
        var validation = false;
        for(var i = 0; i < validationArr.length;i++){
            if(validationArr[i] == key){
                validation = true;
            }
        }
        return validation
    }
    
    // set a key in storage as owned
    function setStorageItem(key){
        if (typeof(Storage) !== "undefined") {
            if(validationKey(key)){
                // good to go
                localStorage.setItem(key,1)    // define 1 as 'true' / 'present'  
                if('vibrate' in navigator){
                    navigator.vibrate([200,100,50])
                }else{
                    console.log("Should be vibrating.. but your device sucks")
                }         
            }else{
                console.log("this item does not pass validation")
            }
        } else {
            alert("Browser does not support storage! git gud browser plz")
        }        

    }
    // setStorageItem("appidaapi4")
    

    navigator.mediaDevices.getUserMedia({ video: constraints, audio: false }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    }).catch(function(err) {
        console.log("An error occured initialising video element! \n error code: " + err);
    });


    qr.callback = function(err, result) {
      var span = document.querySelector('span') || document.createElement('span');
      if(result){
        var result = result.result;
        setStorageItem(result);
        console.error("Found QR: " +result.result);
      }
      else{
        span.textContent = 'Error! See error message in console!';
        console.error(err);
      }
      preview.appendChild(span);
    }
    /*

    */
    video.addEventListener('canplay', function(ev){
        if (!streaming) {
          height = video.videoHeight / (video.videoWidth/width);
          video.setAttribute('width', width);
          video.setAttribute('height', height);
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          streaming = true;
        }
      }, false);

    upload.addEventListener('change', function() {
        for (var i = 0; i < this.files.length; i++) {
          var file = this.files[i];
          var imageType = /^image\//;
          if (!imageType.test(file.type)) {
            throw new Error('File type not valid');
          }
          // Read file
          var reader = new FileReader();
          reader.addEventListener('load', function() {
            // Show as preview image
            var img = document.querySelector('img') || document.createElement('img');
            img.src = this.result;
            preview.appendChild(img);
            // Analyse code
            qr.decode(this.result);
          }.bind(reader), false);
          reader.readAsDataURL(file);
        }
      }, false);

    /////////////////
    ////QR /////////////

    function handleFiles(f){
        var o=[];
        for(var i =0;i<f.length;i++){
          var reader = new FileReader();
          reader.onload = (function(theFile) {
            return function(e) {
              qrcode.decode(e.target.result);
            };
          })(f[i]);
          // Read in the image file as a data URL.
          reader.readAsDataURL(f[i]);	
        }
    }

    function startscan(){
        scanning = true;        
        video.play();        
        if(!playing){
            var takeScreenCap = function(){
                if(scanning){
                    var context = canvas.getContext('2d');
                    if (width != undefined && height != undefined) {
                      canvas.width = width;
                      canvas.height = height;
                      context.drawImage(video, 0, 0, width, height);
                      var data = canvas.toDataURL('image/png');
                      qr.decode(data);
                    } 
                }
            }
            setInterval(takeScreenCap , 1000) 
        }   
    }

    /*
        Modal controls
    */
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        startscan();
        playing = true;        
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        scanning = false;        
        video.pause();     
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            scanning = false;            
            video.pause();                    
            modal.style.display = "none";
        }
    }

};



