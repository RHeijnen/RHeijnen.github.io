function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
function _siblings(elem) {
    var siblings = [],
        node = elem;
    
    while (node) {
      node = node.previousElementSibling;
      
      if(node) {
       siblings.push(node); 
      }
    }
    
    return siblings;
  }
  

var app = angular.module('app', []);
app.controller("controller", controller);
controller.$inject = ['$scope','$window'];

function controller($scope,$window){
    $scope.blogPosts = [
        {
            title: "Collecting your data",
            description : "bla bla bla bla asd asd asd asd asd ads asd asd asd asd",
            d  : "09",
            my : "September 19",
            image : "/blog/media/code.png",
            url   : " "
        },
        {
            title: "Dithering is amazing",
            description : "A study in dithering",
            d  : "09",
            my : "September 19",
            image : "/blog/media/ditheringmac.gif",
            url   : " "
        },
        {
            title: "'developers writers block?'",
            description : "The importance of challenging yourself.",
            d  : "09",
            my : "September 19",
            image : "/blog/media/10minutepixelart.png",
            url   : " "
        },
        {
            title: "Pixel art portfolio",
            description : "Interactive canvas",
            d  : "09",
            my : "September 19",
            image : "/blog/media/pixelartportfolio.png",
            url   : " "
        },
        {
            title: "Anti aliasing",
            description : "What even is it ?",
            d  : "09",
            my : "September 19",
            image : "/blog/2020/antialias/resources/lineexample.png",
            url   : " "
        },
        // {
        //     title: "Online Mercenaries for hire",
        //     description : "Or something less thrilling.",
        //     d  : "09",
        //     my : "September 19",
        //     image : "/blog/media/lcqp-suspects.jpg",
        //     url   : " "
        // },
        {
            title: "I've played so many rogue lite/likes",
            description : "And I've got some ideas",
            d  : "09",
            my : "September 19",
            image : "/blog/media/roguelikecollection.png",
            url   : "/blog/media/roguelikecollection.png"
        },
        {
            title: "Offline websites",
            description : "My experience with progressive webapps and service workers",
            d  : "09",
            my : "September 19",
            image : "/blog/media/code.png",
            url   : "/blog/media/code.png"
        },
        {
            title: "Scroll Anchors",
            description : "Make your website go scrolly scroll",
            d  : "09",
            my : "September 19",
            image : "/blog/media/code.png",
            url   : "/blog/media/code.png"
        },
        {
            title: "Unity tilesets",
            description : "Simple tileset tutorial",
            d  : "09",
            my : "September 19",
            image : "/blog/media/code.png",
            url   : "/blog/media/code.png"
        },
        {
            title: "Digital Story Collections",
            description : "My minor project",
            d  : "09",
            my : "September 19",
            image : "/blog/media/code.png",
            url   : "/blog/media/code.png"
        },
    ]
    $scope.skills = [
        {name: "Javascript",progress: 83,type: ["Professional","Web-development","Programming"]},
        {name: "HTML",progress: 85,type: ["Professional","Web-development"]},
        {name: "CSS",progress: 74,type: ["Professional","Web-development"]},
        {name: "NodeJS",progress: 75,type: ["Professional","Web-development","Programming"]},
        {name: "XSLT V1",progress: 70,type: ["Professional","Web-development"]},
        {name: "Roxen CMS",progress: 85,type: ["Professional","Web-development"]},
        {name: "Pixel Art",progress: 45,type: ["Personal"]},
        {name: "Angular JS",progress: 50,type: ["Professional","Web-development"]},
        {name: "Angular",progress: 50,type: ["Professional","Web-development"]},        
        {name: "Protractor (Selenium)",progress: 65,type: ["Professional","Web-development"]},
        {name: "React",progress: 55,type: ["Professional","Web-development"]},
        {name: "Electron",progress: 70,type: ["Web-development","Programming"]},
        {name: "C++",progress: 35,type: ["Personal","Programming"]},
        {name: "C sharp",progress: 40,type: ["Personal","Programming"]},
        {name: "Unity",progress: 45,type: ["Personal","Programming"]},
        {name: "Java",progress: 65,type: ["Personal","Programming"]},
        {name: "PHP",progress: 35,type: ["Web-development","Programming"]},
        {name: "Python",progress: 30,type: ["Personal","Programming"]},
        {name: "Classical Guitar",progress: 87,type: ["Personal"]},
        {name: "Strength",progress: 60,type: ["Personal"]},
        {name: "Agility",progress: 74,type: ["Personal"]},
        {name: "Intellect",progress: 80,type: ["Personal"]},
        {name: "Lock picking",progress: 83,type: ["Personal"]},
        {name: "Cooking",progress: 48,type: ["Personal"]},
    ]
    $scope.progressBar; 
    $scope.skillOptions = [];
    $scope.activeSkillFilter = "Professional"
    for(var i = 0; i < $scope.skills.length;i++){
        for(var x = 0; x < $scope.skills[i].type.length;x++){
            $scope.skillOptions.push($scope.skills[i].type[x])
        }
    }
    $scope.skillOptions = $scope.skillOptions.filter(onlyUnique)
    $scope.filterSkillCheck = function (type){
        var tempString = type.type.toString()
        if(tempString.indexOf($scope.activeSkillFilter) != -1){
            return true
        }else{
            return false;
        }
    }
    $scope.setActiveSkillFilter = function(type){
        $scope.activeSkillFilter = type;
        $(".btn.active").removeClass("active")
        $("button[data-value='"+type+"']").addClass("active")
        $scope.progressBar.forEach(function(item) {
            $scope.animationToggle(item, 500)
        });

    }
    $scope.progressBarAdditionElements = function(elem,value,title){
        var valueChild = document.createElement('span');
        valueChild.className = 'progress-bar__value';
        valueChild.innerHTML = value +'%';
        elem.appendChild(valueChild);
        //adding bar area
        var barChild = document.createElement('div');
        barChild.className = 'progress-bar__bar';
        elem.appendChild(barChild);
        
        //adding inner area with the width of value
        var barInnerChild = document.createElement('div');
        barInnerChild.className = 'progress-bar__bar-inner';
        barInnerChild.style.width = value + '%';
        elem.appendChild(barInnerChild);
    
        var skillChild = document.createElement('span');
        skillChild.className = 'progress-bar__skill';
        skillChild.innerHTML = title;
        elem.appendChild(skillChild);
    
    }

    $scope.animationToggle = function(progressElement, delay) {
    
        var skillElem = progressElement.querySelector('.progress-bar__skill'),
            valueElem = progressElement.querySelector('.progress-bar__value'),
            skillBar = progressElement.querySelector('.progress-bar__bar-inner');
      
      //removing animated classes, returning to start position
      skillElem.classList.remove('js-animated');
      valueElem.classList.remove('js-animated');
      skillBar.classList.remove('js-animated');
      
      //adding animated classes to start animation
      setTimeout(function() {
        skillElem.classList.add('js-animated');
        valueElem.classList.add('js-animated');
        skillBar.classList.add('js-animated');
      }, delay);
    }
    $scope.initProgressBars = function(){
        $scope.progressBar = document.querySelectorAll('.progress-bar');
        for(var i = 0; i < $scope.progressBar.length;i++){
            var bar =  $scope.progressBar[i]
            var value = bar.getAttribute('data-value')
            var skill = bar.getAttribute('data-skill')
            $scope.progressBarAdditionElements(bar,value,skill)
          
      
            bar.className += ' progress-bar--' + 1;
            var valueElem = bar.querySelector('.progress-bar__value');
            valueElem.className += ' progress-bar__value--' + 1;
            var barElem = bar.querySelector('.progress-bar__bar');
            barElem.className += ' progress-bar__bar--' + 1;
            var barInnerElem = bar.querySelector('.progress-bar__bar-inner');
            barInnerElem.className += ' progress-bar__bar-inner--' + 1;
            var skillElem = bar.querySelector('.progress-bar__skill');
            skillElem.className += ' progress-bar__skill--' + 1;
            //adding alignment for values
            if(bar.classList.contains('progress-bar--aligned-values')) {
                valueElem.style.left = barValue + '%';
                valueElem.classList.add('progress-bar__value--aligned-value');
            }
            
            //adding additional class for no overflow hidden
            if(bar.classList.contains('progress-bar--no-overflow')) {
                barElem.classList.add('progress-bar__bar--no-overflow');
            }
        }
    
    
        $scope.progressBar.forEach(function(item) {
            $scope.animationToggle(item, 500)
        });
    }
    setTimeout(function(){ 
        $scope.initProgressBars()
    }, 1000);




$scope.init = function () {



};




};
$( document ).ready(function() {
    $('.anchor_link').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: ($('#' + $(this).data('scroll')).offset().top - $("#navbar").height() ) //- $("#navbar").height()  
        }, '300');

    });
    /* slider */
    swiper = new Swiper('.news-slider', {
        effect: 'coverflow',
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        keyboard: true,
        spaceBetween: 0,
        slidesPerView: 'auto',
        speed: 300,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 3,
            slideShadows: false
        },
        breakpoints: {
            480: {
                spaceBetween: 0,
                centeredSlides: true
            }
        },
        simulateTouch: true,
        navigation: {
            nextEl: '.news-slider-next',
            prevEl: '.news-slider-prev'
        },
        pagination: {
            el: '.news-slider__pagination',
            clickable: true
        },
        on: {
            init: function () {
                $('.swiper-slide-active .news__item').addClass('active');
                $('.item-bg').addClass('active');
            }
        }
    });


