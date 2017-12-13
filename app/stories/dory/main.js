window.addEventListener('load', function(){ // on page load
    
    $("#next").click(function(){
        $("#text").text("blablabla")
        var imageUrl = "./dory2.jpg"
        $("#container").css('background-image', 'url(' + imageUrl + ')');
    });
});

