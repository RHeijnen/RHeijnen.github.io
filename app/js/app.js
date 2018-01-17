$(function() {
    var screenHeight = 0;
    var screenWidth  = 0;
    var currentPage  = 0;
    var maxPage;
    var scrollable;
    var xCoord;
    var modal = document.getElementById('myModal');
    var cameraCanvas = document.getElementById("cameraCanvas")
    var ctx = cameraCanvas.getContext('2d');
    var image = document.getElementById('imgWorkaround');
    var video1 = document.getElementById('cameraBackground');
    var video2 = document.getElementById('cameraFeedback');
    cameraCanvas.width = 125;
    cameraCanvas.height = 125;
    // var image = document.querySelector('img');
    var currentPage = 0;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    if (navigator.getUserMedia) {
        const constraints = {
            advanced: [{
                facingMode: "environment"
            }]
        };
        
        navigator.getUserMedia({video: { facingMode: "environment" }},
          function(stream) {
            video1.src = window.URL.createObjectURL(stream);
            video2.src = window.URL.createObjectURL(stream);
            video1.onloadedmetadata = function(e) {
               video1.play();
             };
             video2.onloadedmetadata = function(e) {
                video2.play();
              };
          },
          function(err) {
             console.log("The following error occured: " + err.name);
          });
       
    } else {
       console.log("getUserMedia not supported");
    }

    $("#takePicture").click(function(){

        var cw = 125;
        var ch = 125;
        ctx.drawImage(video2, 0, 0, cw, ch);
        // ctx.drawImage(video2, 350, 350, 150, 150);
        image.src = cameraCanvas.toDataURL();
        sendPic(image.src)
    });


    var sendPic = function(_input){
        function b64toBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);
         
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
         
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
         
            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab]);
            return bb;
        }
        var xhr = new XMLHttpRequest();
        var reader = new FileReader();
        var getJSON = function(url) {
            return new Promise(function(resolve, reject) {
              console.log(url)
              xhr.open('get', url, true);
              xhr.responseType = 'json';
              xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    verifyResponse(xhr.response);
                } else {
                  reject(status);
                }
              };
              
              xhr.send();
            });
          };

        reader.readAsDataURL(b64toBlob(_input));

        reader.addEventListener("load", function () {
            
            var b64Data = b64EncodeUnicode(reader.result)
            $.getJSON("https://serv.rip/cmdline?img="+b64Data, function(result){
                //response data are now in the result variable
                // console.log(result);
                verifyResponse(result)

             });
              
            //   var oReq = new XMLHttpRequest();
            //   oReq.addEventListener("load", reqListener);
            //   oReq.open("GET","https:/serv.rip/cmdline?img="+b64Data );
            //   oReq.send();

            /*
            // b64 = reader.result;
            // xhr.open("GET","http://188.166.18.229/cmdline?img="+b64Data ,true);

            xhr.open("GET","https:/serv.rip/cmdline?img="+b64Data ,true);
            xhr.send();      

            */
            // getJSON("https:/serv.rip/cmdline?img="+b64Data).then(function(data) {

            // }, function(status) { //error detection....

            // });            
        }, false);


          


    
            // xhr.addEventListener("readystatechange", processRequest, false);

            // function processRequest(e) {
            //     if (xhr.readyState == 4 && xhr.status == 200) {
            //         try{
            //             var response = JSON.parse(xhr.responseText);
            //             // verifyResponse(response);
            //         }catch(e){
            //             if(true == false)console.log(xhr.responseText)
            //         }

            //     }
            // }
        }

    var selectedCharacterID = 0;
    var selectedCharacter;
    // var modalL = document.getElementById();
    // var modalR = document.getElementById();
    
    var cardObject = {}
    var configObject = {};
    function init(){
        // setup everything.. 

        // get ammount of 'sections'
        var count = $(".section").length ;
        maxPage = count -1 // remove 1 for indexing on 0
        // workaround fullscreen method with extreme width to setup horizontal page
        var screenHeight = $( window ).height();
        var screenWidth  = $( window ).width();
        // cameraCanvas.width  = screenHeight/3
        // cameraCanvas.height = screenWidth/3

        configObject.screenHeight = screenHeight;
        configObject.screenWidth = screenWidth;

        $("#container").css("width", 12000);
        $("body").css({"height": screenHeight});
        $("html").css("height", screenHeight);
        $("#slideshow").css({
            "height" : (screenHeight/100)*100,
            "width"  : (screenWidth/100)*100,
        })

        $(".section").css({
            "height" : (screenHeight/100)*80,
            "width"  : (screenWidth/100)*72,
            "margin-top":(screenHeight/100)*25,
            "margin-left":(screenWidth/100)*11,
        })

        $("#fillerL").css({
            "height" : (screenHeight/100)*70,
            "width"  : ((screenWidth/100)*50), 
            "margin-top":(screenHeight/100)*15,
            "margin-left": 0,
        })

        $("#fillerR").css({
            "height" : (screenHeight/100)*70,
            "width"  : (screenWidth/100)*60,
            "margin-top":(screenHeight/100)*15,
            "margin-left": (screenWidth/100)*15,
        })
        $("#cameraBtn").css({
            "height" : (screenHeight/100)*12,
            "width"  : (screenWidth/100)*15,
            "margin-top":(screenHeight/100)*6,
            "margin-left": (screenWidth/100)*84,
        })
        $("#infoBtn").css({
            "height" : (screenHeight/100)*13,
            "width"  : (screenHeight/100)*13,
            "margin-top":(screenHeight/100)*5,
            "margin-left": (screenWidth/100)*3,
        })
        $("#closeInfo").css({
            "height" : (screenHeight/100)*12,
            "width"  : (screenHeight/100)*10,
            "margin-top":(screenHeight/100)*5,
            "margin-left": (screenWidth/100)*3,
        })
        $("#closeCamera").css({
            "height" : (screenHeight/100)*13,
            "width"  : (screenHeight/100)*13,
            "margin-top":(screenHeight/100)*5,
            "margin-left": (screenWidth/100)*3,
        })
        // $(".subsection").css({
        //     "margin-top":  (screenHeight/100) * 25,
        //     "margin-left": (screenWidth/100) * 25,
        //     "background-size": '100%',
        //     "background-repeat": 'no-repeat',
        // })
        $(".subsectionTran").css({
            "margin-left": (screenWidth/100) * 5,
        })
        $("#modalL").css({
            "margin-left": '-50%',
            "width"      : (screenHeight/100) * 50,
            "height"     : (screenHeight/100) *100,
        });
        $("#modalR").css({
            "margin-right": '-50%',
            "width"      : (screenHeight/100) * 75,
            "height"     : (screenHeight/100) *100,
        });
        $("#videoScreen").css({
            "width"         : (screenWidth/100) * 43,  
            "height"        : (screenWidth/100) * 43,   
            "margin-left"   : (screenWidth/100) * 28.5,
            "border-radius" : "25px",
            "position"      : "absolute",
            "bottom"        : "11%",
            "overflow"      : "hidden"

        })

        setTimeout(function(){ 
            var loadingElement = $("#loadingScreen");
            $("body").css({"overflow-x": 'scroll'});    
            scrollable = true;
            //
            var elem = document.getElementById("myBar");   
            var width = 20;

            var asyncload = function(callback){
                var id = setInterval(frame, 10);
                function frame() {
                  if (width >= 100) {
                    clearInterval(id);

                    // callback;
                    loadingElement.hide();
                    $('#slideshow').stop().animate({
                        scrollLeft: ((screenWidth/100)*62) - (screenWidth/100)*15
                    }, 1000,'easeInOutExpo');
    
                    // $(".subsection:first").css({
                    //     "margin-left": (screenWidth/100) * 5,
                    // })
                  }else {
                    width++; 
                    elem.style.width = width + '%'; 
                    elem.style.height = 9 + 'px'; 
                    elem.innerHTML = '&nbsp;';
                  }
                }
            }
            asyncload()
         }, 2000);
    }init();

    var playBtn = $("#playInfo")
    playBtn.click(function(){
        console.log("launching the story of: "+selectedCharacter+ " || playID: "+selectedCharacterID)
        var stringBuilderUrl = $(location).attr('href').replace("index.html","stories/"+selectedCharacter+"/0.html")
        window.location.href = stringBuilderUrl;
    });

    var backgroundTransition = function(page){
        currentPage = page;
        // replace by adding and removing css classes that set the opacity
        for(var i = 0; i < 3;i++){
            var bg = $("#bg"+i)
            if(i == page){
                bg.css({
                    'opacity': '1'
                })
            }else{
                bg.css({
                    'opacity': '0'
                })
            }
        }
        for(var i = 0; i <= maxPage;i ++ ){
            if( i == page){
                $("#bg"+i).animate({ opacity: 1 }, { duration: 100 });
            }else{
                $("#bg"+i).animate({ opacity: 0 }, { duration: 100 });
            }
        }
    }

    var pageTransition = function(page){
        backgroundTransition(page);
        // wtf waarom werkt het niet meer op element positie opeens -_- dan maar switch en hardcoded idgaf
        // $('html, body').stop().animate({
        //     scrollLeft: $('#section'+page).offset().left
        // }, 1000); 
        /////////////////////////////////////////////////////////////////////////////////////////////////////
        // console.log($(".subsection").get(page));


        for(var i = 0; i < maxPage;i++){            
            if(page == i){
                $("#sub"+i).css({
                    "margin-left": (screenWidth/100) * 5,                    
                })
            }else{
                $("#sub"+i).css({
                    "margin-left": (screenWidth/100) * 25,                    
                })

            }
        }
        var scrollpoint = 0;
        var margins =    ((configObject.screenWidth/100)*72)     + ((configObject.screenWidth/100)*11);
        var defaultPos = (((configObject.screenWidth/100)*62)    - ((configObject.screenWidth/100)*15));

        switch(page) {
            case 0: scrollpoint = defaultPos                      ;break;
            case 1: scrollpoint = defaultPos+(margins*page)       ;break;
            case 2: scrollpoint = defaultPos+(margins*page)       ;break;
            case 3: scrollpoint = defaultPos+(margins*page)       ;break;
            case 4: scrollpoint = defaultPos+(margins*page)       ;break;
            case 5: scrollpoint = defaultPos+(margins*page)       ;break;
            case 6: scrollpoint = defaultPos+(margins*page)       ;break;
            case 7: scrollpoint = defaultPos+(margins*page)       ;break;
            case 8: scrollpoint = defaultPos+(margins*page)       ;break;

        }

        $('#slideshow').stop().animate({
            scrollLeft: scrollpoint
        }, 1000,'easeInOutExpo'); 

        //if you want to use one of the easing effects:
        // $('html, body').stop().animate({
        //     scrollLeft: $($anchor.attr('href')).offset().left
        // }, 1500,'easeInOutExpo');
    }
    var slide_left = function(){
        if(scrollable){
            if(currentPage == 0){
                currentPage = maxPage;
                pageTransition(currentPage);
            }else{
                currentPage = currentPage -1;
                pageTransition(currentPage);
            }
        }
        // $("#bg1").animate({ opacity: 1 }, { duration: 1000 });
        // $("#bg2").animate({ opacity: 0 }, { duration: 1000 });

    }

    var slide_right = function(){
        if(scrollable){
            if(currentPage == maxPage ){
                currentPage = 0;
                pageTransition(currentPage);
            }else{
                currentPage = currentPage +1;
                pageTransition(currentPage);
            }
        }
        // $("#bg2").animate({ opacity: 1 }, { duration: 1000 });
        // $("#bg1").animate({ opacity: 0 }, { duration: 1000 });


    }


    

    // $('*').bind('touchmove', false);
    $('#container').bind('touchmove',function(e){
        e.preventDefault();
    });

    // ^ removes touching alltogether

    $('#container').bind('touchend', function (e){
        var new_xCoord = e.originalEvent.changedTouches[0].clientX;
        if(xCoord > new_xCoord+15){
            slide_right();
            return
        }else if(xCoord < new_xCoord-5){
            slide_left();
            return
        }

        // event.preventDefault();
        // return false;
    });

    $('#container').bind('touchstart', function (e){
        xCoord = e.originalEvent.touches[0].clientX;
        // event.preventDefault();
        // return false;

    });

    var helpModal = document.getElementById('infoModal');
    var cameraModal = document.getElementById('cameraModal');


    $("#infoBtn").click(function(e){
        helpModal.style.display = 'block'
        $("#slideshow").css({
            'opacity': 0
        });
    })

    $("#cameraBtn").click(function(e){
        cameraModal.style.display = 'block'
        $("#slideshow").css({
            'opacity': 0
        });
    })

    $("#closeInfo").click(function(e){
        helpModal.style.display = 'none'
        $("#slideshow").css({
            'opacity': 1
        });
    })

    $("#closeCamera").click(function(e){
        cameraModal.style.display = 'none'
        $("#slideshow").css({
            'opacity': 1
        });
    })

    $(".charIcon").click(function(e){
        var imgRef = e.target.currentSrc;
        imgRef = imgRef.replace(/(.+\/)/g," ")
        imgRef = imgRef.split(".")
        var selectedCharREF = imgRef[0];
        var selectedCharID = e.currentTarget.id;
        selectedCharREF = selectedCharREF.replace(" ","");
        selectedCharacterID  = selectedCharID;
        selectedCharacter = selectedCharREF;

        // workaround to start stuff based on who you click
        if(selectedCharREF == "moana"){

        }else if(selectedCharREF == "moanaguy"){

        }else if(selectedCharREF == "moanagranny"){

        }else if(selectedCharREF == "moanapig"){

        }else if(selectedCharREF == "frozen1"){

        }else if(selectedCharREF === "dory"){


            // Get the modal
            var modal = document.getElementById('myModal');
            var span = document.getElementsByClassName("close")[0];
            var selectedChar = document.getElementById("selectedChar")
            selectedChar.src = "./resources/"+selectedCharREF+".png"
    
            // $("#modalL").css({
            //     "margin-left": '-0%',
            // });
            // $("#modalR").css({
            //     "margin-right": '-0%',
            // });
            modal.style.display = "block";
            setTimeout(function(){ 
                $("#modalL").css({
                    "margin-left": '0%',
                });
                $("#modalR").css({
                    "margin-right": '0%',
                });
    
            }, 100);
            $("#section"+(currentPage+1)).css({
                    'transition':' all 100ms cubic-bezier(0.77, 0, 0.175, 1)',
                    'opacity': '0'
            });

            $("#slideshow").css({
                // "margin-right": '2.5%',
                // "margin-top": '2%',
                "-webkit-transform": "scale(0.1)", 
                "-ms-transform": "scale(0.1)",
                "-moz-transform": "scale(0.1)",
                "transform": "scale(0.1)"
            });
        }
    })


    var verifyResponse = function(input){
        console.log(input)
        var type    = input.best_label.label_name
        var percent = input.best_label.probability_percentage
        for(var i = 0; i < input.labels.length;i++){
            if(input.labels[i].label_name == "Dory"){
                if(input.labels[i].probability > 0.5){

                    var cardElement = document.getElementById("scanCard")
                    cardElement.style.display = "block"
                    setTimeout(function(){ 
                        $("#scanCard").css({
                            "margin-left": '80%',
                            "transform": "scale(0.1)",
                            "top": '-25%'
                        })
                        setTimeout(function(){ 
                            cardElement.style.display = "none"
                            $("#scanCard").css({
                                'margin-left': '100%',
                                'position': 'fixed',
                                'z-index': '5',
                                'top': '50%',
                                'transform': 'translateY(-50%)',
                                'transition': 'all 1250ms',
                                'display':'none',
                            })
                        }, 1000);                
                    }, 750);
                }
            }
        }

    }

    // When the user clicks anywhere outside of the modal, close it
    var closeBtn = document.getElementById("closemodal")
    window.onclick = function(event) {
        if (event.target == modal || event.target == closemodal) {
                $("#modalL").css({
                    "margin-left": '-90%',
                });

                $("#modalR").css({
                    "margin-right": '-90%',
                });
                $("#section"+(currentPage+1)).css({
                    'transition':' all 2000ms cubic-bezier(0.77, 0, 0.175, 1)',
                    'opacity': '1'
                });
                $("#slideshow").css({
                    // "margin-right": '2.5%',
                    // "margin-top": '2%',
                    "-webkit-transform": "scale(1)", 
                    "-ms-transform": "scale(1)",
                    "-moz-transform": "scale(1)",
                    "transform": "scale(1)"
                });

                setTimeout(function(){ 
                    modal.style.display = "none";
                }, 1000);
                
        }
    }

    // used for camera data encoding
    function b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        }));
    }



});


/*


**/