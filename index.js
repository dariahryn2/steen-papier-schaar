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

//sounds
const winSound = new Audio('sounds/win1.wav');
const loseSound = new Audio('sounds/lost.mp3');

function selectMode(mode) {
    document.getElementById('mode-selection').style.display = 'none';

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

    // Reset choices
    player1Choice = null;
    player2Choice = null;
    document.getElementById('resultDisplay').textContent = '';
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

    // Trigger pop animation
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

function showConfetti() {
    // Left side
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    // Right side
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }
  