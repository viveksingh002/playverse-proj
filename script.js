




// FLOATING PARTICLE
const particleContainer = document.getElementById('particles');

const particleColors = ['#00d4ff', '#7c5cfc', '#ff4d8d', '#00e5a0'];

for (let i = 0; i < 18; i++) {

  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 10 + 1;
  const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];

  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: ${randomColor};
    left: ${Math.random() * 100}%;
    animation-duration: ${Math.random() * 12 + 8}s;
    animation-delay: ${Math.random() * 8}s;
  `;

  particleContainer.appendChild(particle);
}


// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(event) {
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      event.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');

  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
  } else {
    navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.07)';
  }
});



//tictokttoe GAME

let currentPlayer = "X";
let board = ["","","","","","","","",""];
let gameActive = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function openGame(){
  document.getElementById("tictoc").style.display = "flex";
}

function closeGame(){
  document.getElementById("tictoc").style.display = "none";
  resetGame();
}

function makeMove(index){
  if(board[index] !== "" || !gameActive) return;

  const cells = document.querySelectorAll(".tictocgameboard div");

  board[index] = currentPlayer;
  cells[index].innerText = currentPlayer;

  checkWinner();

  if(gameActive){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = currentPlayer + " turn";
  }
}

function checkWinner(){
  for(let p of winPatterns){
    let [a,b,c] = p;

    if(board[a] && board[a] === board[b] && board[a] === board[c]){
      document.getElementById("status").innerText = board[a] + " Wins 🎉";
      gameActive = false;
      return;
    }
  }

  if(!board.includes("") && gameActive){
    document.getElementById("status").innerText = "Draw 😐";
    gameActive = false;
  }
}

function resetGame(){
  board = ["","","","","","","","",""];
  currentPlayer = "X";
  gameActive = true;

  document.querySelectorAll(".tictocgameboard div").forEach(cell=>{
    cell.innerText = "";
  });

  document.getElementById("status").innerText = "X starts first";
}

// OPEN
function openRPS(){
  document.getElementById("rpsModal").style.display = "flex";
}

// CLOSE
function closeRPS(){
  document.getElementById("rpsModal").style.display = "none";

  document.getElementById("rpsStatus").innerText =
    "Choose your move";

  document.getElementById("rpsResult").innerHTML = "";
}

let playerScore = 0;
let computerScore = 0;

function playRPS(player) {

  const choices = ["rock", "paper", "scissors"];
  const computer = choices[Math.floor(Math.random() * 3)];

  let result = "";

  if (player === computer) {
    result = "😐 Draw";
  } 
  else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    result = "🎉 You Win!";
    playerScore++;
  } 
  else {
    result = "🤖 Computer Wins!";
    computerScore++;
  }

  document.getElementById("playerScore").innerText = playerScore;
  document.getElementById("computerScore").innerText = computerScore;

  document.getElementById("rpsResult").innerHTML = `
    <p>You chose: <b>${player}</b></p>
    <p>Computer chose: <b>${computer}</b></p>
    <h3>${result}</h3>
  `;
}