window.onload = function() {
    var canvas          = document.getElementById("sig-canvas");
    var ctx             = canvas.getContext("2d");
    var playerPosIndex  = 2;    
    var playerLocHeight = 0;
    var playerLocWidth  = 0;
    var enabled = true;
    canvas.width        = window.innerWidth;
    canvas.height       = window.innerHeight; 
    var thirdOfScreen   = parseInt((canvas.width /3).toFixed(0));
    // set spawn points
    var sp1 =  parseInt((thirdOfScreen/2).toFixed(0));
    var sp2 =  parseInt(sp1 + thirdOfScreen);
    var sp3 =  parseInt(sp2 + thirdOfScreen);


    // player 
    var playerLocations = [
        {x:sp1, y:canvas.height+350},
        {x:sp2, y:canvas.height+350},
        {x:sp3, y:canvas.height+350},
    ]
    
    // Get the position of the mouse relative to the canvas
    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }
    // Draw lines on canvas
    function drawLineOnCanvas(startX,startY,endX,endY){

        ctx.beginPath();
        ctx.scale(1,1);            

        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
    }
    // Draw rec on canvas
    function drawRecOnCanvas(startX,startY,pixel_width,pixel_height){
        ctx.beginPath();        
        ctx.rect(startX,startY,pixel_width,pixel_height);
        ctx.stroke();        
    }
    // draw enemy on canvasss
    function drawEnemyOnCanvas(){

    }
    // draw player on canvas
    function drawPlayerOnCanvas(startX,startY){
        // clearRect(playerLocWidth,playerLocHeight)
        drawing = new Image();
        drawing.onload = function(){
            if(enabled){    // scale failsafe
                ctx.scale(0.4,0.4);                            
                enabled = false;
            }
            ctx.drawImage(drawing,startX,startY);
            playerLocWidth = this.width
            playerLocHeight = this.height
        }
        drawing.src = "./test.png"; 
    }
    function clearRect(startX,startY){

    }

    document.onkeydown = checkKey;
    function movePlayer(direction){
        console.log("got directionshift: "+direction)
        console.log(playerLocations)
        if(direction == 'l'){
            // decrement
            if(playerPosIndex == 0){
                playerPosIndex = 2;
            }else{
                playerPosIndex = playerPosIndex -1;
            }
        }else{
            // increment
            if(playerPosIndex == 2){
                playerPosIndex = 0;
            }else{
                playerPosIndex = playerPosIndex +1
            }
        }

        //and draw
        // drawPlayerOnCanvas(playerLocations[playerPosIndex].x,playerLocations[playerPosIndex].y);

    }
    function checkKey(e) {
        e = e || window.event;
        if (e.keyCode == '37') {
           // left arrow
            movePlayer('l');
        }else if (e.keyCode == '39') {
           // right arrow
           movePlayer('r');
        }
    }


    // set borders
    drawLineOnCanvas(thirdOfScreen,0,thirdOfScreen,canvas.height)
    drawLineOnCanvas(thirdOfScreen*2,0,thirdOfScreen*2,canvas.height)


    // draw temp spawn points ( allignment checking )
    drawRecOnCanvas(sp1,20,5,5)
    drawRecOnCanvas(sp2,20,5,5)
    drawRecOnCanvas(sp3,20,5,5)

    // draw initial player location
    // drawPlayerOnCanvas(playerLocations[playerPosIndex].x,playerLocations[playerPosIndex].y);
    drawRecOnCanvas(playerLocations[playerPosIndex].x,canvas.height,5,5)
    


}