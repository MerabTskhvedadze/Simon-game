/********************** constants ***********************/

    //stores buttons
var buttonColors = ["red", "blue", "green", "yellow"];

    //stores randomed chosen colors
var gamePattern = [];

    //stores info about which buttons was pressed
var userClickedPattern = [];

    //stores levels
var started = false;
var level = 0;

/********************* sellectors and callback functions ********************/

$(document).keypress(function () { 
    if (!started) {
        $('#level-title').text('Level ' + level)
        nextSequence();
        started = true;
    }
});

    //detects which buttons was pressed and sends info in userClickedPattern array
$('.btn').click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    //2
    checkAnswer(userClickedPattern.length-1);
});

/********************** functions **********************/
    //checks if users answer was correct
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else if(gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
        console.log('wrong');
            //plays wrong music at wrong button
        var wrong = new Audio('sounds/wrong.mp3')
        wrong.play();
            //makes red body at wrong button
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200)
            //change h1 text
        $('#level-title').text('Game Over, Press Any Key to Restart');

        startOver();
    }

}

    //makes game pattern
function nextSequence() {
    userClickedPattern = [];

        //increments level by 1
    level++
        //changes h1 text 
    $('#level-title').text('Level '+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

    //gets sound option to buttons
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

    //makes animation of buttons
function animatePress(currentColor) {
        //adds pressed class in clicked button
    $('#' + currentColor).addClass("pressed");
        //removes added classes from clicked button
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

    //restarts the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}