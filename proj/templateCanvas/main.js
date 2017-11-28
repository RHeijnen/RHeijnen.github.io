window.onload = function() {
    var canvas          = document.getElementById("sig-canvas");
    var context         = canvas.getContext("2d");
    canvas.width        = window.innerWidth;
    canvas.height       = window.innerHeight; 
    var thirdOfScreen   = parseInt((canvas.width /3).toFixed(0));
    var waitForAnim     = 0;
    var index           = 10;
    var entityContainer = [];
    var debugTextures   = false;
    var animSpeed       = 8;
    
    
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
                    if(this.entityID == 0){
                        if(this.width == 586){
                            console.log("ohoh")
                        }
                    }
                }
                this.texture.onload();
            },

        })
    }

    function boxColission(){
        this.initialize = function() {}

        this.hitTest = function( source, target ) {
            var hit = false;
            var start = new Date().getTime();
    
            if( this.boxHitTest( source, target ) ) {
                if( this.pixelHitTest( source, target ) ) {
                    hit = true;
                }
            }
            var end = new Date().getTime();

            if( hit == true ){
                console.log( 'detection took: ' + (end - start) + 'ms' );
            }    
            return hit;
        }
        this.boxHitTest = function( source, target ) {
            return !( 
                ( ( source.y + source.height ) < ( target.y ) ) ||
                ( source.y > ( target.y + target.height ) ) ||
                ( ( source.x + source.width ) < target.x ) ||
                ( source.x > ( target.x + target.width ) ) 
            );
        }
        this.pixelHitTest = function( source, target ) {
                var top = parseInt( Math.max( source.y, target.y ) );
                var bottom = parseInt( Math.min(source.y+source.height, target.y+target.height) );
                var left = parseInt( Math.max(source.x, target.x) );
                var right = parseInt( Math.min(source.x+source.width, target.x+target.width) );
    
                for (var y = top; y < bottom; y++)
                {
                    for (var x = left; x < right; x++)
                    {
                        var pixel1 = source.pixelMap.data[ (x - source.x) +"_"+ (y - source.y) ];
                        var pixel2 = target.pixelMap.data[ (x - target.x) +"_"+ (y - target.y) ];
    
                        if( !pixel1 || !pixel2 ) {
                            continue;
                        };
                        
                        if (pixel1.pixelData[3] == 255 && pixel2.pixelData[3] == 255)
                        {
                            return true;
                        }
                    }
                }
    
                return false;
        }
        this.buildPixelMap = function( source ) {
            var resolution = 1;
            var ctx = source.getContext("2d");
            var pixelMap = [];
    
            for( var y = 0; y < source.height; y++) {
                for( var x = 0; x < source.width; x++ ) {
                    var dataRowColOffset = y+"_"+x;//((y * source.width) + x);
                    var pixel = ctx.getImageData(x,y,resolution,resolution);
                    var pixelData = pixel.data;
    
                    pixelMap[dataRowColOffset] = { x:x, y:y, pixelData: pixelData };
    
                }
            }
            return {
                data: pixelMap,
                resolution: resolution
            };
        }
        // Initialize the collider
        this.initialize();
    
        // Return our outward facing interface.
        return {
            hitTest: this.hitTest.bind( this ),
            buildPixelMap: this.buildPixelMap.bind( this )
        };

    }
    function simpleColission(){
        var entityIDContainer = [];
        for(var i = 0; i < entityContainer.length;i++){
            for(var j = 0; j < entityContainer.length;j++){
                if(!entityContainer[i].colissionFreedom && !entityContainer[j].colissionFreedom){
                    if(entityContainer[i].id != entityContainer[j].id){
                        var element1_posX   = entityContainer[i].currentPOS_X;
                        var element1_posY   = entityContainer[i].currentPOS_Y;
                        var element1_width  = entityContainer[i].d_width/2+30;
                        var element1_height = entityContainer[i].d_height/2+30;
                        var element2_posX   = entityContainer[j].currentPOS_X;
                        var element2_posY   = entityContainer[j].currentPOS_Y;
                        var element2_width  = entityContainer[j].d_width/2+30;
                        var element2_height = entityContainer[j].d_height/2+30;
                        var x_col1          = (element1_posX + element1_width/2) == (element2_posX - element2_width/2)   || (element1_posX + element1_width/2)  - (element2_posX - element2_width/2)   == -1;
                        var x_col2          = (element1_posX - element1_width/2) == (element2_posX + element2_width/2)   || (element1_posX - element1_width/2)  - (element2_posX + element2_width/2)   == +1;
                        var y_col1          = (element1_posY + element1_height/2) == (element2_posY - element2_height/2) || (element1_posY + element1_height/2) - (element2_posY - element2_height/2)  == -1;
                        var y_col2          = (element1_posY - element1_height/2) == (element2_posY + element2_height/2) || (element1_posY - element1_height/2) - (element2_posY + element2_height/2)  == +1;
                            // if colission on X    or on the Y 
                        // if( (x_col1  ||  x_col2) || (y_col1 || y_col2) ){
                        //     entityContainer[i].colided = true;
                        // }

                        // if(x_col1 && y_col1 || x_col1 && y_col2){
                        //     entityContainer[i].colided = true;
                        // }

                        // if(x_col2 && y_col1 || x_col2 && y_col2){
                        //     entityContainer[i].colided = true;
                        // }


                        if(    element1_posX < element2_posX + element2_width 
                            && element1_posX + element1_width > element2_posX
                            && element1_posY < element2_posY + element2_height
                            && element1_posY + element1_height > element2_posY
                        ){
                            entityContainer[i].colided = true;
                            // console.log("colission")
                        }

                        // if( col1_check || col2_check || col3_check || col4_check){
                        //     console.log("collision")
                        //     entityContainer[i].colided = true;
                        // } 


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
        createEntity('aap',0,350,moveA,"./dory.png")
        createEntity('vogel',0,350,moveB,"./dory.png")        
        createEntity('aap',canvas.width/2,canvas.height,moveC,"./dory.png")
        createEntity('vogel',canvas.width/2 - 300,0,moveD,"./dory.png")
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