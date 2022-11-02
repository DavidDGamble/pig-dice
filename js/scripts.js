//Business Logic
let currentPlayer = 1;
let firstRoll = 0;

let player1Score = 0;
let player2Score = 0;
let player1CurrentScore = 0;
let player2CurrentScore = 0;

function roll() {
  let randNum = Math.floor(Math.random() * 6) + 1;
  return randNum;
}

function scoreKeeper(roll) {
  if (firstRoll === 1 && currentPlayer === 1) {
    player1CurrentScore = 0;
  } else if (firstRoll === 1 && currentPlayer === 2) {
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
}

function updateTotal() {
  firstRoll = 0;
  if (currentPlayer === 1) {
    player1Score += player1CurrentScore;
    player1CurrentScore = 0;
  } else {
    player2Score += player2CurrentScore;
    player2CurrentScore = 0;
  }
}

function reset() {
  currentPlayer = 1;
  firstRoll = 0;
  player1Score = 0;
  player2Score = 0;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
}


//UI Logic
function handleRoll(event) {
  event.preventDefault();

  const pass = document.getElementById('pass');
  pass.removeAttribute('class', 'hidden');

  firstRoll++;
  const currentRoll = roll();

  const img = document.getElementById("die");
  img.setAttribute("src", "img/dice" + currentRoll + ".png");

  scoreKeeper(currentRoll);

  //player1Score is the same as player 1 total score
  if (currentPlayer === 1) {
    const p1Total = document.getElementById("player1-total");
    p1Total.innerHTML = player1Score;
    const p1Current = document.getElementById("player1-current");
    p1Current.innerHTML = player1CurrentScore;
  } else {
    const p2Total = document.getElementById("player2-total");
    p2Total.innerHTML = player2Score;
    const p2Current = document.getElementById("player2-current");
    p2Current.innerHTML = player2CurrentScore;
  }

  if (currentRoll === 1 && currentPlayer === 1) {
    currentPlayer = 2;
    const playerName2 = document.getElementById("player");
    playerName2.innerHTML = 'Player 2';
    const pass = document.getElementById('pass');
    pass.setAttribute('class', 'hidden');
  } else if (currentRoll === 1 && currentPlayer === 2) {
    currentPlayer = 1;
    const playerName1 = document.getElementById("player");
    playerName1.innerHTML = 'Player 1';
    const pass = document.getElementById('pass');
    pass.setAttribute('class', 'hidden');
  }


}

function passDie(event) {
  updateTotal();
  if (player1Score >= 20) {
    const restart = document.getElementById('winner-div');
    restart.removeAttribute('class', 'hidden');
    document.getElementById('winner').innerHTML = 'PLAYER 1 WINS!!!';
  } else if (player2Score >= 20) {
    const restart = document.getElementById('winner-div');
    restart.removeAttribute('class', 'hidden');
    document.getElementById('winner').innerHTML = 'PLAYER 2 WINS!!!';
  }


  if (currentPlayer === 1) {
    const playerName2 = document.getElementById("player");
    playerName2.innerHTML = 'Player 2';
    const p1Total = document.getElementById("player1-total");
    p1Total.innerHTML = player1Score;
    const p1Current = document.getElementById("player1-current");
    p1Current.innerHTML = player1CurrentScore;
    currentPlayer = 2;
  } else {
    const playerName1 = document.getElementById("player");
    playerName1.innerHTML = 'Player 1';
    const p2Total = document.getElementById("player2-total");
    p2Total.innerHTML = player2Score;
    const p2Current = document.getElementById("player2-current");
    p2Current.innerHTML = player2CurrentScore;
    currentPlayer = 1;
  }
}

function resetPage(event) {
  reset();

  const p1Total = document.getElementById("player1-total");
  p1Total.innerHTML = player1Score;
  const p1Current = document.getElementById("player1-current");
  p1Current.innerHTML = player1CurrentScore;
  const p2Total = document.getElementById("player2-total");
  p2Total.innerHTML = player2Score;
  const p2Current = document.getElementById("player2-current");
  p2Current.innerHTML = player2CurrentScore;

  const restart = document.getElementById('winner-div');
  restart.setAttribute('class', 'hidden');
  const playerName1 = document.getElementById("player");
  playerName1.innerHTML = 'Player 1';

}

window.addEventListener("load", function () {
  const submitBtn = document.getElementById("roll");
  submitBtn.addEventListener("click", handleRoll);
  const passBtn = document.getElementById("pass");
  passBtn.addEventListener("click", passDie);
  const resetBtn = document.getElementById("restart");
  resetBtn.addEventListener("click", resetPage);
});


