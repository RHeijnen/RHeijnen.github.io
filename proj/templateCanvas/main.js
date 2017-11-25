'use strict'
window.onload = function() {
    var canvas          = document.getElementById("sig-canvas");
    var context         = canvas.getContext("2d");
    canvas.width        = window.innerWidth;
    canvas.height       = window.innerHeight; 
    var thirdOfScreen   = parseInt((canvas.width /3).toFixed(0));
    var waitForAnim     = 0;
    var index           = 10;
    var entityContainer = [];
    var debugTextures   = true;
    var animSpeed       = 4;
    
    
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();


    function createEntity(_id,_startX,_startY,moveFunc,_texture){
        entityContainer.push( {
            id          : _id,
            startPOS_X  : _startX,
            startPOS_Y  : _startY,
            currentPOS_X: _startX,
            currentPOS_Y: _startY,
            d_width     : 0,
            d_height    : 0,
            hitpoints   : 1,
            colissionFreedom : false,
            colided     : false,
            move        : moveFunc,
            texture     : new Image(),
            drawTexture : function(itt){
                this.texture.src        = _texture;
                this.texture.posX       = this.currentPOS_X;
                this.texture.posY       = this.currentPOS_Y;
                this.texture.entityID   = itt;
                this.texture.onload = function(){
                    entityContainer[this.entityID].d_width = this.width;
                    entityContainer[this.entityID].d_height = this.height;
                    // in order to start drawing from the middle of an image, instead of the top corner,
                    // we /2 the length and width and reduce that from the requested starting co-ords
                    context.drawImage(this,this.posX - this.width/2,this.posY - this.height/2); 
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
                        if((entityContainer[i].currentPOS_X + entityContainer[i].d_width/2) == (entityContainer[j].currentPOS_X - entityContainer[j].d_width/2)
                        || (entityContainer[i].currentPOS_X - entityContainer[i].d_width/2) == (entityContainer[j].currentPOS_X + entityContainer[j].d_width/2)){
                            entityContainer[i].colided = true;
                        }
                    }
                }
            }
        }
    }
    function movePlayer(){
        // this.currentPOS_X++
        if(this.currentPOS_X > canvas.width){
            this.currentPOS_X = 0;
        }else{
            this.currentPOS_X = this.currentPOS_X+5         
        }
        if(this.currentPOS_Y > canvas.height){
            this.currentPOS_Y = 0;            
        }else{
            this.currentPOS_Y = this.currentPOS_Y+5
        }
    }
    function moveA(){
        // this.currentPOS_X++
        if(this.currentPOS_X > canvas.width){
            this.currentPOS_X = 0;
        }else{
            this.currentPOS_X = this.currentPOS_X+1        
        }

    }
    function moveB(){
        // this.currentPOS_X++
        if(this.currentPOS_X < 0){
            this.currentPOS_X = canvas.width;
        }else{
            this.currentPOS_X = this.currentPOS_X-1         
        }
    }

    function setUp(){
        createEntity('aap',0,canvas.height/2,moveA,"./test.png")
        createEntity('vogel',canvas.width,canvas.height/2,moveB,"./dory.png")
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
        for(var x = 0; x < animSpeed; x ++){
            // check for colissions
            simpleColission();  

            for(var i = 0; i < entityContainer.length;i++){
                if(entityContainer[i].colided){
                    entityContainer[i].currentPOS_X = entityContainer[i].startPOS_X
                    entityContainer[i].colided = false;
                }
                entityContainer[i].move();
                entityContainer[i].drawTexture(i);
            }
            // setup roster for texture debugging (helps with colission checking)
            if(debugTextures){
                // do it after so we layer it ontop of the entities
                for(var i = 0; i < entityContainer.length;i++){
                    debugTexturesFunc(i);
                }
            }
        }

    }

    function animate(canvas, context, startTime) {
        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
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


}