/* progress bars */

//***YOU DONT NEED THIS IN YOUR CODE *** helper function: getting siblings (for animation toggling with btn)

  //toggle animation on button click
  document.addEventListener('click', function(item) {
    
    if(item.target.matches('.play-animation')) {
      
      var siblingsArray = [];
      
       siblingsArray = _siblings(item.target);
      
      siblingsArray.forEach(function(item) {
      
        var self = item;
      
        animationToggle(self, 500);
      
      });
      
    }
    
  });
  


  //***YOU DONT NEED THIS IN YOUR CODE *** helper function: getting siblings (for animation toggling with btn)
// function _siblings(elem) {
//     var siblings = [],
//         node = elem;
    
//     while (node) {
//       node = node.previousElementSibling;
      
//       if(node) {
//        siblings.push(node); 
//       }
//     }
    
//     return siblings;
//   }
  
//   //toggle animation on button click
//   document.addEventListener('click', function(item) {
    
//     if(item.target.matches('.play-animation')) {
      
//       var siblingsArray = [];
      
//        siblingsArray = _siblings(item.target);
      
//       siblingsArray.forEach(function(item) {
      
//         var self = item;
      
//         animationToggle(self, 500);
      
//       });
      
//     }
    
//   });
  

//   function additionalElems(progressElement, value, skillName) {
  
