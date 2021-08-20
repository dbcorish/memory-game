// initial set-up of variables
// stores sequence of colours
var colours = [];
//stores player's answer sequence
var answer = [];
var score = 0;
var highscore = 0;
// affects speed of sequence
var speed = 900;
// boolean used in recording score, consulted https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
var answerCorrect = new Boolean(true);
// variables used in timer function
var myTimerIsRunning = new Boolean(false);
var timerStartCheck = new Boolean(false);
var timerStart = 0;

// starts the game
function start() {
    // resets timer
    timerStartCheck = false;
    myTimerIsRunning = false;
    document.getElementById("timer").innerHTML =
        "Timer: " + 5 + " seconds";
    // reset colours and answer
    colours = [];
    answer = [];
    // reset boolean for checking if player answer is correct
    answerCorrect = true;
    // reset score on right hand side of board
    score = colours.length;
    document.getElementById("score").innerHTML = "0" + score;
    // reset speed
    speed = 900;
    // set game status indicator to green
    document.getElementById("game-status").style.backgroundColor =
        "lime";
    // waits 0.2 seconds
    addColour(); // consulted https://www.w3schools.com/jsref/met_win_settimeout.asp
}

// adds colour to list of colours
function addColour() {
    // reset player's answer for the next round
    answer = [];
    // selects button to light by randomly generating a number between 1 and 4
    // consulted https://www.w3schools.com/js/js_random.asp and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
    var light = Math.floor(Math.random() * 4) + 1;
    colours.push(light); // consulted https://www.w3schools.com/jsref/jsref_push.asp
    // functionality for changing speed of game depending on player's progress
    if (colours.length == 5) {
        speed = 700;
    }
    if (colours.length == 9) {
        speed = 500;
    }
    if (colours.length == 13) {
        speed = 300;
    }
    // displays sequence of colours with the new colour added
    showColours(colours.length, 0, speed);
    // delays timer start until full sequence of colours shown, there is a slight leeway of 500ms as an immediate start felt unfair to the player
    setTimeout(
        delayTimerStart,
        colours.length * speed + speed + 500
    );
}

// constructed timer with consulation of https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
function timer() {
    // ensures timer doesn't constantly reset itself
    if (timerStartCheck) {
        timerStart = Date.now();
        timerStartCheck = false;
    }
    // boolean stops timer running in cases such as after game over screen
    if (myTimerIsRunning) {
        var delta = Date.now() - timerStart; // time elapsed since start
        delta = Math.round(delta) / 1000; // round number
        delta = 5 - delta; // make it a countdown instead of an increasing timer
        delta = delta.toFixed(1); // round to 1 decimal place for neatness, https://www.w3schools.com/jsref/jsref_tofixed.asp
        document.getElementById("timer").innerHTML =
            "Timer: " + delta + " seconds"; // update timer
        // game over if timer gets to 0
        if (delta <= 0) {
            gameOver();
        }
    }
}

// makes sure that timer doesn't start until full sequence of colours has been shown, https://www.w3schools.com/jsref/met_win_clearinterval.asp
function delayTimerStart() {
    timerStartCheck = true;
    myTimerIsRunning = true;
    var myTimer = setInterval(timer, 100);
}

// loop that displays colours in sequence, consulted https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop/44476626
function showColours(i, j, speed) {
    if (i <= 0) return;
    setTimeout(function() {
        flash(colours[j], speed);
        showColours(--i, ++j, speed);
    }, speed + 100);
}

// flashes button depending on which number is passed into function, returns to original colour after time depending on speed variable
function flash(button, speed) {
    if (button == 1) {
        document.getElementById("1").style.backgroundColor = "lime";
        setTimeout(function() {
            document.getElementById("1").style.backgroundColor =
                "green";
        }, speed);
    }
    if (button == 2) {
        document.getElementById("2").style.backgroundColor = "red";
        setTimeout(function() {
            document.getElementById("2").style.backgroundColor =
                "indianred";
        }, speed);
    }
    if (button == 3) {
        document.getElementById("3").style.backgroundColor =
            "yellow";
        setTimeout(function() {
            document.getElementById("3").style.backgroundColor =
                "goldenrod";
        }, speed);
    }
    if (button == 4) {
        document.getElementById("4").style.backgroundColor = "blue";
        setTimeout(function() {
            document.getElementById("4").style.backgroundColor =
                "cornflowerblue";
        }, speed);
    }
    // this is for the game over function, flashing all buttons simultaneously, also flashes game status indicator
    if (button == 5) {
        document.getElementById("1").style.backgroundColor = "lime";
        document.getElementById("2").style.backgroundColor = "red";
        document.getElementById("3").style.backgroundColor =
            "yellow";
        document.getElementById("4").style.backgroundColor = "blue";
        setTimeout(function() {
            document.getElementById("1").style.backgroundColor =
                "green";
            document.getElementById("2").style.backgroundColor =
                "indianred";
            document.getElementById("3").style.backgroundColor =
                "goldenrod";
            document.getElementById("4").style.backgroundColor =
                "cornflowerblue";
        }, speed);
    }
}

// a function for when the player clicks a button
function playerClick(number) {
    document.getElementById("timer").innerHTML =
        "Timer: " + 5 + " seconds";
    // quickly flashes to acknowledge user input
    flash(number, 300);
    // adds colour to player's answer
    answer.push(number);
    timerStartCheck = true;
    check();
}

// checks player's answer
function check() {
    // loops through answers so far, comparing it to colours
    for (var i = 0; i < answer.length; i++) {
        if (colours[i] != answer[i]) {
            // sets x to be false to prevent score updating when player is incorrect
            answerCorrect = false;
            gameOver();
        }
    }
    if (answer.length == colours.length) {
        // update player's score on right hand part of board but only if player's answer is correct
        if (answerCorrect) {
            myTimerIsRunning = false;
            score = colours.length;
            document.getElementById("score").innerHTML =
                "0" + score;
            setTimeout(addColour, 500);
        }
    }
}

// game over
function gameOver() {
    // set game status indicator to red
    document.getElementById("game-status").style.backgroundColor =
        "red";
    // flashes all buttons simultaneously five times and ultimately resets game status indicator to red
    setTimeout(function() {
        flash(5, 250);
    }, 250);
    setTimeout(function() {
        flash(5, 250);
    }, 750);
    setTimeout(function() {
        flash(5, 250);
    }, 1250);
    setTimeout(function() {
        flash(5, 250);
    }, 1750);
    setTimeout(function() {
        flash(5, 250);
    }, 2250);

    // set player score
    score = colours.length - 1;

    // check if it's a new high score
    if (score > highscore) {
        highscore = score;
        document.getElementById("high-score").innerHTML =
            "0" + highscore;
    }

    // stops timer
    myTimerIsRunning = false;
    // reset colours and answers array
    colours = [];
    answer = [];
    // resets timer to original message
    document.getElementById("timer").innerHTML =
        "Timer: If timer gets to 0, game over!";
}