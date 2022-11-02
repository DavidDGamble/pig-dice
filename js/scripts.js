//Business Logic
let currentPlayer = 1;
let firstRoll = true;

let player1Score = 0;
let player2Score = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;

function roll(){
  let randNum = Math.floor(Math.random() * 6) + 1;
  return randNum;
}

function scoreKeeper(roll) {
  if (firstRoll && currentPlayer === 1) {
    player1CurrentScore = 0;
  } else if (firstRoll && currentPlayer === 2) {
    player2CurrentScore = 0;
  }

  if (roll !== 1) {
    if (currentPlayer === 1) {
      player1CurrentScore += roll;
    } else {
      player2CurrentScore += roll;
    }
  } else {
    if (currentPlayer === 1) {
      player1CurrentScore = 0;
    } else {
      player2CurrentScore = 0;
    }
  }

  if (currentPlayer === 1) {
    player1Score += player1CurrentScore;
  } else {
    player2Score += player2CurrentScore;
  }
}

scoreKeeper(1)
console.log(player1Score);


roll();


// window.addEventListener("load", function() {
//   const rollDiceBtn = document.getElementById("roll");
//   rollDiceBtn.addEventListener("submit", handleRoll);
//   const passBtn = document.getElementById("pass");
//   resetBtn.addEventListener("click", passDie);
//   const resetBtn = document.getElementById("restart");
//   resetBtn.addEventListener("click", resetPage);
// });

