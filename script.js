var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;
//Detect the key for Start the game
$(document).keypress(function (event) {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
$(".btn").click(function () {
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor)
    playSound(userChoosenColor)
    animatepress(userChoosenColor)
    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        var song = new Audio("sounds/wrong.mp3");
        song.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    playSound(randomChoosenColor)
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(key) {
    var audio = new Audio(`./sounds/${key}.mp3`);
    audio.play();
}

function animatepress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 100);
}
//1. Create a new function called startOver().
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }