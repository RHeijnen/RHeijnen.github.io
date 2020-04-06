var app = angular.module('app',  []);
app.controller("controller", controller);
controller.$inject = ['$scope','$window'];
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
function controller($scope,$window){
    $scope.blogPosts = [
        {
            title: "Codepen Dive 3",
            description : "A look into a cool pen from @devilishalchemist",
            date : "4 Mar 2020",
            image : "/media/blog/codepen-redbutton.png",
            url   : "/blog/2020/codepen-dive-offcanvas-sidebar/index.html",
            tags  : ["Programming","Web-development","UX"],
            update: "4 Mar 2020"
        },
        {
            title: "Charging animation",
            description : "Inspired by Xiaomi Mi Mix Alpha",
            date : "29 Feb 2020",
            image : "/blog/2020/bat-charge-animation/resources/front.PNG",
            url   : "/blog/2020/bat-charge-animation/index.html",
            tags  : ["Programming","Web-development","UX"],
            update: "29 Feb 2020"
        },
        {
            title: "Scroll Anchors",
            description : "Make your website go scrolly scroll",
            date : "4 Feb 2020",
            image : "/media/blog/code.png",
            url   : "/blog/2020/scrollanchors/index.html",
            tags  : ["Programming","Web-development","UX"],
            update: "4 Feb 2020"
        },
        {
            title: "Dithering",
            description : "A study in dithering",
            date : "2 Feb 2020",
            image : "/media/blog/ditheringmac.gif",
            url   : "/blog/2020/study-dithering/index.html",
            tags  : ["Pixel Art","Learning"],
            update: "2 Feb 2020"
        },
        { 
            title: "Pixel art portfolio",
            description : "Interactive canvas",
            date : "1 Feb 2020",
            image : "/media/blog/pixelartportfolio.png",
            url   : "/blog/2020/pixelportfolio/index.html",
            tags  : ["Pixel Art","Web-development","UX"],
            update: "1 Feb 2020"
        },
        {
            title: "Challenge yourself",
            description : "The importance of challenging yourself.",
            date : "25 Jan 2020",
            image : "/blog/2020/challenges/resources/slimes.png",
            url   : "/blog/2020/challenges/index.html",
            tags  : ["Learning"],
            update: "25 Jan 2020"
        },
        {
            title: "Anti aliasing",
            description : "A study in aliasing",
            date : "11 Jan 2020",
            image : "/media/blog/aaexample.png",
            url   : "/blog/2020/study-aliasing/index.html",
            tags  : ["Learning","Game Dev"], 
            date : "11 Jan 2020",
        },


        {
            title: "Thoughts on roguelikes",
            description : "I've played so many..",
            date : "22 Dec 2019",
            image : "/blog/2019/roguelikes-thoughts/resources/front.PNG",
            url   : "/blog/2019/roguelikes-thoughts/index.html",
            tags  : ["Game Dev"],
            update: "22 Dec 2020"
        },
        {
            title: "Tilesets in Unity I",
            description : "Simple tileset tutorial",
            date : "21 Dec 2019",
            image : "/media/blog/tilesetexample.jpg",
            url   : "/blog/2019/unity-tilesets-1/index.html",
            tags  : ["Programming","Pixel Art","Game Dev"],
            update: "21 Dec 2019"
        }, 
        {
            title: "Pixel Art Tutorials",
            description : "Collected from the web",
            date : "05 Jun 2019",
            image : "/blog/2019/pixelarttutorials/resources/front.PNG",
            url   : "/blog/2019/pixelarttutorials/index.html",
            tags  : ["Learning","Pixel Art","Game Dev"],
            update: "4 Feb 2020"
        }, 
        {
            title: "Color reduction",
            description : "Useing Kmeans",
            date : "3 Apr 2019",
            image : "/blog/2019/km-color-reduction/resources/front.PNG",
            url   : "/blog/2019/km-color-reduction/index.html",
            tags  : ["Programming","Learning"],
            update: "3 Apr 2019"
        },
        {
            title: "$0 ?",
            description : "Do you use it ?",
            date : "19 Feb 2019",
            image : "/media/blog/code.png",
            url   : "/blog/2019/dollarzero/index.html",
            tags  : ["Programming","Web-development"],
            update: "19 Feb 2019"
        },
        {
            title: "Browser History Manipulation",
            description : "What is still possible?",
            date : "6 Jan 2019",
            image : "/media/blog/code.png",
            url   : "/blog/2019/window-history-states/index.html",
            tags  : ["Programming","Web-development","UX"],
            update: "6 Jan 2019"
        },
        {
            title: "Personas",
            description : "Why they matter",
            date : "24 Dec 2018",
            image : "/blog/2018/personas/resources/front.PNG",
            url   : "/blog/2018/personas/index.html",
            tags  : ["UX","Learning","Game Dev"],
            update: "01 Feb 2020"
        },
        {
            title: "Codepen Dive 2",
            description : "A look into a cool pen from @agathaco",
            date : "11 Dec 2018",
            image : "/blog/2018/codepen-dive-unsub/resources/front.PNG",
            url   : "/blog/2018/codepen-dive-unsub/index.html",
            tags  : ["Web-development","UX","Learning"],
            update: "01 Feb 2020"
        },
        {
            title: "Planets from CSS",
            description : "Study into skewing",
            date : "25 Nov 2018",
            image : "/blog/2018/planet-css/resources/front.PNG",
            url   : "/blog/2018/planet-css/index.html",
            tags  : ["UX","Learning","Web-development"],
            update: "25 Nov 2018"
        },
        {
            title: "Loading Animation",
            description : "Simple mockup that I might use later",
            date : "8 Nov 2018",
            image : "/blog/2018/simple-loading-animation/resources/front.PNG",
            url   : "/blog/2018/simple-loading-animation/index.html",
            tags  : ["UX","Web-development"],
            update: "8 Nov 2018"
        },
        {
            title: "Codepen Dive 1",
            description : "A look into a circle navigation from @bennettfeely",
            date : "4 Nov 2018",
            image : "/media/blog/codepen-ring-nav.png",
            url   : "/blog/2018/codepen-dive-circle-navigation/index.html",
            tags  : ["Programming","Web-development","UX"],
            update: "4 Nov 2018"
        },
        {
            title: "Digital Story Collections",
            description : "My old minor project",
            date : "12 Sep 2018",
            image : "/media/blog/screenshot.PNG",
            url   : "/blog/2018/minor-project-stories/index.html",
            tags  : ["UX","Web-development","Programming"],
            update: "12 Sep 2018"
        },
        {
            title: "Collecting user data",
            description : "What kind of data can we collect?",
            date : "6 Sep 2018",
            image : "/media/blog/code.png",
            url   : "/blog/2018/collecting-user-information/index.html",
            tags  : ["Programming","Web-development"],
            update: "6 Sep 2018"
        }
    ]
    $scope.activeFilterOption = "No Filter"
    $scope.filterOptions = ["No Filter"]
    $scope.getAllFilterStates = function(){
        for(var i = 0; i < $scope.blogPosts.length;i++){
            for(var x = 0; x < $scope.blogPosts[i].tags.length; x++){
                $scope.filterOptions.push($scope.blogPosts[i].tags[x]) 
            }
        }
        $scope.filterOptions = $scope.filterOptions.filter(onlyUnique)
    }
    $scope.getAllFilterStates();
    $scope.setActiveFilterOption = function(newValue){
        $scope.activeFilterOption = newValue
        $(".btn.active").removeClass("active")
        $("button[data-value='"+newValue+"']").addClass("active")
    };
    $scope.checkActiveFilterOption = function(query){
        if($scope.activeFilterOption == "No Filter"){
            return true;
        }else{
            for(var i = 0; i < query.tags.length; i ++){
                if(query.tags[i] == $scope.activeFilterOption){
                    return true;
                }
            }
            return false;
        }
    };








};
