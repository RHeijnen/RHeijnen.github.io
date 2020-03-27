$( document ).ready(function() {
    /* thanks to https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript */
    // We need this to get a cross browser support for easy url parameter reading
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    /* this finds text nodes in the dom */
    /* searchPhrase -> string
       startElement -> element to start search from (top to down)
       returns list of elements
    */
    function findTextNodes(searchPhrase, startElement) {
        var startNode = document.querySelector(startElement);
        var nodeResults = [];
        digThrougDom(startNode.childNodes, nodeResults, searchPhrase);
        return nodeResults;
    }
    /* helper function*/
    function digThrougDom(childNodes, nodeResults, searchPhrase) {
        for (var i = 0, l = childNodes.length; i < l; i++) {
            var textContentParsed = childNodes[i].textContent.toLowerCase(); 
            if (childNodes[i].nodeType === Node.TEXT_NODE && textContentParsed.indexOf(searchPhrase) > -1){
                nodeResults.push(childNodes[i]); 
            } else if (childNodes[i].hasChildNodes()){
                digThrougDom(childNodes[i].childNodes, nodeResults, searchPhrase);
            }
        }
    }
    // simple string helper function
    function  insertIntoString(baseString, index, string){   
        return baseString.substr(0, index) + string + baseString.substr(index);
    }

    // when you click on an anchor link button, scroll to its target
    $('.anchor_link').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('scroll')).offset().top //- $("#navbar").height()  
        }, '300');

    });
    // fake a search page implementation
    $('.search-action').click(function(e) {
        e.preventDefault();
        var value = $("#searchterm").val()
        if(value.length >3){
            var currentUrl = location.href.match(/^[^\#\?]+/)[0]; // this strips potential previous query params
            var fakeSearchQuery = "?query="+value
            // 1 + 1 = 2
            location.href = currentUrl + fakeSearchQuery
        }else{
            // its better than doing nothing I suppose..
            $("#searchterm").val("")
            $("#searchterm").attr("placeholder", "Try again")
        }
    });
    // when we have a 'query' in our url parameter..
    if(getParameterByName("query")){
        // get a list of our search terms
        var searchTerms = getParameterByName("query").split(" ")
        var scrollElement;
        // for every search time (split by space)
        for(var i = 0; i < searchTerms.length;i++){
            // get all the text nodes on the page that contain the term
            var possibleMatch = findTextNodes(searchTerms[i],"body")
            // for every occurence of the search term
            for(var x = 0; x <possibleMatch.length;x++){
                // find its parent
                var targetElement = possibleMatch[x].parentElement;
                // if its the first, make an note of it - so we can scroll to it later
                if(x == 0){
                    // scroll to the first occurence on the page
                    scrollElement = targetElement
                }
                // do some simple highlighting of the search term
                /* [start] note you do not need this code for scrolling */
                var upperCaseLetter = false;
                var innerText = targetElement.innerText.toLowerCase()
                var startPointHighLighter = innerText.indexOf(searchTerms[i])
                if(targetElement.innerText[startPointHighLighter] == targetElement.innerText[startPointHighLighter].toUpperCase()){
                    upperCaseLetter = true;
                    console.log("uppercasing")
                }
                var endPointHighLighter   = (innerText.indexOf(searchTerms[i]) + searchTerms[i].length);

                var tempString = insertIntoString(innerText,endPointHighLighter,"</span>")
                if(upperCaseLetter){
                    tempString =  tempString.charAt(0).toUpperCase() + tempString.slice(1);
                } 
                tempString = insertIntoString(tempString,startPointHighLighter,"<span class='custom-highlighter'>")
                // NOTE -> make sure you define a class "custom-highlighter" with some styling to indicate the highlighted search phrases, normally I use some soft background color
                targetElement.innerHTML = tempString
                /* [end] note you do not need this code for scrolling */

            }
        }
        // scroll to the first occurence of our search phrase
        $('html, body').animate({
            scrollTop: $(scrollElement).offset().top
        }, 1000);
    }
});