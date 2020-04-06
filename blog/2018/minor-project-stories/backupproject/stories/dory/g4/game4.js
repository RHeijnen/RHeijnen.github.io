window.onload = function() {
    var canvas                  = document.getElementById("sig-canvas");
    var context                 = canvas.getContext("2d");
    canvas.width                = window.innerWidth;
    canvas.height               = window.innerHeight; 
    var middleOfScreen          = parseInt((canvas.width /2).toFixed(0));
    var thirdOfScreen           = parseInt((canvas.width /3).toFixed(0));
    var sixthOfScreen           = thirdOfScreen / 2;
    var playerPositionHeight    = canvas.height - 170
    var waitForAnim             = 0;
    var index                   = 10;
    var entityContainer         = [];
    var debugTextures           = false;
    var animSpeed               = 1;
    var movement                = 3;
    var colorColissionData;
    var simpleColissionMargins  = 0;
    var score                   = 0;
    var target                  = 5; //targetscore the player has to reach
    var playerPosition          = 1;
    var scaling                 = canvas.height / movement;
    var currentImgWidth         = 0;
    var currentImgHeight        = 0;
    var maxWidth                = 128;
    var maxHeight               = 114;
    var playerTargetPosition;
    var snappingSpeed           = 8;
    var running                 = true;
    var start                   = false;

    
    
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    var drawDebug = function(){
        context.beginPath();
        context.moveTo(thirdOfScreen, 0);
        context.lineTo(thirdOfScreen,canvas.height);
        context.moveTo(2 * thirdOfScreen, 0);
        context.lineTo(2 * thirdOfScreen,canvas.height);

        context.rect(sixthOfScreen, playerPositionHeight, 5, 5)
        context.rect(middleOfScreen, playerPositionHeight, 5, 5)
        context.rect(canvas.width - sixthOfScreen, playerPositionHeight, 5, 5)
        context.stroke();
    };

    function createEntity(_id,_startX,_startY,moveFunc,_texture, rescale, colissionFreedom){
        entityContainer.push( {
            id          : _id,
            startPOS_X  : _startX,
            startPOS_Y  : _startY,
            currentPOS_X: _startX,
            currentPOS_Y: _startY,
            d_width     : 0,
            d_height    : 0,
            hitpoints   : 1,
            colissionFreedom : colissionFreedom,
            colided     : false,
            move        : moveFunc,
            texture     : new Image(),
            drawTexture : function(itt){
                this.texture.src        = _texture;
                this.texture.posX       = this.currentPOS_X;
                this.texture.posY       = this.currentPOS_Y;
                this.texture.originalWidth;
                this.texture.originalHeight;
                this.texture.offset;
                this.texture.padding;
                this.texture.entityID   = itt;
                this.texture.onload = function(){
                    entityContainer[this.entityID].d_width = maxWidth;
                    entityContainer[this.entityID].d_height = maxHeight;

                    //starts small and keeps getting bigger untill it reaches it's original size
                    if(currentImgWidth <= entityContainer[this.entityID].d_width && currentImgHeight <= entityContainer[this.entityID].d_height){
                        currentImgWidth = currentImgWidth + (entityContainer[this.entityID].d_width / scaling) / 3;
                        currentImgHeight = currentImgHeight + (entityContainer[this.entityID].d_height / scaling) / 3;
                    }

                    this.originalWidth = this.width
                    this.originalHeight = this.height

                    this.padding = (this.originalWidth - currentImgWidth) / 2
                    // in order to start drawing from the middle of an image, instead of the top corner,
                    // we /2 the length and width and reduce that from the requested starting co-ords
                    if(rescale){
                        context.drawImage(this, this.posX - this.width/2 + this.padding,this.posY - this.height/2 + (this.originalHeight / 3), currentImgWidth, currentImgHeight);
                    }else{
                        context.drawImage(this,this.posX - this.width/2 + (maxWidth / 2),this.posY - this.height/2 + (maxHeight / 2), maxWidth, maxHeight);   
                        // context.drawImage(this,this.posX - this.width/2,this.posY - this.height/2, maxWidth, maxHeight);                        
                        
                    }
                }
                this.texture.onload();
            },

        })
    }

    function simpleColission(){
        var entityIDContainer = [];
        for(var i = 0; i < entityContainer.length;i++){
            for(var j = 0; j < entityContainer.length;j++){
                if(!entityContainer[i].colissionFreedom && !entityContainer[j].colissionFreedom){
                    if(entityContainer[i].id != entityContainer[j].id){
                        var element1_posX   = entityContainer[i].currentPOS_X;
                        var element1_posY   = entityContainer[i].currentPOS_Y;
                        var element1_width  = (entityContainer[i].d_width/2)-simpleColissionMargins;
                        var element1_height = (entityContainer[i].d_height/2)-simpleColissionMargins;
                        var element2_posX   = entityContainer[j].currentPOS_X;
                        var element2_posY   = entityContainer[j].currentPOS_Y;
                        var element2_width  = (entityContainer[j].d_width/2)-simpleColissionMargins;
                        var element2_height = (entityContainer[j].d_height/2)-simpleColissionMargins;

                        var x_col1          = (element1_posX + element1_width/2) == (element2_posX - element2_width/2)   || (element1_posX + element1_width/2)  - (element2_posX - element2_width/2)   == -1;
                        var x_col2          = (element1_posX - element1_width/2) == (element2_posX + element2_width/2)   || (element1_posX - element1_width/2)  - (element2_posX + element2_width/2)   == +1;
                        var y_col1          = (element1_posY + element1_height/2) == (element2_posY - element2_height/2) || (element1_posY + element1_height/2) - (element2_posY - element2_height/2)  == -1;
                        var y_col2          = (element1_posY - element1_height/2) == (element2_posY + element2_height/2) || (element1_posY - element1_height/2) - (element2_posY + element2_height/2)  == +1;
                        if(debugTextures){
                            context.fillRect(element1_posX-element1_width,element1_posY - element1_height,element1_width*2,element1_height*2);                            
                        }
                        
                        if(    element1_posX < element2_posX + (element2_width + element1_width) //element2_width*2 // x2 of (element2_width + element1_width) not sure..
                            && element1_posX + (element2_width + element1_width) > element2_posX
                            && element1_posY < element2_posY + (element1_height+element2_height)
                            && element1_posY + (element1_height+element2_height) > element2_posY
                        ){
                            entityContainer[i].colided = true;
                            playerPosition = 1;
                            resetScale()
                            entityContainer[0].move = blank
                            // console.log("next step")  
                        }
                    }
                }
            }
        }
    }

    function horizontalMovement(){
        var horizontal = thirdOfScreen
        var vertical = playerPositionHeight

        var val = vertical / horizontal
        var result = movement / val

        return result
    }

    function moveEnemyMiddle(){
        // this.currentPOS_X++

        if(this.currentPOS_Y > canvas.height){
            score++
            setScore();
            this.currentPOS_Y = 0;   
            this.move = determineMovement()   
            resetScale()      
        }else{
            this.currentPOS_Y = this.currentPOS_Y+ movement
        }
    }

    function moveEnemyLeft(){
        // this.currentPOS_X++
 
        if(this.currentPOS_X > canvas.width){
            this.currentPOS_X = middleOfScreen;
            this.currentPOS_Y = 0; 
        }else{
            this.currentPOS_X = this.currentPOS_X - horizontalMovement()    
        }
        if(this.currentPOS_Y >= canvas.height){
            score++
            setScore();
            this.currentPOS_X = middleOfScreen
            this.currentPOS_Y = 0
            this.move = determineMovement() 
            resetScale()       
        }else{
            this.currentPOS_Y = this.currentPOS_Y+ movement  
        }
    }

    function moveEnemyRight(){
        // this.currentPOS_X++
 
        if(this.currentPOS_X > canvas.width){
            this.currentPOS_X = middleOfScreen
            this.currentPOS_Y = 0
            this.move = determineMovement()
            resetScale()
        }else{
            this.currentPOS_X = this.currentPOS_X + horizontalMovement()        
        }
        if(this.currentPOS_Y >= canvas.height){
            score++  
            setScore();          
            this.currentPOS_X = middleOfScreen
            this.currentPOS_Y = 0
            this.move = determineMovement()   
            resetScale()
        }else{
            this.currentPOS_Y = this.currentPOS_Y+ movement
        }
    }
    
    function determineMovement(){
        //# between 0-2
        if(playerPosition == 0){
            return moveEnemyLeft
        } else if(playerPosition == 1){
            return moveEnemyMiddle
        } else if(playerPosition == 2){
            return moveEnemyRight
        } else{
            Console.log("wtf javascript")
        }
    }

    function movePlayerLeft(){
        if(this.currentPOS_X >= playerTargetPosition){
            this.currentPOS_X = this.currentPOS_X - snappingSpeed
        }
        if(this.currentPOS_X >= playerTargetPosition - 10 && this.currentPOS_X <= playerTargetPosition + 10){
            // console.log("target reached going left")
            this.move = blank
        }
    }

    function movePlayerRight(){
        if(this.currentPOS_X <= playerTargetPosition){
            this.currentPOS_X = this.currentPOS_X + snappingSpeed
        }
        // console.log("Target: " + playerTargetPosition + " current: " + this.currentPOS_X)
        if(this.currentPOS_X >= playerTargetPosition - 10 && this.currentPOS_X <= playerTargetPosition + 10){
            // console.log("target reached going right")            
            this.move = blank
        }
    }

    canvas.addEventListener("touchmove", function(e){
        if (e.target == canvas) {
            e.preventDefault();
        }
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
          entityContainer[0].currentPOS_X = touch.clientX-25;
          
        // console.log("touch x: " + touch.clientX)
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener("touchend", function(e){
        if (e.target == canvas) {
          e.preventDefault();
        }
        var position = entityContainer[0].currentPOS_X
        var mouseEvent = new MouseEvent("mouseup", {});
        if(position <= thirdOfScreen){
            playerPosition = 0
            playerTargetPosition = sixthOfScreen
            playerHasTarget = true
            snapHorizontally(entityContainer[0].currentPOS_X , sixthOfScreen)           
            
            // entityContainer[0].currentPOS_X = sixthOfScreen 
        } else if(thirdOfScreen < position  && position <= thirdOfScreen * 2){
            playerPosition = 1; 
            playerTargetPosition = middleOfScreen
            playerHasTarget = true
            snapHorizontally(entityContainer[0].currentPOS_X , middleOfScreen)           
            
            // entityContainer[0].currentPOS_X = middleOfScreen     
        } else{
            playerPosition = 2; 
            playerTargetPosition = canvas.width - sixthOfScreen
            playerHasTarget = true
            snapHorizontally(entityContainer[0].currentPOS_X , canvas.width - sixthOfScreen)           
            // entityContainer[0].currentPOS_X = canvas.width - sixthOfScreen 
        }
        canvas.dispatchEvent(mouseEvent);
    }, false);

    function snapHorizontally(currPos, targetPosition){
            if(currPos >= targetPosition){
                entityContainer[0].move = movePlayerLeft
            } else if(currPos <= targetPosition){
                entityContainer[0].move = movePlayerRight           
            } else {
                // console.log("no need to move")
            }
        
    }

    function blank(){

    }

    function resetScale(){
        currentImgWidth = 0;
        currentImgHeight = 0;
    }

    function checkStatus(){
        // console.log("Score: " + score)
        if(score == target){
            running = false;
            console.log("winner winner")
            endOverlay()
        }
    }

    function setUp(){
        // createEntity('2', middleOfScreen, playerPositionHeight, blank,"./img/G5_04_Oval.png", false, true)
        // createEntity('3', sixthOfScreen, playerPositionHeight, blank,"./img/G5_04_Oval.png", false, true)
        // createEntity('4', canvas.width - sixthOfScreen, playerPositionHeight, blank,"./img/G5_04_Oval.png", false, true)   

        createEntity('0', middleOfScreen, playerPositionHeight, blank,"./img/G5_02_Dory.png", false, false)
        createEntity('1', middleOfScreen, 0, moveEnemyMiddle,"./img/G5_01_School.png", true, false)
        
        

    }setUp(); // run once initialy to setup entities


    function debugTexturesFunc(itt){
        context.fillStyle="red";
        context.beginPath();                 
        context.moveTo(entityContainer[itt].currentPOS_X-entityContainer[itt].d_width/2,entityContainer[itt].currentPOS_Y);
        context.lineTo(entityContainer[itt].currentPOS_X+entityContainer[itt].d_width/2 ,entityContainer[itt].currentPOS_Y); 
        
        context.moveTo(entityContainer[itt].currentPOS_X,entityContainer[itt].currentPOS_Y-entityContainer[itt].d_height/2);
        context.lineTo(entityContainer[itt].currentPOS_X,entityContainer[itt].currentPOS_Y+entityContainer[itt].d_height/2);
        context.stroke();  
        context.fillRect(entityContainer[itt].currentPOS_X-2,entityContainer[itt].currentPOS_Y-2,4,4);
        
    }
    function draw(){
        // runs every 'animated itteration'
        if(running && start){
            for(var x = 0; x < animSpeed; x ++){
                             
                checkStatus();
                // check for colissions
                simpleColission()
                // colorColission();
                // console.log(boxColission())      
                //            
                for(var i = 0; i < entityContainer.length;i++){
                    if(entityContainer[i].colided){
                        entityContainer[i].currentPOS_Y = entityContainer[i].startPOS_Y
                        entityContainer[i].currentPOS_X = entityContainer[i].startPOS_X
                        entityContainer[i].colided = false;
                    }
                    entityContainer[i].move();
                    entityContainer[i].drawTexture(i);
                }
                // setup roster for texture debugging (helps with colission checking)
                if(debugTextures){
                    drawDebug();
                    // do it after so we layer it ontop of the entities
                    for(var i = 0; i < entityContainer.length;i++){
                        debugTexturesFunc(i);
                    }
                }
            }
        }       
    }

    function animate(canvas, context, startTime) {
        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // $("sig-canvas").css('background-color', 'red')
        // context.drawImage= ("./img/G5_03_BG.png", 0, 0)
        // update
        var time = (new Date()).getTime() - startTime;
        var linearSpeed = 100;
        // redraw
        draw();
        /*
            // move a pixel based on passed time..
            var newX = linearSpeed * time / 1000;
        */
        // request new frame
        requestAnimFrame(function() {
            animate( canvas, context, startTime);
        });
    }



      
    // wait {waitForAnim} ms before starting animation
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(canvas, context, startTime);
    }, waitForAnim);

    function endOverlay(){
        document.getElementById("finish-overlay").style.height = "100%";              
    }

    $("#continueButton").click(function(){
        location.href  = "../15.html" 
    });

    $(".home-button").click(function(){
        location.href  = "../../../index.html" 
    });

    $(".back-button").click(function(){
        location.href = "../14A.html"
    });

    function setScore(){
        $(".score-counter").text(score + "/" + target);
    } setScore();
   
    $('#startButton').click(function(e){
        document.getElementById("explain-overlay").style.height = "0%";
        start = true;
    });
    
}