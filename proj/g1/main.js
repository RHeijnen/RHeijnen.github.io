window.addEventListener('load', function(){ // on page load
    var direction = 'r'
    var canvas = new fabric.Canvas('sig-canvas');
    canvas.setHeight(window.innerHeight);
    canvas.setWidth(window.innerWidth);
    var canvasHeight = canvas.getHeight();
    var canvasWidth  = canvas.getWidth();
    canvas.selection = false; // disable group selection
    var entityContainer = [];
    var bubbles = [[270,65],[115,370],[325,420],[500,85],[690,145],[900,85],[820,460]];
    var darBub = [[135,210],[265,200],[395,240],[525,290],[655,320],[785,310],[915,280]];
    var snap = 20; //Pixels to snap
    var bgroundImg = "./G1_03_BG.png"

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


        fabric.Image.fromURL('dub_copy.png', function(oImg) {
            oImg.left = darBub[0][0];
            oImg.top  = darBub[0][1];
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('dub_copy.png', function(oImg) {
            oImg.left = darBub[1][0];
            oImg.top  = darBub[1][1];
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('dub_copy.png', function(oImg) {
            oImg.left = darBub[2][0];
            oImg.top  = darBub[2][1];
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('dub_copy.png', function(oImg) {
            oImg.left = darBub[3][0];
            oImg.top  = darBub[3][1];
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('dub_copy.png', function(oImg) {
            oImg.left = darBub[4][0];
            oImg.top  = darBub[4][1];
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('dub_copy.png', function(oImg) {
            oImg.left = darBub[5][0];
            oImg.top  = darBub[5][1];
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('dub_copy.png', function(oImg) {
            oImg.left = darBub[6][0];
            oImg.top  = darBub[6][1];
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('bub_copy.png', function(oImg) {
            oImg.left = bubbles[0][0];
            oImg.top  = bubbles[0][1];
            oImg.selectable = false;
            canvas.add(oImg);
            // animate(oImg,hookCoords[0][1],15)
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= true
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('bub_copy.png', function(oImg) {
            oImg.left = bubbles[1][0];
            oImg.top  = bubbles[1][1];
            oImg.selectable = false;
            canvas.add(oImg);
            // animate(oImg,hookCoords[0][1],15)
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= true
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('bub_copy.png', function(oImg) {
            oImg.left = bubbles[2][0];
            oImg.top  = bubbles[2][1];
            oImg.selectable = false;
            canvas.add(oImg);
            // animate(oImg,hookCoords[0][1],15)
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= true
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('bub_copy.png', function(oImg) {
            oImg.left = bubbles[3][0];
            oImg.top  = bubbles[3][1];
            oImg.selectable = false;
            canvas.add(oImg);
            // animate(oImg,hookCoords[0][1],15)
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= true
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('bub_copy.png', function(oImg) {
            oImg.left = bubbles[4][0];
            oImg.top  = bubbles[4][1];
            oImg.selectable = false;
            canvas.add(oImg);
            // animate(oImg,hookCoords[0][1],15)
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= true
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('bub_copy.png', function(oImg) {
            oImg.left = bubbles[6][0];
            oImg.top  = bubbles[6][1];
            oImg.selectable = false;
            canvas.add(oImg);
            // animate(oImg,hookCoords[0][1],15)
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= true
            oImg.hasControls= false
            oImg.hasBorders= false
        });
        fabric.Image.fromURL('bub_copy.png', function(oImg) {
            oImg.left = bubbles[5][0];
            oImg.top  = bubbles[5][1];
            oImg.selectable = false;
            canvas.add(oImg);
            // animate(oImg,hookCoords[0][1],15)
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= true
            oImg.hasControls= false
            oImg.hasBorders= false
        });

        fabric.Image.fromURL('dory.png', function(oImg) {
            oImg.left = 15;
            oImg.top  = canvasHeight/2 - 50;
            oImg.selectable = false;
            canvas.add(oImg);
            oImg.originX= 'center'
            oImg.originY= 'center'
            oImg.selectable= false
            oImg.hasControls= false
            oImg.hasBorders= false
            oImg.done = true;
        });

    function canvasReset(){
      canvas.clear(); 
      touchPoints = [] 
      touchCounter = 0;
      touchInitiated = false;
      canvas.setBackgroundImage('G1_03_BG_copy.png', canvas.renderAll.bind(canvas), {
        backgroundImageOpacity: 0.5,
        backgroundImageStretch: false,
        originX : 'left',
        originY : 'top',
      });
    }
    canvasReset();
    function animateDory(){
        
        canvas.forEachObject(function(o){ 
            var elementInfo = o._element.currentSrc
            if( elementInfo.indexOf("dory") !== -1){
                o.animate('left', 135, {
                    duration: 2000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                o.animate('top', 210, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                //
                o.animate('left', 265, {
                    duration: 2000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                o.animate('top', 200, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                //
                o.animate('left', 395, {
                    duration: 2000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                o.animate('top', 240, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                //
                o.animate('left', 525, {
                    duration: 2000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                o.animate('top', 290, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                //
                o.animate('left', 655, {
                    duration: 2000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                o.animate('top', 320, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                //
                o.animate('left', 785, {
                    duration: 2000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                o.animate('top', 310, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                //
                o.animate('left', 915, {
                    duration: 2000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                o.animate('top', 280, {
                    duration: 1000,
                    onChange: canvas.renderAll.bind(canvas),
                    onComplete: function() {
                    },
                    easing: fabric.util.ease.easeOutCirc
                }); 
                // o.animate('left', 915, {
                //     duration: 2000,
                //     onChange: canvas.renderAll.bind(canvas),
                //     onComplete: function() {
                //     },
                //     easing: fabric.util.ease.easeOutCirc
                // }); 
            }
        });
        // element.animate('left', 500, {
        //     duration: 2000,
        //     onChange: canvas.renderAll.bind(canvas),
        //     onComplete: function() {
        //     },
        //     easing: fabric.util.ease.easeOutCirc
        // });
    }
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
                animateDory();
                if(doneChecker()){
                    alert("done!")
                    animateDory();
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