var buttonColours = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "white"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var skillLevel = 0;
var score = 0;
var playerOneScore = 0;
var playerTwoScore = 0;
var numberOfDrumButtons = document.querySelectorAll(".drum").length;

////////////////////////////////////////////////////////////SIMON/////////////////////////////////////////////////////////////
$(window).ready(function(){
  $("#level-title").text("Simon Game - Press 'Enter' Key To Start");
});

$(document).ready(function() {
  if (document.title.includes("Simon")) {
    $(document).keypress(function(event) {
      if (event.which === 13) {
        if (!started) {
          $("#level-title").text("Select a skill level: Easy, Medium, or Hard");
          started = true; 
        }
      }
    });
  }
});

$(".btn").click(function() {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        score++;
        updateScore();
        nextSequence();
      }, skillLevel);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 8);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(skillLevel).fadeOut(skillLevel).fadeIn(skillLevel);
  playSound(randomChosenColour);
}

$(".level-btn").click(function() {
  var levelId = $(this).attr("id");
  if (levelId === "easy-button") {
    skillLevel = 1000;
  } else if (levelId === "medium-button") {
    skillLevel = 500;
  } else if (levelId === "hard-button") {
    skillLevel = 100;
  }

  $("#level-title").text("Simon Game");
  document.getElementById("hide-level").style.display = "none";
  started = true;
  nextSequence();
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, skillLevel);
}

function playSound(name) {
  var audio = new Audio("./wwwroot/sounds/" + name + ".mp3");
  audio.play();
}

function updateScore() {
  $("#score-value").text(score);
}

function startOver() {
  score = 0;
  updateScore();
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  document.getElementById("hide-level").style.display = "block";
}

/////////////////////////////////////////////////////////////DICE//////////////////////////////////////////////////////////////////////
function randomRoll() {
  var rollCount = 10;
  var rollInterval = 50;

  function updateDiceImages(randomNumber1, randomNumber2) {
    var randomImageSource1 = "./wwwroot/image/dice" + randomNumber1 + ".png";
    var randomImageSource2 = "./wwwroot/image/dice" + randomNumber2 + ".png";

    document.querySelectorAll("img")[0].setAttribute("src", randomImageSource1);
    document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);
  }

  function showResult(randomNumber1, randomNumber2) {
    updateDiceImages(randomNumber1, randomNumber2);

    if (randomNumber1 > randomNumber2) {
      document.querySelector("h1").innerHTML = "🚩Player 1 wins!";
      playerOneScore++;
    } else if (randomNumber2 > randomNumber1) {
      document.querySelector("h1").innerHTML = "🚩Player 2 Wins!";
      playerTwoScore++;
    } else {
      document.querySelector("h1").innerHTML = "Draw!";
    }

    document.getElementById("playerone-score-value").textContent = playerOneScore;
    document.getElementById("playertwo-score-value").textContent = playerTwoScore;
  }

  function shuffleDice() {
    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;

    updateDiceImages(randomNumber1, randomNumber2);

    rollCount--;

    if (rollCount > 0) {
      setTimeout(shuffleDice, rollInterval);
    } else {
      showResult(randomNumber1, randomNumber2);
    }
  }

  shuffleDice();
}
////////////////////////////////////////////////////////////DRUM////////////////////////////////////////////////////////////////
for (var i = 0; i < numberOfDrumButtons; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

$(document).ready(function() {
  if (document.title.includes("Drum")) {
    document.addEventListener("keypress", function(event) {
      var key = event.key;
      if (isDrumKey(key)) {
        makeSound(key);
        buttonAnimation(key);
      }
    });
  }
});

function makeSound(key) {

  switch (key) {
    case "w":
      var tom1 = new Audio("./wwwroot/sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("./wwwroot/sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio('./wwwroot/sounds/tom-3.mp3');
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio('./wwwroot/sounds/tom-4.mp3');
      tom4.play();
      break;

    case "j":
      var snare = new Audio('./wwwroot/sounds/snare.mp3');
      snare.play();
      break;

    case "k":
      var crash = new Audio('./wwwroot/sounds/crash.mp3');
      crash.play();
      break;

    case "l":
      var kick = new Audio('./wwwroot/sounds/kick-bass.mp3');
      kick.play();
      break;


    default: console.log(key);

  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

function isDrumKey(key) {
  var drumKeys = ["w", "a", "s", "d", "j", "k", "l"];
  return drumKeys.includes(key);
}




