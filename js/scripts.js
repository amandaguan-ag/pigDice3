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

// Dice Constructor (argument = number of sides you want. default = 6)
function Dice(sides) {
  this.sides = sides || 6;
}

// Roll Prototype - Gets a random number between 1 and 6
Dice.prototype.roll = function() {
  var roll = Math.floor((Math.random() * this.sides ) + 1);
  if (roll === 1) {
    alert("Doh! You rolled a 1. Your turn is over.");
  }
  return roll;
}

// Current Turn Array Prototype
Player.prototype.addRollToArray = function (x) {
  this.currentTurnArray.push(x)
}

// Get sum of Turn Running Total (and exclude 1s from total)
Player.prototype.sumOfRolls = function() {
  for (var i = 0; i < this.currentTurnArray.length; i++) {
    if (this.currentTurnArray[i = this.currentTurnArray.length - 1] === 1) {
      this.turnRunningScore = this.turnRunningScore;
    } else {
      this.turnRunningScore += this.currentTurnArray[i = this.currentTurnArray.length - 1];
    }
  }
}
// Prototype to Bank points
Player.prototype.bankPoints = function() {
  this.totalBankedScore += this.turnRunningScore;
}

// Hold/Stay turnRunningScore <--Added this, score will bank when a user presses stay
Player.prototype.stayTurn = function () {
  this.bankPoints();
  this.turnRunningScore = 0;
}

// Create six-sided dice
var sixSidedDice = new Dice();

//Prototype to enter last roll value into player object
Player.prototype.setLastRoll = function(x) {
  this.lastRoll = x;
}

// Prototype to reset running total if 1 is rolled
Player.prototype.resetRunningTotalOnOne = function() {
  if (this.lastRoll === 1) {
    this.turnRunningScore = 0;
  }
}

// FRONT END LOGIC

