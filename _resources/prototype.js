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
            scanGeoLocation: false,
            scanMousePositions: false,
            scanWebElementInterest: true,
            html5Tracking: false
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
        *   Get current and past page
        */
        var currentPage = window.location.href;
        var referPage   = document.referrer

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
            content: currentPage,
            refer_page: referPage,
            screen_size: screenWidth + " x " + screenHeight,
            window_size: windowWidth + " x " + windowHeight,
            geodata: {
                type: "freeGeoIp"
            },
            browser: browserType,
            user_agent: userAgent,
            operating_platform: OSPlatform,
            operating_system: OSName,
            operating_version: OSVersion,
            point_of_interest:[],
            mouse_locations: []
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
        /*
        *   sets an on mouse move listener to record the X Y locations of the user
        *   so we can track the users mouse movement and simulate it later
        *   or check what elements crosscheck with the most occoring locations as
        *   points of interests
        */
        if(analyticConfig.scanMousePositions == true){
            var spamCounter = 0;        // we dont need every mm the mouse moves logged
            var innerSpamCounter = 0;   // in order to not spam the DB with X fields,
                                        // we put [limit] locations into 1 field
            var limit            = 10;  // TODO this part is not yet implemented
            document.onmousemove = handleMouseMove;
            function handleMouseMove(event) {
                var dot, eventDoc, doc, body, pageX, pageY;

                event = event || window.event; // IE-ism

                // If pageX/Y aren't available and clientX/Y are,
                // calculate pageX/Y - logic taken from jQuery.
                // (This is to support old IE)
                if (event.pageX == null && event.clientX != null) {
                    eventDoc = (event.target && event.target.ownerDocument) || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = event.clientX +
                    (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                    (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = event.clientY +
                    (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                    (doc && doc.clientTop  || body && body.clientTop  || 0 );
                }
                spamCounter = spamCounter +1;
                if(spamCounter > 100){
                    spamCounter = 0;
                    userInformation.mouse_locations.push([event.pageX,event.pageY])
                }
                // console.log(event.pageX)
                // console.log(event.pageY)
                // userInformation.mouse_locations.push([event.pageX,event.pageY])
                // TODO Dump locations in object
            }
        }



        /*
        *   Get geotracking and after that call our page  
        *   free service by freegeoIP - has limitation on howmany times it can be called
        *   clientside (15k) so we can never surpass that    
        */
        if(analyticConfig.scanGeoLocation == true){
            // if true we do the call to freegeoip to get the information
            $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
                //JSON.stringify(data, null, 2)
                if(data != undefined){
                    userInformation.ip = data.ip;
                    userInformation.geodata.country_code = data.country_code;
                    userInformation.geodata.country_name = data.country_name;
                    userInformation.geodata.region_code = data.region_code;
                    userInformation.geodata.region_name = data.region_name;
                    userInformation.geodata.city = data.city;
                    userInformation.geodata.zip_code = data.zip_code;
                    userInformation.geodata.time_zone = data.time_zone;
                    userInformation.geodata.latitude = data.latitude;
                    userInformation.geodata.longitude = data.longitude;
                }
                if(analyticConfig.html5Tracking == true){
                    navigator.geolocation.getCurrentPosition(setCoords);
                    function setCoords(position){
                        userInformation.geodata.latitude = position.coords.latitude;
                        userInformation.geodata.longitude = position.coords.longitude;
                        userInformation.geodata.type = "HTML5"
                    }
                }
                // call firebase
                database.ref('tracking/'+current_user+"/"+start_date).set(userInformation);
                (function repeatme(){
                    // update the visitation duration by polling the user and setting
                    // the end_date
                    var end_date = new Date().toJSON();
                    end_date = end_date.replace(/([T])/g,"/")
                    end_date = end_date.replace(/([.])\w+/g,"")
                    userInformation.end_time = end_date;
                    database.ref('tracking/'+current_user+"/"+start_date).update(userInformation);

                    setTimeout(repeatme, analyticConfig.scanUpdatePollingPeriod);
                })();
            });
        }else{
            // if false we skil the call and call the database 
            database.ref('tracking/'+current_user+"/"+start_date).set(userInformation);
            (function repeatme(){
                // update the visitation duration by polling the user and setting
                // the end_date
                var end_date = new Date().toJSON();
                end_date = end_date.replace(/([T])/g,"/")
                end_date = end_date.replace(/([.])\w+/g,"")
                userInformation.end_time = end_date;
                database.ref('tracking/'+current_user+"/"+start_date).update(userInformation);

                setTimeout(repeatme, analyticConfig.scanUpdatePollingPeriod);
            })();
        }
        // done
    });
})();   