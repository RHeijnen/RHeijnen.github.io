window.onload = function() {
    var bubbleIMG      = "bubble.svg"
    var canvas         = document.getElementById("canvas");
    canvas.width       = window.innerWidth;
    canvas.height      = window.innerHeight;    
    var middle         = canvas.width/2;
    var stage          = new createjs.Stage("canvas");
    var dragRadius     = 40;
    var numberOfPoints = 10;

    var circleArr      = [];
    var dragArr        = [];
    
    createjs.Touch.enable(stage);
    
    function getRandomX(){
        var rng = Math.floor(Math.random() * canvas.width) + 1 
        console.log(rng)
        return rng
    }
    function getRandomY(){
        var rng = Math.floor(Math.random() * canvas.height) + 1  
        console.log(rng)
        return rng
    }
    for(var i = 0; i < numberOfPoints;i++){
        dragArr.push(new createjs.Container());
        // dragArr[i].setBounds(-50, -50, 80, 80);
        circleArr.push(new createjs.Shape());
        circleArr[i].graphics.beginFill("red").drawCircle(-50, -50, 50);
        circleArr[i].x = 50
        circleArr[i].y = 50
        stage.addChild(circleArr[i]);

        dragArr[i].addChild(circleArr[i]);
        dragArr[i].on("pressmove", function(evt){
            evt.currentTarget.x = evt.stageX;
            evt.currentTarget.y = evt.stageY;
            stage.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker   
        });
        dragArr[i].x = getRandomX();
        dragArr[i].y = getRandomY();
        stage.addChild(dragArr[i]);
        stage.update();
        
    }
    console.log(stage)




    
}