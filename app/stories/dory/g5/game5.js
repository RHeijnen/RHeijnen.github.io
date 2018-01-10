window.onload = function(){ // on page load
    var canvas                  = document.getElementById("sig-canvas");
    var context                 = canvas.getContext("2d");
    canvas.width                = window.innerWidth
    canvas.height               = window.innerHeight  
    var middleOfScreenWidth     = canvas.width / 2 
    var middleOfScreenHeight    = canvas.height / 2 
    var maxWidth                = canvas.width * 0.9
    var maxHeight               = canvas.height * 0.9
    var initialDistance         = 30
    var distance                = initialDistance //distance between you and person chasing
    var scale;                  
    var duration                = 20 //countdown timer in seconds
    var tapCount                = 0;
    var start                   = false;
    var enemyContainer          = [];
    var img                     = new Image();
    img.src                     = "./img/G4_02_Shark_V2.png";
    Image.prototype.redraw      = function(){
        scale = 1 - (distance / 100)
        var scaleHeight = canvas.height * scale
        var scaleWidth = canvas.width * scale

        var ratios = calculateAspectRatioFit(img.width, img.height, scaleWidth, scaleHeight)
        var maxRatios = calculateAspectRatioFit(img.width, img.height, canvas.width, canvas.height)
        var paddingWidth = ratios.width /2
        var paddingHeight = ratios.height / 2
        context.drawImage(img, middleOfScreenWidth - paddingWidth, middleOfScreenHeight - paddingHeight, ratios.width, ratios.height); 
    }
   
    draw();

    canvas.addEventListener("touchstart", function (e) {  
        //increase distance by tapping
        distance = distance + 2
        tapCount++
    });

    function draw(){
        //img.redraw doesn't work, so fuck it drawEnemy
        drawEnemy()
        drawControls()
    }

    function drawControls(){
        var left = document.getElementById('leftTap');
        var right = document.getElementById('rightTap');

        var imgWidth = left.width / 2
        var padding = 50
        var paddingRight = canvas.width - imgWidth - padding
        context.drawImage(left, padding, canvas.height / 2, imgWidth, left.height/2);
        context.drawImage(right, paddingRight,  canvas.height / 2, imgWidth, right.height / 2);
    } 

    function drawEnemy(){
        var img = new Image();
        img.src = "./img/G4_02_Shark_V2.png";
        img.onload = function () {
            // context.drawImage(img, canvas.width/2 , canvas.height/3, img.width, img.height); 
            scale = 1 - (distance / 100)
            var scaleHeight = canvas.height * scale
            var scaleWidth = canvas.width * scale

            var ratios = calculateAspectRatioFit(img.width, img.height, scaleWidth, scaleHeight)
            var maxRatios = calculateAspectRatioFit(img.width, img.height, canvas.width, canvas.height)
            var paddingWidth = ratios.width /2
            var paddingHeight = ratios.height / 2
            context.drawImage(img, middleOfScreenWidth - paddingWidth, middleOfScreenHeight - paddingHeight, ratios.width, ratios.height);         
        }       
    } 

    function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        
        return { width: srcWidth*ratio, height: srcHeight*ratio };
    }
    
    function startCountdowns(duration){
        
        var timer = duration
        var myTimer = setInterval(function(){
            context.clearRect(0, 0, canvas.width, canvas.height);
            img.redraw();
            drawControls()
            scale = scale + 0.1

            //timer will go down every second
            timer--
            
            //distance will decrease every second
            if(distance > -30){
                distance = distance - (10/60)          
            }

            //distance = 0, you got caught, you lose
            if(distance <= -30){
                timer = duration
                // distance = initialDistance
                // alert("Caught, try again")
            }

            if(distance >= 90){
                // timer = duration
                // distance = initialDistance
                clearInterval(myTimer)
                endOverlay()
            }
        }, 1000/60)
    }

    $('#startButton').click(function(e){
        document.getElementById("explain-overlay").style.height = "0%";
        startCountdowns(duration);
    });

    function endOverlay(){
        document.getElementById("finish-overlay").style.height = "100%";              
    }

    $("#continueButton").click(function(){
        location.href  = "../14A.html"   
    });

    $(".home-button").click(function(){
        location.href  = "../../../index.html" 
    });

    $(".back-button").click(function(){
        location.href = "../13B.html"
    });

}