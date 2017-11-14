window.onload = function() {
    // the items in this array are the whitelisted 'QR codes'
    var validationArr = [ "appidaapi","appidaapi2"];
    var imageHolder;
    
    // this function takes a key and checks if it is whitelisted
    var validationKey = function(key){
        var validation = false;
        for(var i = 0; i < validationArr.length;i++){
            if(validationArr[i] == key){
                validation = true;
            }
        }
        return validation
    }
    
    // set a key in storage as owned
    var setStorageItem = function(key){
        if (typeof(Storage) !== "undefined") {
            if(validationKey(key)){
                // good to go
                localStorage.setItem(key,1)    // define 1 as 'true' or 'present'             
            }else{
                console.log("this item does not pass validation")
                // let user know this aint alrighty
            }
        } else {
            alert("Browser does not support storage! git gud browser plz")
        }        

    }
    // setStorageItem("appidaapi4")
    var upload = document.getElementById('upload');
    var preview = document.getElementById('preview');
    var qr = new QrCode();
    qr.callback = function(err, result) {
      var span = document.querySelector('span') || document.createElement('span');
      if(result){
        span.textContent = result;
        console.error(result);

      }
      else{
        span.textContent = 'Error! See error message in console!';
        console.error(err);
      }
      preview.appendChild(span);
    }
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
    


    /////////////////

    /////////////////

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
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

};



