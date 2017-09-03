(function() {
    'use strict';
    /*
    *   Load script function
    *   takes an array argument of scripts to load, and then perform the actions
    *   with said scrit in the callback function
    */
    function loadScripts(array,callback){
        var loader = function(src,handler){
            var script = document.createElement("script");
            script.src = src;
            script.onload = script.onreadystatechange = function(){
                script.onreadystatechange = script.onload = null;
                handler();
            }
            var head = document.getElementsByTagName("head")[0];
            (head || document.body).appendChild( script );
        };
        (function run(){
            if(array.length!=0){
                loader(array.shift(), run);
            }else{
                callback && callback();
            }
        })();
    }
    loadScripts([
        // load scripts..
    "https://www.gstatic.com/firebasejs/4.1.3/firebase.js",
    "https://code.jquery.com/jquery-3.2.1.min.js"
    ],function(){
        // when loaded set..
        // customize analyics object
        var analyticConfig = {
            scanUpdatePollingPeriod: 5000,
            scanWebElementInterest: true,
        }
        // customize firebase/database config
        var firebaseConfig = {
            // apiKey: window.trackingConfig.k,
            apiKey: "AIzaSyC41hSRfcbz5ejN3LhNFlSfGRq5Bz9QlDk",
            authDomain: "appbuilderstuff.firebaseapp.com",
            databaseURL: "https://appbuilderstuff.firebaseio.com",
            projectId: "appbuilderstuff",
            storageBucket: "appbuilderstuff.appspot.com",
            messagingSenderId: "1030080360123"
        };
        // init/authenticate
        firebase.initializeApp(firebaseConfig);
        var database = firebase.database();
        /*
        *   Generate a unique user ID
        */
        function createID(){
            function createSubset(){
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return createSubset() + createSubset() + '-' + createSubset() + '-' + createSubset() 
                + '-' + createSubset() + '-' + createSubset() + createSubset() + createSubset();
        }
        /*
        *   Get cookie by name
        */
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) {
                return parts.pop().split(";").shift();
            }
        }
        /*
        *   get browser by name + version 
        *   https://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
        */
        navigator.getBrowserType = (function(){
            var ua= navigator.userAgent, tem, 
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE '+(tem[1] || '');
            }
            if(M[1]=== 'Chrome'){
                tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
                if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        })();

        /*
        *   Get OS Info
        */
        var OSName = "Unknown OS"; // fallback
        if (navigator.userAgent.indexOf("Win") != -1) OSName="Windows";
        if (navigator.userAgent.indexOf("Mac") != -1) OSName="Macintosh";
        if (navigator.userAgent.indexOf("Linux") != -1) OSName="Linux";
        if (navigator.userAgent.indexOf("Android") != -1) OSName="Android";
        if (navigator.userAgent.indexOf("like Mac") != -1) OSName = "iOS";

        var OSPlatform = navigator.platform;
        var OSVersion  = navigator.appVersion; 
        /*
        *   Get start date and prettify it
        */
        var start_date = new Date().toJSON();
        start_date = start_date.replace(/([T])/g,"/")
        start_date = start_date.replace(/([.])\w+/g,"")
        /*
        *   Get current and past page information
        */
        var currentPage = window.location.href;
        var referPage   = document.referrer
        var application = document.location.hostname || "UnknownApp"  ;
        var currentPath = document.location.pathname;

        /*
        *   Get screen information
        */
        var screenWidth  = screen.width;
        var screenHeight = screen.height;
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        /*
        *   Get Browser info       
        */
        var browserType = navigator.getBrowserType
        var userAgent = navigator.userAgent;
        /*
        *       User UID generation / continuation
        */
        var isCookieSet = document.cookie.indexOf('RA_UID=');       // check if that cookie exists
        var current_user = "identify_user_by_current_user_variable"   // pretty fallback
        // if cookie is not set, generate a new user ID
        if(isCookieSet != 0){
            // fresh user, set cookie UID so we can define who he is
            var CookieDate = new Date;
            CookieDate.setFullYear(CookieDate.getFullYear( ) +10);
            var new_UID = createID();
            document.cookie = "RA_UID="+new_UID+"; expires=" + CookieDate.toGMTString( ) + ';';
            current_user = new_UID;
        }else{
            // if the cookie is set, get its value and set it as our current_user
            current_user = getCookie("RA_UID")
        }

        /*
        *   Data Model
        */
        var userInformation = {
            UID : current_user,
            start_time: start_date,
            end_time: start_date,
            app: application,
            path : currentPath,
            content: currentPage,
            refer_page: referPage,
            screen_size: screenWidth + " x " + screenHeight,
            window_size: windowWidth + " x " + windowHeight,
            browser: browserType,
            user_agent: userAgent,
            operating_platform: OSPlatform,
            operating_system: OSName,
            operating_version: OSVersion,
            point_of_interest:[],
        }


        /*
        *   Return the Xpath towards an element
        */
        function getXPathTo(element) {	
            // if the element has an ID				 														      
            if (element.id!==''){																							
                return "//*[@id='"+element.id+"']";																			
            }						 														      												
            // if the element is the body                                                                                                                                    
            if (element===document.body){																				
                return element.tagName.toLowerCase();																		
            }				 														      										
            // if part of a nodelist                                                                                                                                    
            var ix= 0;									 														      
            var siblings= element.parentNode.childNodes; 																
                                                                                                                        
            for (var i= 0; i<siblings.length; i++) {	 														      
                var sibling= siblings[i];				 														      
                                                                                                                                                
                if (sibling===element){					 														      
                    return getXPathTo(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
                };																								      
                if (sibling.nodeType===1 && sibling.tagName === element.tagName) {								      
                    ix++;																							  
                };																									  
            };																									      
        };	


        /*
        *   set an onclick on the document that calls getXPathTo
        *   and saves it to send it to the database
        *   used to determine points of interest
        */
        if(analyticConfig.scanWebElementInterest == true){
            document.onclick = function(event) {																		  		
                if (event===undefined){																				  		
                    event= window.event;										 // IE hack							  		
                }																									  		
                var target = 'target' in event? event.target : event.srcElement; // another IE hack					  		
                var root   = document.compatMode==='CSS1Compat'? document.documentElement : document.body;			  		
                var mxy    = [event.clientX+root.scrollLeft, event.clientY+root.scrollTop];							  		
                                                                                                                                                
                var path = getXPathTo(target);
                userInformation.point_of_interest.push(path)																		  		
            };
        }

        database.ref('tracking/'+application+"/"+current_user+"/"+start_date).set(userInformation);

        (function repeatme(){
            // update the visitation duration by polling the user and setting
            // the end_date
            var end_date = new Date().toJSON();
            end_date = end_date.replace(/([T])/g,"/")
            end_date = end_date.replace(/([.])\w+/g,"")
                                         // \\
            userInformation.end_time = end_date;
            database.ref('tracking/'+application+"/"+current_user+"/"+start_date).update(userInformation);
            setTimeout(repeatme, analyticConfig.scanUpdatePollingPeriod);
        })();
        
        // done
    });
})();   