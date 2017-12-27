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
    
    var cloneContainer = function(_id){
        var newContainer = []
        for(var i = 0; i < entityContainer.length; i ++){
            if(!entityContainer[i].id == _id){
                newContainer.push(entityContainer[i])
            }
        }
        return newContainer
    }
    var createEntity  = function(_id,_startPos){
        var entity = {
            id         : _id,
            startPos   : _startPos,
            currPos    : _startPos,
            hitPoints  : 0,
            resetPos   : function(){this.currPos.x = this.startPos.x;},
            delete     : function(){entityContainer = cloneContainer(this.id)}, // needs overwritten
            setPos     : function(x,y){this.currPos.x = x;this.currPos.y = y},
            move       : function(){},
        }
        return entity
    }
    entityContainer.push(createEntity(0,{x:1,y:2}))
    entityContainer.push(createEntity(1,{x:2,y:3}))

    console.log(entityContainer)

    entityContainer[0].setPos(5,5);

    console.log(entityContainer[0])

    entityContainer[0].resetPos();
    console.log(entityContainer[0].startPos)
    
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();


    function testDrawing(){
        context.beginPath();        
        context.rect(index,index,5,5);
        index = index + 10;
        context.stroke();  
        if( index > 200){
            index = 20;
        } 
    }
    function draw(){

    }
    function animate(canvas, context, startTime) {
        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        // update
        var time = (new Date()).getTime() - startTime;
        var linearSpeed = 100;
        // redraw
        testDrawing();
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


    function coordLocations(key,x,y){
        var coordObject

    }
      
    // wait one second before starting animation
    setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(canvas, context, startTime);
    }, waitForAnim);


}