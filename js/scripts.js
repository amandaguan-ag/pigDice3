// Business logic

//Player Object Constructor

var Player = function(name) {
  this.name = name;
  this.lastRoll =
  this.turnRunningScore = 0;
  this.totalBankedScore =
  this.currentTurnArray = [];
}

var playerOne = new Player("Player One");
var playerTwo = new Player("Player Two");
console.log(playerOne, playerTwo);


// var playerOne = {
//   lastRoll: "",
//   turnRunningScore: 0,
//   currentTurnArray: [],
//   totalBankedScore:"",
// }
//
// var playerTwo = {
//   lastRoll: "",
//   turnRunningScore: 0,
//   currentTurnArray: [],
//   totalBankedScore:"",
// }

// Gets a random number between 1 and 6

var Dice = function(sides) {
  this.sides = sides || 6;
}

// Roll Prototype
Dice.prototype.roll = function() {
  return Math.floor((Math.random() * this.sides ) + 1);
}

// Current Roll Array Prototype


// Add roll to array
var rollArray = [];
function addRoll(x) {
  rollArray.push(x);
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
  $("#player-one-roll, #player-two-roll").click(function(event) {
    event.preventDefault();
    sixSidedDice.roll();
    console.log(sixSidedDice.roll());
    $("#player-one-running").html("<h1 class='running-total'>" + sixSidedDice.roll() + "</h1>");



  });
});
