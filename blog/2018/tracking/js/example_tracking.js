var loadTimerStart = Date.now();
/**
*   @plain javascript way of doing $(window).width();
*   [tested in:  Chrome - Safari]
*/
var getWindowWidth = function(){
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};
/**
*   @plain javascript way of doing $(window).height();
*   [tested in:  Chrome - Safari]
*/
var getWindowHeight = function(){
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};
/**
*  @function getScreenHeight @returns screen.height from screen object
*/
var getScreenHeight = function(){
    return screen.height;
};
/**
*  @function getScreenWidth @returns screen.width from screen object
*/
var getScreenWidth = function(){
    return screen.width;
};



    /**
     * @function getScrollPercent returns @var % scrolled on current page
     * @thanks https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
     * Going to need to see the first position ( what we get now) AND the last position firstposition + (the viewheight) to see what the
     * extend of the user's visable spectrum is.  --> getWindowHeight()
     */
    function getScrollPercent() {
        var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
        return (h[st]||b[st]) / (h[sh]||b[sh]) * 100
    }
    /**
     *  creates getBrowserType() @function
     *  @returns {string} type of browser
     *  used to identify the browser types [];
     */
 
    getBrowserType = function(){
        var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        };
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        };
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    };

/**
 *  @function @returns {boolean} based on matching in the userAgent
 *  
 */
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iPad: function() {
            return navigator.userAgent.match(/iPad/i);
        },
        iPhone: function() {
            return navigator.userAgent.match(/iPhone/i);
        },    
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
/**
 *  call  @function isMobile and @returns {string}
 *  save  @return value as mobileType
 */
    var getMobileType = function(){
        if(isMobile.Android()){
            return'Android';
        }else if(isMobile.Opera()){
            return 'Opera';
        }else if (isMobile.BlackBerry()){
            return 'BlackBerry';
        }else if(isMobile.iPad()){
            return 'iPad';
        }else if(isMobile.iPhone()){
            return'iPhone';
        }else if(isMobile.Windows()){
            return 'Windows mobile';
        }else{
            return "none"
        }  
    }

/**
     *  @function (identifyOS)
     *  @returns  {string} based on userAgent identification
*/
    var identifyOS = function(){
        var OSName = "Unknown OS"; // fallback
        if (navigator.userAgent.indexOf("Win") != -1) OSName="Windows";
        if (navigator.userAgent.indexOf("Mac") != -1) OSName="Macintosh";
        if (navigator.userAgent.indexOf("Linux") != -1) OSName="Linux";
        if (navigator.userAgent.indexOf("Android") != -1) OSName="Android";
        if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "iOS";
        if (navigator.userAgent.match(/SAMSUNG|SGH-[I|N|T]|GT-[I|P|N]|SM-[N|P|T|Z|G]|SHV-E|SCH-[I|J|R|S]|SPH-L/i))OSName = "SamsungOS";
        return OSName
    }
/**
     *  @function (identifyBrowser_version)
     *  @returns  {string} returns browser version (based on user agent)
*/
    var identifyBrowser_version = function(){
        return navigator.appVersion;
    }
/**
    *  @function (identifyOS_platform)
    *  @returns  {string} returns platform the OS is based on
*/
    var identifyOS_platform = function(){
        return navigator.platform;
    }


document.addEventListener('DOMContentLoaded', function(){


    writeCodeBlock = function(el,string){
        document.getElementById(el).rows = Number(document.getElementById(el).rows) +2
        var codeEl = document.getElementById(el);
        codeEl.value =  codeEl.value  +string + "\n"
    }
    deleteCodeBlock = function(el){
        document.getElementById(el).rows = 1 // uhg
        var codeEl = document.getElementById(el);
        codeEl.value =  ""
    }
    var currentPage = window.location.href;
    var referPage   = document.referrer;
    var loadTimerEnd = Date.now();
    var loadTimerResult = loadTimerEnd - loadTimerStart;
    var browserType    = getBrowserType();
    var browserVersion = navigator.appVersion;
    var mobileUser     =  getMobileType()
    var osSystem       = identifyOS()
    var osPlatform     = navigator.platform
    var windowHeight   = getWindowHeight()
    var windowWidth    = getWindowWidth()
    var screenWidth    = getScreenWidth()
    var screenHeight   = getScreenHeight()
    var maxpercentage  = 0;
    var scrollPercentage = getScrollPercent()
    maxpercentage = scrollPercentage

    var coordContainer = [];
    var getCoordOnClick = function(event){
        coordContainer.push({ 
            "x": event.clientX,
            "y": event.clientY
        });
        var tempString = ""
        for(var i = 0; i < coordContainer.length;i++){
            if(i > 5){
                tempString = tempString +"..."
                break;
            }
            tempString = tempString +" [X: "+coordContainer[i]["x"] + " -  Y: "+ coordContainer[i]["y"] +"]"
        }
        deleteCodeBlock("output7");
        writeCodeBlock("output7","coordContainer value:\n >"+ tempString)

    };
    document.addEventListener("click", getCoordOnClick);


    writeCodeBlock("output1","currentPage value:\n >"+ currentPage)
    writeCodeBlock("output1","referPage value:\n >" + referPage)
    writeCodeBlock("output2","loadTimerStart value:\n >"+ loadTimerStart)
    writeCodeBlock("output2","loadTimerEnd value:\n >"+ loadTimerEnd)
    writeCodeBlock("output2","loadTimerResult value:\n >"+ loadTimerResult)
    writeCodeBlock("output3","mobileUser value:\n >"+ mobileUser)
    writeCodeBlock("output3","browserType value:\n >"+ browserType)
    writeCodeBlock("output3","browserVersion value:\n >"+ browserVersion)
    writeCodeBlock("output4","osSystem value:\n >"+ osSystem)
    writeCodeBlock("output4","osPlatform value:\n >"+ osPlatform)
    writeCodeBlock("output5","windowHeight value:\n >"+ windowHeight)
    writeCodeBlock("output5","windowWidth value:\n >"+ windowWidth)
    writeCodeBlock("output5","screenWidth value:\n >"+ screenWidth)
    writeCodeBlock("output5","screenHeight value:\n >"+ screenHeight)
    writeCodeBlock("output6","(max) scrollPercentage value:\n >"+ scrollPercentage)
    setInterval(function(){ 
        deleteCodeBlock("output6");

        if(maxpercentage < getScrollPercent()){
            maxpercentage = getScrollPercent();
        }
        writeCodeBlock("output6","(max) scrollPercentage value:\n >"+ maxpercentage)

    }, 3000);
    writeCodeBlock("output7","coordContainer value:\n >"+ "click somewhere to activate")



    // writeCodeBlock("output1","referPage value: "+referPage)

});