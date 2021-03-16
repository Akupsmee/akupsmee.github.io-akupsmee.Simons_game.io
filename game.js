var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// for the first key pressed call the nextSequence()
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started = true;
    }
})
//console.log(userClickedPattern);

// on click button should playsound and animate as well as push its content to userClickedPattern
$(".btn").on('click',function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePressed(userChosenColour)

// users input collection
    checkAnswer(userClickedPattern.length-1)
});


function checkAnswer (currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
       // console.log("success")
        if(userClickedPattern.length === gamePattern.length){
           setTimeout(function(){
             nextSequence();
            },1000);       
        }

    }else {
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")

        setTimeout(function() {
            $("body").removeClass("game-over")
        },200);

        startOver();
        
    }

}



function nextSequence(){
userClickedPattern = [];    
level++;
$("#level-title").text("level "+ level);
var randomNumber = Math.floor(Math.random()* 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
// play sound and animate when clicked
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}


// animate function, add and remove animation after 100ms
function animatePressed(currentColour){
    $("#" +currentColour).addClass("pressed")
    setTimeout(function(){
      $("#" + currentColour).removeClass('pressed');  
    },100)  
}    


function playSound(name){
     //audio
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();  
}

function startOver(){
    $("#level-title").text("Press A Key to Start");
    level = 0;
    gamePattern = [];
    started =false;
}

