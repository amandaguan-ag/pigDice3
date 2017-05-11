// Business logic

//Player Object Constructor

function Player(name) {
  this.name = name;
  this.turnRunningScore = 0;
  this.totalBankedScore = 0;
  this.lastRoll = 0;
  this.currentTurnArray = [];
}

//Creates our two players
var playerOne = new Player("Player One");
var playerTwo = new Player("Player Two");
console.log(playerOne, playerTwo);

// Dice Constructor (argument = number of sides you want. default = 6)

function Dice(sides) {
  this.sides = sides || 6;
}

// Roll Prototype - Gets a random number between 1 and 6
Dice.prototype.roll = function() {
  var roll = Math.floor((Math.random() * this.sides ) + 1);
  if (roll === 1) {
    alert("hey");
  }
  return roll;
}

// Current Turn Array Prototype
Player.prototype.addRollToArray = function (x) {
  this.currentTurnArray.push(x)
}

// Get sum of Turn Running Total (and exclude 1s from total)
Player.prototype.sumOfRolls = function() {
  console.log(this.currentTurnArray);
  for (var i = 0; i < this.currentTurnArray.length; i++) {
    if (this.currentTurnArray[i = this.currentTurnArray.length - 1] === 1) {
      this.turnRunningScore = this.turnRunningScore
    } else {
      this.turnRunningScore += this.currentTurnArray[i = this.currentTurnArray.length - 1];
      console.log(this.turnRunningScore);
    }
  }
}
console.log(playerOne.turnRunningScore);

// Bank points
Player.prototype.bankPoints = function() {
  this.totalBankedScore += this.turnRunningScore;
}

// Hold/Stay turnRunningScore <--Added this, score will bank when a user presses stay

Player.prototype.stayTurn = function () {
  var stayButton = document.getElementById("player-one-stay");

  stayButton.onclick = function() {
  document.getElementById("stay").innerText = "Pass the keyboard along! You have chosen to stay your turn.";
 }
  playerOne.bankPoints();
  playerOne.turnRunningScore = 0;
}


// End game when player score reaches 100 <--Added this, but alert doesn't pop up when banked score reaches 100

Player.prototype.winGame = function () {
  if (this.totalBankedScore >= 100) {
    alert("We have a winner!");
  }
}

// Create six-sided dice
var sixSidedDice = new Dice();
// console.log(sixSidedDice.roll());

//Prototype to enter last roll value into player object
// Player.prototype.lastRoll = function(x) {
//   this.lastRoll = x
// }


// Front end logic

$(function() {
  $("#player-one-roll").click(function(event) {
    event.preventDefault();
    var sixSidedDiceRoll = sixSidedDice.roll();

    // playerOne.lastRoll(sixSidedDiceRoll);
    // Object.defineProperty(playerOne, lastRoll)
    playerOne.addRollToArray(sixSidedDiceRoll);
    playerOne.sumOfRolls();
    playerOne.winGame();

    $("#player-one-running").html("<h1 class='running-total'>" + playerOne.turnRunningScore + "</h1>");

    console.log(sixSidedDiceRoll);

    if (sixSidedDiceRoll === 1) {
      $("#test").attr("src", "img/one.png");
    } else if (sixSidedDiceRoll === 2) {
      $("#test").attr("src", "img/two.png");
    } else if (sixSidedDiceRoll === 3) {
      $("#test").attr("src", "img/three.png");
    } else if (sixSidedDiceRoll === 4) {
      $("#test").attr("src", "img/four.png");
    } else if (sixSidedDiceRoll === 5) {
      $("#test").attr("src", "img/five.png");
    } else if (sixSidedDiceRoll === 6) {
      $("#test").attr("src", "img/six.png");
    }



  });

  // Undefined is displaying when clicked, want to display message about turn stay

$("#player-one-stay").click(function(event) {
  event.preventDefault();
  playerOne.stayTurn();
      $("#hold").html("<h1 class='running-total'>" + playerOne.stayButton() + "</h1>");
  });
});
