// Business logic

//Player Object Constructor

function Player(name) {
  this.name = name;
  this.turnRunningScore = 0;
  this.totalBankedScore;
  this.lastRoll;
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

// Get sum of Turn Running Total
Player.prototype.sumOfRolls = function() {
  console.log(this.currentTurnArray);
  this.turnRunningScore = this.turnRunningScore+this.currentTurnArray[0];
  this.currentTurnArray.forEach(function(num) {
  // debugger;
  });
}

// Loop to get running turn total into array inside player objects

// (Dice.prototype.roll).forEach(function(){
//   currentTurnRoll.push(lastRoll);
// });

// Dice.prototype.runningTurnTotal = function() {
//   var total = 0;
//   var total +=
// }

var sixSidedDice = new Dice();

// console.log(sixSidedDice.roll());

// Front end logic

$(function() {
  $("#player-one-roll").click(function(event) {
    event.preventDefault();
    debugger;
    var sixSidedDiceRoll = sixSidedDice.roll();

    // if (sixSidedDiceRoll === 1) {
    //   // Player.turnRunningScore = 0;
    //   // $("#player-one-running").hide();
    //   $("#player-one-rolls-one").show("1. Turn over!");
    //   // alert("You lose!");
    // } else {
      $("#player-one-running").html("<h1 class='running-total'>" + sixSidedDiceRoll + "</h1>");
    // }
    console.log(sixSidedDiceRoll);

    playerOne.addRollToArray(sixSidedDiceRoll);
    console.log(playerOne.turnRunningScore +","+ Array.isArray(playerOne.currentTurnArray));
    playerOne.sumOfRolls();

  });
});
