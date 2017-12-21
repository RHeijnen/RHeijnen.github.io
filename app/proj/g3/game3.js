window.addEventListener('load', function(){ // on page load
    var direction = 'r'
    var canvas = new fabric.Canvas('sig-canvas');
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    canvas.selection = false; // disable group selection
    var entityContainer = [];
    var hookCoords = [[75,100],[200,75],[300,200],[400,300],[200,300],[100,300],[350,50],[450,125],[525,150]];
    

    var touchPoints = [];
    var touchInitiated  = false;
    var touchCounter    = 0;
    var prevX;
    var prevY;
    canvas.on({
      'touch:drag': function(e) {
        if(e.e.changedTouches!= undefined ){
          var x = -e.e.changedTouches[0].clientX;
          var y = -e.e.changedTouches[0].clientY;
          if(!touchInitiated){
            touchPoints.push([x,y])
            touchInitiated = true;
            prevX = x;
            prevY = y;
          }
          if(touchInitiated){
            if(
              (touchPoints[touchCounter][0] - x) > 15  ||
              (touchPoints[touchCounter][1] - y) > 15  ||
              (touchPoints[touchCounter][0] - x) > -15 ||
              (touchPoints[touchCounter][1] - y) > -15)
              
              {
             touchPoints.push([x,y])
             touchCounter = touchCounter +1;
             var testline = new fabric.Line([-prevX, -prevY, -x, -y], {
               strokeDashArray: [5, 5],
               stroke: 'black',
               selectable :false
             });
             canvas.add(testline)
             prevX = x;
             prevY = y;
             onChange(testline)
             
            }
          }
        }
      },
    });
    canvas.on({
      'touch:stop': function() {

      },

    });
      
    function canvasReset(){
      canvas.clear(); 
      touchPoints = [] 
      touchCounter = 0;
      touchInitiated = false;

      canvas.setBackgroundImage('Background-hooks.jpg', canvas.renderAll.bind(canvas), {
        backgroundImageOpacity: 0.5,
        backgroundImageStretch: false
      });
      
    
      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[0][0];
        oImg.top  = hookCoords[0][1];
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[0][1],15)
      });

      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[1][0];
        oImg.top  = hookCoords[1][1]
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[1][1],35)
      });

      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[2][0];
        oImg.top  = hookCoords[2][1]
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[2][1],60)
      });
      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[3][0];
        oImg.top  = hookCoords[3][1]
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[3][1],150)
      });
      
      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[4][0];
        oImg.top  = hookCoords[4][1]
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[4][1],250)
      });

      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[5][0];
        oImg.top  = hookCoords[5][1]
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[5][1],500)
      });
      
      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[6][0];
        oImg.top  = hookCoords[6][1]
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[6][1],500)
      });
      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[7][0];
        oImg.top  = hookCoords[7][1]
        oImg.selectable = false;
        canvas.add(oImg);
        animate(oImg,hookCoords[7][1],250)
      });
      fabric.Image.fromURL('fishing-hook.png', function(oImg) {
        oImg.left = hookCoords[8][0];
        oImg.top  = hookCoords[8][1]
        oImg.selectable = false;      
        canvas.add(oImg);
        animate(oImg,hookCoords[8][1],4000)
      });
  
    }
    canvasReset();
    function onChange(baseline) {
      // options.target.setCoords();
      canvas.forEachObject(function(obj) {
        if(!obj.stroke){ // checks if object contains .stroke -> img objects do not have it, so we skip the lines
          if(baseline.intersectsWithObject(obj)){
            canvas.forEachObject(function(obj){
              if(obj.stroke){
                  // shake mobile
                  location.reload();
              } 
            });
            obj.set('opacity' ,baseline.intersectsWithObject(obj) ? 0.5 : 1);            
          }
        }
      });
    }

    function animate(element,originalY,timeout){
      setTimeout(function(){ 
        element.animate('top', element.top === originalY ? originalY-20 : originalY, {
          duration: 4000,
          onChange: canvas.renderAll.bind(canvas),
          onComplete: function() {
            animate(element,originalY);
          },
          easing: fabric.util.ease.easeInOutCubic
        });
      }, timeout);
    // Get the position of a touch relative to the canvas
    function getTouchPos(canvasDom, touchEvent) {
      var rect = canvasDom.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
      };
    }








// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
    
  }
  
}, false);


document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
  if(touchPoints[0] != undefined){
    if(-touchPoints[touchPoints.length-1][0] < 300){
      // console.log(touchPoints[touchPoints.length-1][0])
      location.reload();
    }else{
      //winstate
    }
  }
  
}, false);


document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

    


      // element.animate('top', element.top === originalY ? originalY-20 : originalY, {
      //   duration: 4000,
      //   onChange: canvas.renderAll.bind(canvas),
      //   onComplete: function() {
      //     animate(element,originalY);
      //   },
      //   easing: fabric.util.ease.easeInOutCubic
      // });
    }

    $('#startButton').click(function(e){
      document.getElementById("explain-overlay").style.height = "0%";
    });

    function endOverlay(){
      document.getElementById("my-overlay").style.height = "100%";
    }

});