window.addEventListener("load", function () {
  var playerOneTurn = true;

  //PLAYER ONE
  document.getElementById("player-one-roll").addEventListener("click", function () {
    var animationName = 'animated tada';
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    document.getElementById("dice-pic").classList.add(animationName);
    document.getElementById("dice-pic").addEventListener(animationEnd, function () {
      this.classList.remove(animationName);
    }, {once: true});
  });
  //Player One Roll Button Click Event
  document.getElementById("player-one-roll").addEventListener("click", function (event) {
    event.preventDefault();
    var sixSidedDiceRoll = sixSidedDice.roll();
    playerOne.setLastRoll(sixSidedDiceRoll);
    playerOne.resetRunningTotalOnOne(sixSidedDiceRoll);
    playerOne.addRollToArray(sixSidedDiceRoll);
    playerOne.sumOfRolls();

    document.getElementById("player-one-running").innerHTML = "<h1 class='running-total'>" + playerOne.turnRunningScore + "</h1>";

    //Change image based on dice roll, AND switch player turn
    if (sixSidedDiceRoll === 1) {
      document.getElementById("dice-pic").src = "img/one.png";
      playerOneTurn = false;
      if (!playerOneTurn) {
        document.getElementById("player-two-buttons").style.display = "block";
        document.getElementById("player-one-buttons").style.display = "none";
      } else {
        document.getElementById("player-one-buttons").style.display = "block";
        document.getElementById("player-two-buttons").style.display = "none";
      }
    } else if (sixSidedDiceRoll === 2) {
      document.getElementById("dice-pic").src = "img/two.png";
    } else if (sixSidedDiceRoll === 3) {
      document.getElementById("dice-pic").src = "img/three.png";
    } else if (sixSidedDiceRoll === 4) {
      document.getElementById("dice-pic").src = "img/four.png";
    } else if (sixSidedDiceRoll === 5) {
      document.getElementById("dice-pic").src = "img/five.png";
    } else if (sixSidedDiceRoll === 6) {
      document.getElementById("dice-pic").src = "img/six.png";
    }
  });

  //Player One Stay Button Click Event
  document.getElementById("player-one-stay").addEventListener("click", function (event) {
    event.preventDefault();

    playerOne.stayTurn();
    document.getElementById("player-one-running").innerHTML = "<h1 class='running-total'>" + playerOne.turnRunningScore + "</h1>";
    document.getElementById("player-one-score").innerHTML = "<h1 class='total-score'>" + playerOne.totalBankedScore + "</h1>";

    if (playerOne.totalBankedScore >= 20) {
      document.getElementById("winner").style.display = "block";
      document.getElementById("winner").innerHTML = "<h1 class='total-score'>" + "You win!!!" + "</h1>";
    } else {
      document.getElementById("winner").textContent = "";
    }

    playerOneTurn = false;

    // $button set playerTwo
    if (!playerOneTurn) {
      document.getElementById("player-two-buttons").style.display = "block";
      document.getElementById("player-one-buttons").style.display = "none";
    } else {
      document.getElementById("player-two-buttons").style.display = "none"
      document.querySelector("#player-one-buttons").style.display = "block";
    }

  /// PLAYER TWO

  //Roll Button Click Event

  document.querySelector("#player-two-roll").addEventListener("click", function(event) {
    event.preventDefault();
    var sixSidedDiceRoll = sixSidedDice.roll();
    playerTwo.setLastRoll(sixSidedDiceRoll);
    playerTwo.resetRunningTotalOnOne(sixSidedDiceRoll);
    playerTwo.addRollToArray(sixSidedDiceRoll);
    playerTwo.sumOfRolls();
    
    document.querySelector("#player-two-running").innerHTML = "<h1 class='running-total'>" + playerTwo.turnRunningScore + "</h1>";
    
    //Change image based on dice roll, AND swith player turn
    if (sixSidedDiceRoll === 1) {
    document.querySelector("#dice-pic").src = "img/one.png";
    var playerOneTurn = true;
    if (playerOneTurn) {
    document.querySelector("#player-one-buttons").style.display = "block";
    document.querySelector("#player-two-buttons").style.display = "none";
    } else {
    document.querySelector("#player-two-buttons").style.display = "block";
    document.querySelector("#player-one-buttons").style.display = "none";
    }
    } else if (sixSidedDiceRoll === 2) {
    document.querySelector("#dice-pic").src = "img/two.png";
    } else if (sixSidedDiceRoll === 3) {
    document.querySelector("#dice-pic").src = "img/three.png";
    } else if (sixSidedDiceRoll === 4) {
    document.querySelector("#dice-pic").src = "img/four.png";
    } else if (sixSidedDiceRoll === 5) {
    document.querySelector("#dice-pic").src = "img/five.png";
    } else if (sixSidedDiceRoll === 6) {
    document.querySelector("#dice-pic").src = "img/six.png";
    }
    });
    
    // Player Two animationEnd
    document.querySelector("#player-two-roll").addEventListener("click", function() {
    var animationName = 'animated tada';
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    document.querySelector("#dice-pic").classList.add(animationName);
    document.querySelector("#dice-pic").addEventListener(animationEnd, function() {
    this.classList.remove(animationName);
    });
    });
    
    //Player Two Stay Button Click Event
    document.querySelector("#player-two-stay").addEventListener("click", function(event) {
    event.preventDefault();
    
    // What happens when a user clicks the stay button
    playerTwo.stayTurn();
    document.querySelector("#player-two-running").innerHTML = "<h1 class='running-total'>" + playerTwo.turnRunningScore + "</h1>";
    document.querySelector("#player-two-score").innerHTML = "<h1 class='total-score'>" + playerTwo.totalBankedScore + "</h1>";
    
    // Win condition
    if (playerTwo.totalBankedScore >= 20) {
    document.querySelector("#winner").style.display = "block";
    document.querySelector("#winner").innerHTML = "<h1 class='total-score'>" + "You win!!!" + "</h1>";
    } else {
    document.querySelector("#winner").textContent = "";
    }
    
    var playerOneTurn = true;
    
    // Toggle between players
    if (playerOneTurn) {
    document.querySelector("#player-one-buttons").style.display = "block";
    document.querySelector("#player-two-buttons").style.display = "none";
    } else {
    document.querySelector("#player-two-buttons").style.display = "block";
    document.querySelector("#player-one-buttons").style.display = "none";
    }
    });
});
});