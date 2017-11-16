window.onload = function() {
    var bubbleIMG = "bubble.svg"
    // Get the canvas element form the page
    var canvas = document.getElementById("canvas");
    
    /* Rresize the canvas to occupy the full page, 
    by getting the widow width and height and setting it to canvas*/

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // var textField = document.getElementById("textstuffs")
    // textField.innerHTML = canvas.width + " " + canvas.height
    
    var middle = canvas.width/2;
    var stage = new createjs.Stage("canvas");
    circle = new createjs.Shape();
    createjs.Touch.enable(stage);
    
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);
    //Update stage will render next frame
    stage.update();

    circle.addEventListener("click", handleClick);
    function handleClick(event){

    }
    var dragger = new createjs.Container();    
    dragger.addChild(circle);
    //VARIABLES
    //Drag Object Size
    dragRadius = 40;
    //Destination Size
    destHeight = 100;
    destWidth = 100;

    dragger.setBounds(100, 100, dragRadius*2, dragRadius*2);
    //DragRadius * 2 because 2*r = width of the bounding box
    var label2 = new createjs.Text("HERE", "bold 14px Lato", "#000");
    label2.textAlign = "center";
    label2.x += 50;
    label2.y += 40;


//     function getOffset(distance){
//         console.log(distance)
//         console.log(middle)
//     };
//     function getRandomX(){
//         var rng = Math.floor(Math.random() * canvas.width) + 1 
//         console.log(rng)
//         return rng
//     }
//     function getRandomY(){
//         var rng = Math.floor(Math.random() * canvas.height) + 1  
//         console.log(rng)
//         return rng
//     }
//     var img1 = new Image();
//     var img2 = new Image();
//     var img3 = new Image();
//     var img4 = new Image();
//     var img5 = new Image();
//     var img6 = new Image();
//     var imgArr = [img1,img2,img3,img4,img5,img6]

//     for(var i = 0; i < imgArr.length;i++){
//         console.log(imgArr[i])
//         imgArr[i].onload = function() {
//             canvas.getContext('2d').drawImage(img1, getRandomX(), getRandomY());
//         }
//         imgArr[i].src = "bubble.svg"
//     }
//     var dragger = new createjs.Container();
    
    dragger.on("pressmove", function(evt){
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        stage.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker   
   });
   //Mouse UP and SNAP====================
dragger.on("pressup", function(evt) {
    if(intersect(evt.currentTarget, destination)){
      dragger.x = destination.x + destWidth/2;
      dragger.y = destination.y + destHeight/2;
      dragger.alpha = 1;
      box.graphics.clear();     
      box.graphics.setStrokeStyle(2).beginStroke("black").rect(0, 0, destHeight, destWidth);
      stage.update(evt);
    }
  });
    
//Adds the object into stage
stage.addChild(dragger);
stage.mouseMoveOutside = true;
stage.update();
    
    


    
}