//     //adding value
//     var valueChild = document.createElement('span');
//     valueChild.className = 'progress-bar__value';
//     valueChild.innerHTML = value +'%';
//     progressElement.appendChild(valueChild);
    
//     //adding bar area
//     var barChild = document.createElement('div');
//     barChild.className = 'progress-bar__bar';
//     progressElement.appendChild(barChild);
    
//     //adding inner area with the width of value
//     var barInnerChild = document.createElement('div');
//     barInnerChild.className = 'progress-bar__bar-inner';
//     barInnerChild.style.width = value + '%';
//     barChild.appendChild(barInnerChild);
   
  
//     //adding skillName
//     var skillChild = document.createElement('span');
//     skillChild.className = 'progress-bar__skill';
//     skillChild.innerHTML = skillName;
//     progressElement.appendChild(skillChild);
//   }
  
//   var progressBar = document.querySelectorAll('.progress-bar');
  

//   progressBar.forEach(function(item) {
    
//     var self = item,
//         barValue = self.getAttribute('data-value'),
//         skillValue = self.getAttribute('data-skill'),
//         effectNum = self.getAttribute('data-effect');
    
//     additionalElems(self, barValue, skillValue);
    
//     //adding special BEM classes to every progress bar element (to set classes for effects)
//     self.className += ' progress-bar--' + effectNum;
    
