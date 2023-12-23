
var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;
$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animation(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000)
        }
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animation(chosenColor){
    $("#" + chosenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + chosenColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    start=false;
    level=0;
    gamePattern=[];
}