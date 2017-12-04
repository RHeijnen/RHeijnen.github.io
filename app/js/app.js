$(function() {
    var screenHeight = 0;
    var screenWidth  = 0;
    var currentPage = 0;
    var maxPage;;
    var scrollable;
    var xCoord;
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
        configObject.screenHeight = screenHeight;
        configObject.screenWidth = screenWidth;

        $("#container").css("width", 12000);
        $("body").css({"height": screenHeight});
        $("html").css("height", screenHeight);
        $(".section").css({
            "height" : (screenHeight/100)*70,
            "width"  : (screenWidth/100)*80,
            "margin-top":(screenHeight/100)*15,
            "margin-left":(screenWidth/100)*5,
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
            "height" : (screenHeight/100)*10,
            "width"  : (screenWidth/100)*15,
            "margin-top":(screenHeight/100)*1,
            "margin-left": (screenWidth/100)*80,
        })
        $("#infoBtn").css({
            "height" : (screenHeight/100)*10,
            "width"  : (screenHeight/100)*10,
            "margin-top":(screenHeight/100)*1,
            "margin-left": (screenWidth/100)*1,
        })
        setTimeout(function(){ 
            var loadingElement = $("#loadingScreen");
            $("body").css({"overflow-x": 'scroll'});    
            scrollable = true;
            loadingElement.hide();
            // afterwards scroll into view
            $('html, body').stop().animate({
                scrollLeft: ((screenWidth/100)*60) - (screenWidth/100)*15
            }, 1000,'easeInOutExpo'); 
         }, 2000);
    }init();
    var backgroundTransition = function(page){
        console.log("bg"+page)
        for(var i = 0; i <= maxPage;i ++ ){
            if( i == page){
                $("#bg"+i).animate({ opacity: 1 }, { duration: 1000 });
            }else{
                $("#bg"+i).animate({ opacity: 0 }, { duration: 1000 });

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
        var scrollpoint = 0;
        var margins = ((configObject.screenWidth/100)*80)     + ((configObject.screenWidth/100)*5);
        var defaultPos = (((configObject.screenWidth/100)*60) - ((configObject.screenWidth/100)*15));
        switch(page) {
            case 0: scrollpoint = defaultPos                      ;break;
            case 1: scrollpoint = defaultPos+(margins*page)       ;break;
            case 2: scrollpoint = defaultPos+(margins*page)       ;break;
            case 3: scrollpoint = defaultPos+(margins*page)       ;break;
        }

        $('html, body').stop().animate({
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
    // ^ removes touching alltogether
    $(document).bind('touchend', function (e){
        var new_xCoord = e.originalEvent.changedTouches[0].clientX;
        if(xCoord > new_xCoord+5){
            slide_right();
        }else if(xCoord < new_xCoord-5){
            slide_left();
        }
        // event.preventDefault();
        // return false;
    });

    $(document).bind('touchstart', function (e){
        xCoord = e.originalEvent.touches[0].clientX;
        // event.preventDefault();
        // return false;
    });


});