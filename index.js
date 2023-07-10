// generate random color
let buttonColours = ['red', 'blue', 'green', 'yellow']

let gamePattern = []
let userClickedPattern = []

let start = true
let level = 0

// detect when the keyborad is pressed to start the game
$(document).keydown(function() {

    if (start) {
        
        nextSequence()

    }
    start = false

})

// user gameplay
$('.btn').click(function() {

    let userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1)

})

// computer gameplay
function nextSequence(){

    level++
    $('#level-title').text('Level '+ level)

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $('#' + randomChosenColour).fadeOut(300).fadeIn(300)

    playSound(randomChosenColour)

}

// play sound
function playSound(name){

    let audio = new Audio('sounds/'+ name + '.mp3')
    audio.play()

}

// play animation
function animatePress(currentColor){

    $('#' + currentColor).addClass('pressed')

    setTimeout(function() {

        $('#' + currentColor).removeClass('pressed')

    }, 100)
}


// check the anser of player and computer
function checkAnswer(currentLevel) {
    
    // check the user vs game 
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        
        if(userClickedPattern.length === gamePattern.length) {

            setTimeout(() => {
                nextSequence()
            }, 1000);

            userClickedPattern = []

        }

    } else {
        
        playSound('wrong')

        $('body').addClass('game-over')
        setTimeout(() => {

            $('body').removeClass('game-over')

        }, 200);

        $('#level-title').text('Game Over, Press Any Key to Restart')

        startOver()

    }

}

// restart the game 
function startOver(){

    level = 0
    gamePattern = []
    start = true
    userClickedPattern = []

}