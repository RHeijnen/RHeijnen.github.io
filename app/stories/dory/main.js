window.addEventListener('load', function(){ // on page load
    var splashModal = document.getElementById('splashModal');
    var game1Modal  = document.getElementById('game1modal');
    var decisionModal = document.getElementById('decisionModal');
    var additionStoryLine = ""
        
    var stage = 1;
    var textArray = [
        "arrays_start_at_1",

        `Op een dag zwom Dory een beetje door het koraal. 

        Opeens kwam daar Bailey aan. Hij zag er opgewonden uit.`,

        `‘Dory! Ik heb héél spannend nieuws.’
        ‘Wat is er aan de hand Baily?’
        ‘Even hier vandaan is een schip gezonken! Drie keer raden wat er in zit!’
        ‘Ehm, heel veel kreeft?
        ‘Nee gekkie, we weten het eigenlijk niet, maar we hebben wel een code gevonden.
        ‘Maar waarom moet ik helpen?`,

        `‘Ik ben veel te groot om dat schip in te gaan, daarom!’
        ‘Oke, wat krijg ik er voor terug?’
        ‘Een goed verhaal?’
        ‘Oke, oke, ik doe mee!’
        ‘Cool! Hier heb je de code van de kluis, waarschijnlijk kun je hem hiermee openen.’`,

        `‘Maar waar is het schip Bailey?’
        ‘Het schip is best ver weg. Als je op de stroom van Crush gaat moet je bij het groene zeewierwoud afgezet worden. Daar moet je doorheen, als het goed is kan je het schip dan al zien liggen.’
        ‘Oke, dan ga ik wel even langs Crush voor een lift.’`,

        `Na eventjes zwemmen vind Dory Crush. Crush is aan het spelen met z’n kinderen als Dory aan komt zwemmen.`,

        `‘Hey Crush, zou ik je wat mogen vragen?’
        ‘Dory man, tuurlijk mag jij mij iets vragen, dat heb jij zojuist al gedaan haha. Nee grapje man. Wat is er?’
        ‘Ik heb een lift nodig op je de waterstroom waar jij altijd op surft.’
        ‘Dat is mogelijk! Waar moet je naartoe?’
        ‘Naar het groene zeewierwoud’`,

        `Crush kijkt geschrokken naar Dory.

        ‘Het groene zeewierwoud? Dat is wel ver weg Dory!’
        ‘Ik weet het Crush, maar het moet.’
        ‘Oke, ik breng je wel!’
        ‘Bedankt Crush!’
        ‘Laten we gaan!’`,

        `Crush en Dory zwemmen naar de stroom waar ze op gaan surfen. Om een goede start te maken is het belangrijk om de stroom compleet te maken.`,

        
        `Dory en Crush komen aan bij het woud. Crush zegt Dory gedag en springt de stroom weer in.

        Dory ziet het woud. Het is er donker, zo donker dat ze er rillingen van krijgt.
        
        Dory verzameld wat moed en gaat het woud in.`,

        `Na even gezwommen te hebben komt ze aan het einde. Ze ziet het gezonken schip nog niet. Voor zich ziet ze een donkere grot en daarboven open water.

        Ze moet kiezen. Door het open water met vissers of door de donkere grot.`,

        ``,

        `Plots hoort ze iets achter zich. Ze kijkt om en ziet een hele grote HAAI!

        ‘Ik heb wel zin in een lekker hapje, Muhaha’
        
        Dory schrikt.
        
        ‘Ik ben helemaal geen lekker hapje hoor.’`,

        `‘Ik ben helemaal niet zo vol, eigenlijk alleen maar graat!’
        ‘Oh graat! Maakt niets uit, daar worden mijn scherpe tanden juist lekker schoon van!’
        
        Dory laat het er niet op aankomen en ze zwemt zo hard mogelijk als ze kan weg!`,



        `Ze heeft de schol ontweken. Nu is het belangrijk om op zoek te gaan naar de kluis en deze van het slot te halen.

        Na een aantal kamers gehad te hebben ziet ze door een raampje de kluis. Ze gaat naar binnen.
        
        Ze pakt de code erbij die Bailey haar heeft gegeven.`,
        
        `Ze heeft de schol ontweken. Nu is het belangrijk om op zoek te gaan naar de kluis en deze van het slot te halen.

        Na een aantal kamers gehad te hebben ziet ze door een raampje de kluis. Ze gaat naar binnen.

        
        Ze pakt de code erbij die Bailey haar heeft gegeven.`,

        `In de kluis liggen wat papieren, maar ook een hele mooie parel. Ze pakt hem op en neemt hem mee naar buiten.

        Daar is Bailey.
        ‘Heel erg bedankt Dory!’
        ‘Graag gedaan, het was wel een avontuur maar het was het waard!’
        ‘Mooi, kom we gaan terug naar het koraal.’`


    ]
    $("#text").text(textArray[stage])
    var imageUrl = "./dory"+stage+".png"
    $("#container").css('background-image', 'url(' + imageUrl + ')');
    $("#decisionA").click(function(){
        additionStoryLine = "A"
        $("#text").text(`Dory heeft gekozen om via het open water te gaan. Ze vertrouwde de grot niet helemaal.

        In het openwater ziet ze wel heel erg veel vishaken. Ze moet de vishaken ontwijken om niet perongeluk gevangen te worden.`)
        var imageUrl = "./dory"+stage+additionStoryLine+".png"
        $("#container").css('background-image', 'url(' + imageUrl + ')');
        decisionModal.style.display ="none"
    })
    $("#decisionB").click(function(){
        additionStoryLine = "B"
        $("#text").text('Dory heeft gekozen om via de grot te gaan. Ze vertrouwt het niet helemaal, maar het lijkt rustig. Ze kan in de verte al het einde van de grot zien.')
        var imageUrl = "./dory"+stage+additionStoryLine+".png"
        $("#container").css('background-image', 'url(' + imageUrl + ')');
        decisionModal.style.display ="none"

    })
    $("#next").click(function(){
        stage = stage +1;
        if(stage == 12 && additionStoryLine === "A"){
            additionStoryLine = ""
            game1Modal.style.display = "block";
            $("#text").text(`Goed gedaan! Dory heeft het gered en is niet gevangen.
            In de verte ziet ze het schip waar ze in de zijkant een gat ziet zitten. Daar past ze wel doorheen!
            Zodra ze binnenkomt in de boot, komt er een schol vissen op haar af! Snel duik weg!`)
            stage = 15;
            var imageUrl = "./dory"+stage+".png"
            $("#container").css('background-image', 'url(' + imageUrl + ')');
        }


        if(stage == 14 && additionStoryLine === "B"){
            game1Modal.style.display = "block";
            $("#text").text(`Gelukkig! Dory heeft het gered. De haai kon haar niet te pakken krijgen.
            In de verte ziet ze het gezonken schip. In de zijkant zit een gat, daar past ze wel door.
            Zodra ze binnenkomt in de boot, komt er een schol vissen op haar af! Snel duik weg!`)
            var imageUrl = "./dory"+stage+additionStoryLine+".png"
            $("#container").css('background-image', 'url(' + imageUrl + ')');
        }


        if(stage == 15){
            game1Modal.style.display = "block";
            var imageUrl = "./dory"+stage+additionStoryLine+".png"
            $("#container").css('background-image', 'url(' + imageUrl + ')');
            if(additionStoryLine == 'B'){
                $("#text").text(`Gelukkig! Dory heeft het gered. De haai kon haar niet te pakken krijgen.

                In de verte ziet ze het gezonken schip. In de zijkant zit een gat, daar past ze wel door.
                
                Zodra ze binnenkomt in de boot, komt er een schol vissen op haar af! Snel duik weg!`)
                additionStoryLine = ""

            }else{
                $("#text").text(textArray[stage])
                additionStoryLine = ""

            }            
        }

        if(stage == 16){
            game1Modal.style.display = "block";
            $("#text").text(textArray[stage])
            var imageUrl = "./dory"+stage+additionStoryLine+".png"
            $("#container").css('background-image', 'url(' + imageUrl + ')');
        }

        if(stage == 17){
            alert("tadaaa")
        }

        if(stage == 9){
            game1Modal.style.display = "block";
            $("#text").text(textArray[stage])
            var imageUrl = "./dory"+stage+additionStoryLine+".png"
            $("#container").css('background-image', 'url(' + imageUrl + ')');
        }else if(stage == 11){
            decisionModal.style.display = "block";
            
        }else{
            if(stage != 14){
                $("#text").text(textArray[stage])
                var imageUrl = "./dory"+stage+additionStoryLine+".png"
                $("#container").css('background-image', 'url(' + imageUrl + ')');
            
            }


        }

    });
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == splashModal) {
            splashModal.style.display = "none";
        }
        // turn this of later
        if (event.target == game1Modal) {
            game1Modal.style.display = "none";
        }


    }
});

