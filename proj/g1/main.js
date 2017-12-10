window.addEventListener('load', function(){ // on page load
    var direction = 'r'
    var canvas = new fabric.Canvas('sig-canvas');
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    var canvasHeight = canvas.getHeight();
    var canvasWidth  = canvas.getWidth();
    canvas.selection = false; // disable group selection
    var entityContainer = [];
    var hookCoords = [[75,100],[600,150],[300,200],[500,300],[200,300],[100,300],[350,50],[450,125],[525,150]];
    var snap = 20; //Pixels to snap
    

    var touchPoints = [];
    var touchInitiated  = false;
    var touchCounter    = 0;
    var prevX;
    var prevY;

    canvas.on('object:moving', function (options) {
        if(!options.target.done){
            options.target.setCoords();
            // Don't allow objects off the canvas
            if(options.target.getLeft() < snap) {
                options.target.setLeft(0);
            }
            if(options.target.getTop() < snap) {
                options.target.setTop(0);
            }
            if((options.target.getWidth() + options.target.getLeft()) > (canvasWidth - snap)+150) {
                options.target.setLeft(canvasWidth - options.target.getWidth()+150);
            }
            if((options.target.getHeight() + options.target.getTop()) > (canvasHeight - snap)+150) {
                options.target.setTop(canvasHeight - options.target.getHeight()+150);
            }
            // comparisons

            //console.log(this.getActiveObject())
            var selected = options.target
            canvas.forEachObject(function(o){ 
                var elementInfo = o._element.currentSrc
                if(elementInfo.indexOf("dub") !== -1 && !o.done){
                    // console.log(o._element.currentSrc)
                    var shadowElement = o;
                    if(selected.intersectsWithObject(o)){
                        try{     
                            // options.target.setLeft(o.getLeft())
                            // options.target.setTop(o.getTop());
                            animate(options.target,o)
                            options.target.done = true;
                            o.done = true;
                        }catch(e){
                            console.log("catch:")
                            console.warn(e);
                        }
    
                    }
                    
                } 
            });
        }

    });
        
    var doneChecker = function(){
        var anwser = true;
        canvas.forEachObject(function(o){
            if(!o.done){
                anwser = false;
            } 
        });
        return anwser;        
    }

    fabric.Image.fromURL('bub.png', function(oImg) {
        oImg.left = hookCoords[0][0];
        oImg.top  = hookCoords[0][1];
        oImg.selectable = false;
        canvas.add(oImg);
        // animate(oImg,hookCoords[0][1],15)
        oImg.originX= 'center'
        oImg.originY= 'center'
        oImg.selectable= true
        oImg.hasControls= false
        oImg.hasBorders= false
    });
    fabric.Image.fromURL('bub.png', function(oImg) {
        oImg.left = hookCoords[1][0];
        oImg.top  = hookCoords[1][1];
        oImg.selectable = false;
        canvas.add(oImg);
        // animate(oImg,hookCoords[0][1],15)
        oImg.originX= 'center'
        oImg.originY= 'center'
        oImg.selectable= true
        oImg.hasControls= false
        oImg.hasBorders= false
    });

    fabric.Image.fromURL('dub.png', function(oImg) {
        oImg.left = hookCoords[2][0];
        oImg.top  = hookCoords[2][1];
        oImg.selectable = false;
        canvas.add(oImg);
        oImg.originX= 'center'
        oImg.originY= 'center'
        oImg.selectable= false
        oImg.hasControls= false
        oImg.hasBorders= false
    });
    fabric.Image.fromURL('dub.png', function(oImg) {
        oImg.left = hookCoords[3][0];
        oImg.top  = hookCoords[3][1];
        oImg.selectable = false;
        canvas.add(oImg);
        oImg.originX= 'center'
        oImg.originY= 'center'
        oImg.selectable= false
        oImg.hasControls= false
        oImg.hasBorders= false
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
    }
    canvasReset();
    


    function animate(element1,element2){
        var x1 = element1.getLeft();
        var x2 = element2.getLeft();
        var y1 = element1.getTop();
        var y2 = element2.getTop();

        element1.animate('left', x2, {
            duration: 2000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function() {
            // sparkle()..
                element1.selectable = false;
                if(doneChecker()){
                    alert("done!")
                }
            },
            easing: fabric.util.ease.easeOutCirc
        });

        element1.animate('top', y2, {
            duration: 2000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function() {
            // sparkle()..
            },
            easing: fabric.util.ease.easeOutCirc
        });
    }

  });