window.addEventListener('load', function(){ // on page load
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight   
    var initialDistance = 5
    var distance = initialDistance //distance between you and person chasing
    var duration = 20 //countdown timer in seconds
    var tapCount = 0;
    startCountdowns(duration)

    canvas.addEventListener("touchstart", function (e) {  
        //increase distance by tapping
        distance++
        tapCount++
        console.log("tap")
    });

    function startCountdowns(duration){
        var timer = duration
        setInterval(function(){
            //timer will go down every second
            timer--
            console.log(timer + " seconds left")
            
            //distance will decrease every second
            distance--
            console.log(distance)

            //timeer reaches 0, you win
            if(timer == 0){
                timer = duration
                distance = initialDistance
                alert("Winner")
            }

            if(tapCount >= 30){  
                alert("Escapedr")
                tapCount = 0 //reset, moet wat anders worden
            }

            //distance = 0, you got caught, you lose
            if(distance == 0){
                timer = duration
                distance = initialDistance
                alert("Caught, try again")
            }
        }, 1000)
    }
}, false)