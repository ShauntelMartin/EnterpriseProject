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


/////////////////////////////////////Dice Game////////////////////////////////////////////////

function randomRoll(){
    var randomNumber1 = Math.floor(Math.random() * 6) + 1; //1-6

    var randomDiceImage = "dice" + randomNumber1 + ".png"; //dice1.png - dice6.png

    var randomImageSource = "./wwwroot/image/dice_images/" + randomDiceImage; //images/dice1.png - images/dice6.png

    var image1 = document.querySelectorAll("img") [0];

    image1.setAttribute("src", randomImageSource);



    var randomNumber2 = Math.floor(Math.random() * 6) + 1; //1-6

    var randomImageSource2 = "./wwwroot/image/dice_images/dice" + randomNumber2 + ".png";

    document.querySelectorAll("img") [1].setAttribute("src", randomImageSource2);

    //If player 1 wins
    if (randomNumber1 > randomNumber2) {
        document.querySelector("h3").innerHTML = "🚩Player 1 wins!";
    }
    else if (randomNumber2> randomNumber1) {
        document.querySelector("h3").innerHTML ="🚩 Player 2 Wins!";
    }
    else{
        document.querySelector("h3").innerHTML="Draw!" ;
    }
}

/////////////////////////////////////Simon Game////////////////////////////////////////////////
$(window).ready(function(){
  $("#level-title").text("Simon Game - Press 'Enter' Key To Start");
});

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Select a skill level: Easy, Medium or Hard");
  }
});

$(".btn-sim").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        score++;
        updateScore();
        nextSequence();
      }, 1000);
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


/////////////////////////////////////Drum Game////////////////////////////////////////////////

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
