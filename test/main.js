// Thanks to these people
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
// https://stackoverflow.com/questions/3008635/html5-canvas-element-multiple-layers
// https://www.createjs.com/docs/easeljs/classes/SpriteSheet.html
//
//
//
//
//
//
//
$( document ).ready(function() {
    var soundPlaying = true;
    var stage;
    var assetObjects = [];
    window.customDebugObject = [];
    var mappedLayers = [];
    
    // setup canvas
    setupCanvas();
    // some reason this works better than createjs find on name
    function removeChildFromLayer(child,layer){
        updateLayerTracking();
        for(var i = 0; i < mappedLayers.length;i++){
            if(mappedLayers[i].name == child){
                layer.removeChildAt(i);
                updateLayerTracking();
                return "Job Done"
            }
        }
        return "Did not find the child: "+child
    }
    function clearCanvas(layer){
        layer.removeAllChildren()
    }
    function updateLayerTracking(){
        mappedLayers = [];
        for(var i = 0; i < stage.children.length;i++){
            mappedLayers.push({
                name: stage.children[i].name,
                index: i
            })
        }
    }

    function loadSpriteSheets(){

        /* example of how to chain animations
            var data = {
                images: ["sprites.jpg"],
                frames: {width:50, height:50},
                animations: {
                    stand:0,  < idle
                    run:[1,5], < run
                    jump:[6,8,"run"] < jump back into run
                }
            };
        */ 

        var starfox = {
            images: ["./resources/images/protoanimation1/starfoxdiag-export.png"],
            frames: {width:28*2, height:33*2},
            animations: {
                go: {
                 frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                 speed: 0.4   
                }
            },
            posX : 84,
            posY : 144,
            framerate: 1,
            //hightlight : "./resources/images/protoanimation1/starfox.png",
            name : "tv"
        }; 

        // var hobbies = {
        //     images: ["./resources/images/protoanimation1/hobbies.png"],
        //     frames: {width:91*2, height:40*2},
        //     animations: {
        //         go: {
        //          frames: [0],  
        //         }
        //     },
        //     posX : 10,
        //     posY : 62,
        //     click: "hobbies"

        // };
        // var skills = {
        //     images: ["./resources/images/protoanimation1/skills.png"],
        //     frames: {width:69*2, height:36*2},
        //     animations: {
        //         go: {
        //          frames: [0],  
        //         }
        //     },
        //     posX : 320,
        //     posY : 80,
        //     click: "skills"

        // };
        var about = {
            images: ["./resources/images/protoanimation1/aboutbtn.png"],
            frames: {width:134, height:64},
            animations: {
                go: {
                 frames: [0],  
                }
            },
            posX : 166,
            posY : 390,
            click: "about",
            name: "about"
        };
        var pc = {
            images: ["./resources/images/protoanimation1/pc.png"],
            frames: {width:24*2, height:33*2},
            animations: {
                go: {
                 frames: [0,1,2,3,4,5,6,7,8,9,10,11,11,10,9,8,7,6,5,4,3,2,1,0],
                 speed: 0.4 
                }
            },
            posX : 366,
            posY : 140,
            framerate: 1,
            name: "pc"
        };

        assetObjects.push(starfox)
        assetObjects.push(pc)
        assetObjects.push(about)
        // assetObjects.push(skills)
        // assetObjects.push(hobbies)
    }
    function setupMenuCovering(item){
        // TODO remove other content
        // removeChildFromLayer("background",stage)
        // removeChildFromLayer("tv",stage)
        // removeChildFromLayer("pc",stage)
        // removeChildFromLayer("about_general",stage)
        clearCanvas(stage);

        var buttonContainer = [
            {
                name: "skills",
                bitmap: "./resources/images/protoanimation1/skillsbtn.png",
                bitmapActive: "./resources/images/protoanimation1/skillsbtnactive.png",
                content: [
                    {
                        name: "skillscontent",
                        animated: false,
                        bitmap: "./resources/images/protoanimation1/skillscontent.png",
                        posX: 0,
                        posY: 0
                    },{
                        name: "skillsanim1",
                        animated: true,
                        posX:354,
                        posY: 40,
                        animation: {
                            images: ["./resources/images/protoanimation1/skillsanim.png"],
                            frames: {width:81, height:227},
                            animations: {
                                go: {
                                 frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],
                                 speed: 0.7 , 
                                 next: false
                                }
                            },
                            framerate: 2,
                        }
                        
                    }
                ],
                posX: 0,
                posY: 28
            },
            {
                name: "about",
                bitmap: "./resources/images/protoanimation1/aboutbtn.png",
                bitmapActive: "./resources/images/protoanimation1/aboutbtnactive.png",
                content: [
                    {
                        name: "aboutcontent",
                        animated: false,
                        bitmap: "./resources/images/protoanimation1/aboutcontent.png",
                        posX: 0,
                        posY: 0
                    },
                    {
                        name: "resumebtn",
                        animated: false,
                        bitmap: "./resources/images/protoanimation1/resumebtn.png",
                        posX: 236,
                        posY: 170,
                        onclick : "resume"
                    },
                    {
                        name: "linkedinBtn",
                        animated: false,
                        bitmap: "./resources/images/protoanimation1/linkedinbtn.png",
                        posX: 236,
                        posY: 220,
                        onclick : "linkedin"
                        
                    }
                ],
                posX: 0,
                posY: 128
            },
            {
                name: "hobbies",
                bitmap: "./resources/images/protoanimation1/hobbies.png",
                bitmapActive: "./resources/images/protoanimation1/hobbiesactive.png",
                content: [
                    {
                        name: "hobbiescontent",
                        animated: false,
                        bitmap: "./resources/images/protoanimation1/hobbiescontent.png",
                        posX: 0,
                        posY: 0
                    }
                ],
                posX: 0,
                posY: 228
            }
        ]
        var menucover = new createjs.Bitmap("./resources/images/protoanimation1/menubase-export.png");
        menucover.name = "menucover"
        var closebtn = new createjs.Bitmap("./resources/images/protoanimation1/closebtn.png");
        closebtn.name = "closebtn"
        closebtn.x = 428
        closebtn.addEventListener("click", function(e) {
            clearCanvas(stage);
            setupCanvas()
        });
        stage.addChild(menucover);
        stage.addChild(closebtn)
        for(var i = 0; i < buttonContainer.length;i++){
            var bitmap;
            var activeContent = false;
            if(item == buttonContainer[i].name){
                bitmap = buttonContainer[i].bitmapActive
                activeContent = true;
            }else{
                bitmap = buttonContainer[i].bitmap
            }
            var button = new createjs.Bitmap(bitmap);
            button.x = buttonContainer[i].posX;
            button.y = buttonContainer[i].posY;
            button.name = buttonContainer[i].name
            button.addEventListener("click", function(e) {
                clearCanvas(stage);
                setupMenuCovering(e.target.name)
            });
            stage.addChild(button)
            if(activeContent){
                for(var x = 0; x <buttonContainer[i].content.length;x++){
                    var contentItem = buttonContainer[i].content[x];
                    if(contentItem.animated){
                        var spriteSheet = new createjs.SpriteSheet(contentItem.animation);
                        var contentObject = new createjs.Sprite(spriteSheet, "go");
                    }else{
                        var contentObject = new createjs.Bitmap(contentItem.bitmap);
                    }
                    if(contentItem.onclick){
                        contentObject.addEventListener("click", function(e) {
                            window.location.href = "./wip.html" 
                        });
                    }
                    contentObject.x = contentItem.posX
                    contentObject.y = contentItem.posY
                    contentObject.name = contentItem.name
                    stage.addChild(contentObject)
                }
            }
            
        }
    }

    

$( window ).resize(function() {
    clearCanvas(stage)
    setupCanvas()
});

    function tweenitup(){
        // TweenJS
    }
    function calcResize(original,max){
        return max / original;

    }
    function calcStageSize(ori_x,ori_y,max_x,max_y){
        var possibleX = (max_x / ori_x).toFixed(1);
        var possibleY = (max_y / ori_y).toFixed(1);
        if(possibleX == possibleY){
            return possibleY
        }else{
            if(possibleX > possibleY){
                return possibleY
            }else{
                return possibleX;
            }
        }
        // return the size of the canvas that fits in the screen, but correctly ratio'd
        // should make this work correctly some day
    }
    function setupCanvas(){
        //loadSpriteSheets()
        stage = new createjs.Stage("w");
        //stage.enableMouseOver(20); 
        var background = new createjs.Bitmap("testbg.png"); 
        background.name = "background"  
        var maxPossibleResize = calcStageSize(background.image.width,background.image.height,window.innerWidth,window.innerHeight)
        var calcMax_X = 320*maxPossibleResize;
        var calcMax_Y = 240*maxPossibleResize;
        $("canvas").css("width",calcMax_X +"px");
        $("canvas").css("height",calcMax_Y +"px");
        // set canvas size - CSS for pixel density (?)
        stage.addChild(background);
        var player = {
            images: ["./proto_idle.png"],
            frames: {width:15, height:48},
            animations: {
                go: {
                 frames: [0,1,2,3],
                 speed: 0.1  
                }
            },
            posX : 108,
            posY : 160,
            framerate: 1,
            //hightlight : "./resources/images/protoanimation1/starfox.png",
            name : "player"
        }; 
        var creature = {
            images: ["./slime_creature.png"],
            frames: {width:58, height:37},
            animations: {
                go: {
                 frames: [0,0,0,0,1,0,0,0,],
                 speed: 0.1   
                }
            },
            posX : 208,
            posY : 172,
            framerate: 1,
            //hightlight : "./resources/images/protoanimation1/starfox.png",
            name : "tv"
        }; 


        var spriteSheetPlayer = new createjs.SpriteSheet(player);
        var contentObjectPlayer = new createjs.Sprite(spriteSheetPlayer, "go");
        contentObjectPlayer.x = player.posX
        contentObjectPlayer.y = player.posY
        stage.addChild(contentObjectPlayer);
        var spriteSheetSlime = new createjs.SpriteSheet(creature);
        var contentObjectSlime = new createjs.Sprite(spriteSheetSlime, "go");
        contentObjectSlime.x = creature.posX
        contentObjectSlime.y = creature.posY
        stage.addChild(contentObjectSlime);
        // init draw workaround
        // not required anymore but cant hurt
        createjs.Ticker.addEventListener("tick", handleTick);
        function handleTick(event) {
            stage.update();
            this.removeEventListener("tick",this)
        }
    }

    function windowResizeCheck(){

    }

    function toggleSound(){
        soundPlaying = !soundPlaying;
        if(soundPlaying){

        }else{

        }
    }

});