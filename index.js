const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");

let playerScore = 0;
let computerScore = 0;
let player1Choice = null;
let player2Choice = null;

//geluiden
const winSound = new Audio('sounds/win1.wav');
const loseSound = new Audio('sounds/lost.mp3');
const wplayer1Sound = new Audio('sounds/player-1-wins.mp3');
const wplayer2Sound = new Audio('sounds/player-2-wins.mp3');

function selectMode(mode) {
    document.getElementById('mode-selection').style.display = 'none';
    back.style.display = "block";

    if (mode === 'pvc') {
        document.getElementById('pvc-mode').style.display = 'block';
    } else if (mode === 'pvp') {
        document.getElementById('pvp-mode').style.display = 'block';
    }

    document.getElementById('resultDisplay').textContent = '';
}

function goBack() {
    document.getElementById('pvc-mode').style.display = 'none';
    document.getElementById('pvp-mode').style.display = 'none';
    document.getElementById('mode-selection').style.display = 'block';
    back.style.display = "none";

    //Keuzes resetten 
    player1Choice = null;
    player2Choice = null;
    document.getElementById('resultDisplay').textContent = '';
    playerDisplay.textContent = 'PLAYER: ';
    computerDisplay.textContent = 'COMPUTER: ';
    //Scores resetten
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
}

function playGame(playerChoice){
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    if(playerChoice === computerChoice){
        result = "IT'S A TIE!";

    }
    else{
        switch(playerChoice){
            case "rock":
                 result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
                 break;
            case "paper":
                result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
                break;
            case "scissors":
                result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
                break;
        }
    }

    playerDisplay.textContent = `Player: ${playerChoice}`;
    computerDisplay.textContent = `Computer: ${computerChoice}`;
    resultDisplay.textContent = result;

    //Trigger pop-animatie 
    resultDisplay.classList.remove("pop");
    void resultDisplay.offsetWidth; // Force reflow
    resultDisplay.classList.add("pop");

    resultDisplay.classList.remove("greenText", "redText");

    switch(result){
        case "YOU WIN!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            showConfetti();
            winSound.play();
            break;
        case "YOU LOSE!":
            resultDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            loseSound.play();
            break;
    }

}

function setPlayerChoice(choice, playerNumber) {
    if (playerNumber === 1) {
      player1Choice = choice;
      resultDisplay.textContent = "Waiting for Player 2...";
      resultDisplay.classList.remove("greenText", "redText"); //zorgt ervoor dat de tekst 'Waiting...' altijd zwart is
    } else if (playerNumber === 2) {
      player2Choice = choice;
    }
  
    //Als beide spelers hebben gekozen 
    if (player1Choice && player2Choice) {
      let result = "";
  
      if (player1Choice === player2Choice) {
        result = "IT'S A TIE!";
      } else {
        switch (player1Choice) {
          case "rock":
            result = (player2Choice === "scissors") ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
            break;
          case "paper":
            result = (player2Choice === "rock") ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
            break;
          case "scissors":
            result = (player2Choice === "paper") ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!";
            break;
        }
      }
  
      //Display choices 
      playerDisplay.textContent = `Player 1: ${player1Choice}`;
      computerDisplay.textContent = `Player 2: ${player2Choice}`;
      resultDisplay.textContent = result;
  
      //Pop-animatie toevoegen
      resultDisplay.classList.remove("pop");
      void resultDisplay.offsetWidth;
      resultDisplay.classList.add("pop");
  
      if (result.includes("PLAYER 1 WINS")) {
        resultDisplay.classList.add("greenText");
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        showConfetti();
        wplayer1Sound.play();
      } else if (result.includes("PLAYER 2 WINS")) {
        resultDisplay.classList.add("redText");
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        wplayer2Sound.play();
      }
  
      //Keuzes voor de volgende ronde resetten 
      player1Choice = null;
      player2Choice = null;
    }
  }
  

function showConfetti() {
    //linkerkant
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    //rechterkant
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }

  //single event listener voor pvc
document.getElementById('pvc-mode').addEventListener('click', function(e) {
    const choice = e.target.dataset.choice;
    if (choice) {
      playGame(choice);
    }
  });

  //single event listener voor pvp
document.getElementById('pvp-mode').addEventListener('click', function(e) {
    const choice = e.target.dataset.choice;
    const parent = e.target.closest('.pvp-buttons');
    if (choice && parent) {
      const player = parseInt(parent.dataset.player);
      setPlayerChoice(choice, player);
    }
  });
  
  
  