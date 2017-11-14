window.onload = function() {
    // the items in this array are the whitelisted 'QR codes'
    var validationArr = [ "appidaapi","appidaapi2"];

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


    /////////////////
    /////////////////
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



