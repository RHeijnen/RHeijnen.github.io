window.onload = function() {
    var canvas                 = document.getElementById("sig-canvas");
    var context                = canvas.getContext("2d");
    canvas.width               = window.innerWidth;
    canvas.height              = window.innerHeight; 
    var thirdOfScreen          = parseInt((canvas.width /3).toFixed(0));
    var waitForAnim            = 0;
    var index                  = 10;
    var entityContainer        = [];
    var debugTextures          = true;
    var animSpeed              = 2;
    var colorColissionData;
    var simpleColissionMargins = 15;
    
    
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

    function colorColission(x,y,xSize,ySize){
        for(var x = 0; x < entityContainer.length;x++){
            for(var j = 0; j < entityContainer.length;j++){
                if(!entityContainer[x].colissionFreedom && !entityContainer[j].colissionFreedom){
                    if(entityContainer[x].id != entityContainer[j].id){
                        var element1_posX   = entityContainer[x].currentPOS_X;
                        var element1_posY   = entityContainer[x].currentPOS_Y;
                        var element1_width  = (entityContainer[x].d_width/2)-simpleColissionMargins;
                        var element1_height = (entityContainer[x].d_height/2)-simpleColissionMargins;
                        var element2_posX   = entityContainer[j].currentPOS_X;
                        var element2_posY   = entityContainer[j].currentPOS_Y;
                        var element2_width  = (entityContainer[j].d_width/2)-simpleColissionMargins;
                        var element2_height = (entityContainer[j].d_height/2)-simpleColissionMargins;
                        if(debugTextures){
                            context.fillRect(element1_posX-element1_width,element1_posY - element1_height,element1_width*2,element1_height*2);                            
                        }
                        var pixelData = context.getImageData(element1_posX-element1_width, element1_posY - element1_height, element1_width*2, element1_height*2);
                        var pix = pixelData.data
                        for(var z = 0; z < pix.length;z++){
                            for(var i = 0 ; i <colorColissionData.length;i++){
                                if(pix[z][0] == colorColissionData[i][0] 
                                && pix[z][1] == colorColissionData[i][1]
                                && pix[z][2] == colorColissionData[i][2]
                                && pix[z][3] == colorColissionData[i][3]){
                                    entityContainer[i].colided = true;                                       
                                }
                            }
                        }
                        // console.log(pix);
                    }
                }
            }                
        }
        // var xlength = xSize || 1
        // var ylength = ySize || 1
        // var imgd = context.getImageData(x, y, xlength, ylength);
        // var pix = imgd.data;
        // for(var i = 0 ; i <colorColissionData.length;i++){
        //     if(pix[0] == colorColissionData[i][0] 
        //     && pix[1] == colorColissionData[i][1]
        //     && pix[2] == colorColissionData[i][2]
        //     && pix[3] == colorColissionData[i][3]){
                
        //     }
        // }
        
        // for(var i = 0 ;i < pix.length;i++){
        //     console.log(pix[i])
        // }
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
            this.currentPOS_X = this.currentPOS_X+2       
        }

    }
    function moveE(){
        // this.currentPOS_X++
        if(this.currentPOS_X <= 0){
            this.currentPOS_X = canvas.width;
        }else{
            this.currentPOS_X = this.currentPOS_X-3         
        }
    }
    function moveB(){
        // this.currentPOS_X++
        if(this.currentPOS_X == 0){
            this.currentPOS_X = canvas.width;
        }else{
            this.currentPOS_X = this.currentPOS_X-1         
        }
    }
    function moveC(){
        if(this.currentPOS_Y < 0){
            this.currentPOS_Y = canvas.height-1;
        }else{
            this.currentPOS_Y = this.currentPOS_Y-1         
        }
    }
    function moveD(){
        if(this.currentPOS_Y == canvas.height){
            this.currentPOS_Y = 0;
        }else{
            this.currentPOS_Y = this.currentPOS_Y+1        
        }
    }
    

    function setUp(){
        createEntity('0',0,375,moveA,"./dory.png")
        createEntity('1',0,150,moveA,"./dory.png")
        createEntity('2',0,350,moveB,"./dory.png")        
        createEntity('8',0,490,moveB,"./dory.png")        
        createEntity('3',canvas.width/2,canvas.height,moveC,"./dory.png")
        createEntity('4',canvas.width/2 - 300,0,moveD,"./dory.png")
        createEntity('5',canvas.width/2 - 100,0,moveD,"./dory.png")
        createEntity('6',canvas.width/2 + 100,0,moveD,"./dory.png")
        createEntity('7',canvas.width/2 + 350,0,moveD,"./dory.png")
        createEntity('71',0,800,moveE,"./dory.png")
        
        colorColissionData = [
            [[0],[0],[0],[255]]
        ]
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