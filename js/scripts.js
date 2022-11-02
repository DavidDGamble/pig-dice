//Business Logic --------------------------------------------------------------------------
let robot = false;
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
  robot = false;
  currentPlayer = 1;
  firstRoll = 0;
  player1Score = 0;
  player2Score = 0;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
}


//UI Logic ---------------------------------------------------------------------------------
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

  if (currentRoll === 1 && currentPlayer === 1 && robot === false) {
    currentPlayer = 2;
    const playerName2 = document.getElementById("player");
    playerName2.innerHTML = 'Player 2';
    const pass = document.getElementById('pass');
    pass.setAttribute('class', 'hidden');
  } else if (currentRoll === 1 && currentPlayer === 1 && robot) {

//-----------------------------
    document.getElementById("pass").setAttribute("class", "hidden");

    const p1Total = document.getElementById("player1-total");
    p1Total.innerHTML = player1Score;
    const p1Current = document.getElementById("player1-current");
    p1Current.innerHTML = player1CurrentScore;
    if (player1Score >= 100) {
      const restart = document.getElementById('winner-div');
      restart.removeAttribute('class', 'hidden');
      document.getElementById('winner').innerHTML = 'PLAYER 1 WINS!!!';
    } 
    currentPlayer = 2;
    while (player2CurrentScore < 15) {
      firstRoll++;
      const currentRoll = roll();
      if (currentRoll === 1) {
        player2CurrentScore = 0;
        break;
      }
      scoreKeeper(currentRoll);
    }
    updateTotal();
    const p2Total = document.getElementById("player2-total");
    p2Total.innerHTML = player2Score;
    const p2Current = document.getElementById("player2-current");
    p2Current.innerHTML = player2CurrentScore;
    currentPlayer = 1;
    if (player2Score >= 100) {
      const restart = document.getElementById('winner-div');
      restart.removeAttribute('class', 'hidden');
      document.getElementById('winner').innerHTML = 'PLAYER 2 WINS!!!';
    }
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
  if (!robot) {
    if (player1Score >= 100) {
      const restart = document.getElementById('winner-div');
      restart.removeAttribute('class', 'hidden');
      document.getElementById('winner').innerHTML = 'PLAYER 1 WINS!!!';
    } else if (player2Score >= 100) {
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
  } else {
    const p1Total = document.getElementById("player1-total");
    p1Total.innerHTML = player1Score;
    const p1Current = document.getElementById("player1-current");
    p1Current.innerHTML = player1CurrentScore;
    if (player1Score >= 100) {
      const restart = document.getElementById('winner-div');
      restart.removeAttribute('class', 'hidden');
      document.getElementById('winner').innerHTML = 'PLAYER 1 WINS!!!';
    } 
    currentPlayer = 2;
    while (player2CurrentScore < 15) {
      firstRoll++;
      const currentRoll = roll();
      if (currentRoll === 1) {
        player2CurrentScore = 0;
        break;
      }
      scoreKeeper(currentRoll);
    }
    updateTotal();
    const p2Total = document.getElementById("player2-total");
    p2Total.innerHTML = player2Score;
    const p2Current = document.getElementById("player2-current");
    p2Current.innerHTML = player2CurrentScore;
    currentPlayer = 1;
    if (player2Score >= 100) {
      const restart = document.getElementById('winner-div');
      restart.removeAttribute('class', 'hidden');
      document.getElementById('winner').innerHTML = 'PLAYER 2 WINS!!!';
    }
  }
}

function resetPage(event) {
  reset();

  document.getElementById("amountOfPlayers").removeAttribute("class");
  document.getElementById("roll").setAttribute("class", "hidden");
  document.getElementById("pass").setAttribute("class", "hidden");

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


function handleOnePlayer(event) {
  event.preventDefault();
  robot = true;

  document.getElementById("amountOfPlayers").setAttribute("class", "hidden");
  document.getElementById("roll").removeAttribute("class");
}

function handleTwoPlayer(event) {
  event.preventDefault();

  document.getElementById("amountOfPlayers").setAttribute("class", "hidden");
  document.getElementById("roll").removeAttribute("class");
}



window.addEventListener("load", function () {
  const rollBtn = document.getElementById("roll");
  rollBtn.addEventListener("click", handleRoll);

  const passBtn = document.getElementById("pass");
  passBtn.addEventListener("click", passDie);

  const resetBtn = document.getElementById("restart");
  resetBtn.addEventListener("click", resetPage);

  const onePlayerBtn = document.getElementById("1player");
  onePlayerBtn.addEventListener("click", handleOnePlayer);

  const twoPlayers = document.getElementById("2player");
  twoPlayers.addEventListener("click", handleTwoPlayer);

  const playerAmount = document.getElementById("amountOfPlayers");
  playerAmount.removeAttribute("class", "hidden");


});


