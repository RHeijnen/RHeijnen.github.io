window.onload = function(){
  var plus1 = document.getElementById("plus1");
  var plus2 = document.getElementById("plus2");
  var plus3 = document.getElementById("plus3");

  var min1 = document.getElementById("min1");
  var min2 = document.getElementById("min2");
  var min3 = document.getElementById("min3");

  var number1Value = 0;
  var number2Value = 0;
  var number3Value = 0;

  var targetCombination = [3, 5, 3]
  
  plus1.addEventListener("touchstart", function (e) {  
    //increase distance by tapping
    number1Value = plus(number1Value)
    $("#number1").text(number1Value);
  });

  plus2.addEventListener("touchstart", function (e) {  
    //increase distance by tapping
    number2Value = plus(number2Value)
    $("#number2").text(number2Value);    
  });

  plus3.addEventListener("touchstart", function (e) {  
    //increase distance by tapping
    number3Value = plus(number3Value)
    $("#number3").text(number3Value);    
  });

  min1.addEventListener("touchstart", function (e) {  
    //increase distance by tapping
    number1Value = minus(number1Value)
    $("#number1").text(number1Value);
  });

  min2.addEventListener("touchstart", function (e) {  
    //increase distance by tapping
    number2Value = minus(number2Value)
    $("#number2").text(number2Value);
  });

  min3.addEventListener("touchstart", function (e) {  
    //increase distance by tapping
    number3Value = minus(number3Value)
    $("#number3").text(number3Value);
  });

  function plus(number){
    if(number == 9){
      return 0;
    }else{
      return number + 1
    }
  }

  function minus(number){
    if(number == 0){
      return 9;
    }else{
      return number - 1
    }
  }

  function checkCombination(){
    var currentCombination = [number1Value, number2Value, number3Value]
    var i = targetCombination.length;
    while (i--) {
        if (currentCombination[i] !== targetCombination[i]) return false;
    }
    console.log("combination correct") 
    return true;
  }
}