//     var valueElem = self.querySelector('.progress-bar__value');
      
//     valueElem.className += ' progress-bar__value--' + effectNum;
    
//     var barElem = self.querySelector('.progress-bar__bar');
    
//     barElem.className += ' progress-bar__bar--' + effectNum;
    
//     var barInnerElem = self.querySelector('.progress-bar__bar-inner');
    
//     barInnerElem.className += ' progress-bar__bar-inner--' + effectNum;
    
//     var skillElem = self.querySelector('.progress-bar__skill');
      
//       skillElem.className += ' progress-bar__skill--' + effectNum;
    
//     //adding alignment for values
//     if(self.classList.contains('progress-bar--aligned-values')) {
//        valueElem.style.left = barValue + '%';
//        valueElem.classList.add('progress-bar__value--aligned-value');
//     }
    
//     //adding additional class for no overflow hidden
//     if(self.classList.contains('progress-bar--no-overflow')) {
//        barElem.classList.add('progress-bar__bar--no-overflow');
//     }
    
//   })
  
//   //function for animation toggling
//   function animationToggle(progressElement, delay) {
    
//       var skillElem = progressElement.querySelector('.progress-bar__skill'),
//           valueElem = progressElement.querySelector('.progress-bar__value'),
//           skillBar = progressElement.querySelector('.progress-bar__bar-inner');
    
//     //removing animated classes, returning to start position
//     skillElem.classList.remove('js-animated');
//     valueElem.classList.remove('js-animated');
//     skillBar.classList.remove('js-animated');
    
//     //adding animated classes to start animation
//     setTimeout(function() {
//       skillElem.classList.add('js-animated');
//       valueElem.classList.add('js-animated');
//       skillBar.classList.add('js-animated');
//     }, delay);
//   }
  
//   //add animation onload
//   function onloadAnimation() {
    
//     progressBar.forEach(function(item) {
//       animationToggle(item, 500)
//     });
    
//   }
  
//   document.addEventListener("DOMContentLoaded", onloadAnimation());
















});

/*
    Simple templating
*/
app.directive('basicTemplate', function() {
    return {
        templateUrl: '../templates/basic-encoding.html'
    };
});
app.directive('tableViewTemplate', function() {
    return {
        templateUrl: '../templates/table-encoding.html'
    };
});
app.directive('headerTemplate', function() {
    return {
        templateUrl: '../templates/header.html'
    };
});
app.directive('sidebarTemplate', function() {
    return {
        templateUrl: '../templates/sidebar.html'
    };
});
app.directive('homepageTemplate', function() {
    return {
        templateUrl: '../templates/home-page.html'
    };
});
app.directive('modalTemplate', function() {
    return {
        templateUrl: '../templates/modal.html'
    };
});
app.directive('toolsTemplate', function() {
    return {
        templateUrl: '../templates/tools.html'
    };
});
app.directive('helpTemplate', function() {
    return {
        templateUrl: '../templates/help.html'
    };
});
app.directive('projectsTemplate', function() {
    return {
        templateUrl: '../templates/projects.html'
    };
});
app.directive('fileEncodingTemplate', function() {
    return {
        templateUrl: '../templates/file-encoding.html'
    };
});
app.directive('fileDecodingTemplate', function() {
    return {
        templateUrl: '../templates/file-decoding.html'
    };
});
