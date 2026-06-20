




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
const memorySymbols = [
  '🍎','🍎',
  '🚀','🚀',
  '🎮','🎮',
  '⚽','⚽'
];

let flippedCards = [];
let lockBoard = false;

function openMemoryGame() {
  document.getElementById("memoryModal").style.display = "block";
  startMemoryGame();
}

function closeMemoryGame() {
  document.getElementById("memoryModal").style.display = "none";
}

function startMemoryGame() {
  const board = document.getElementById("memoryGame");

  board.innerHTML = "";
  document.getElementById("memoryResult").textContent = "";
  flippedCards = [];
  lockBoard = false;

  const cards = [...memorySymbols].sort(() => Math.random() - 0.5);

  cards.forEach(symbol => {
    const card = document.createElement("div");

    card.className = "memory-card";
    card.dataset.symbol = symbol;
    card.textContent = "?";

    card.onclick = () => flipCard(card);

    board.appendChild(card);
  });
}

function flipCard(card) {
  if (
    lockBoard ||
    card.classList.contains("flipped")
  ) return;

  card.textContent = card.dataset.symbol;
  card.classList.add("flipped");

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    flippedCards = [];

    const matched =
      document.querySelectorAll(".memory-card.flipped").length;

    if (matched === memorySymbols.length) {
      setTimeout(() => {
        document.getElementById("memoryResult").textContent =
    "🎉 Congratulations! You Won!";;
      }, 300);
    }
  } else {
    lockBoard = true;

    setTimeout(() => {
      card1.textContent = "?";
      card2.textContent = "?";

      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      flippedCards = [];
      lockBoard = false;
    }, 800);
  }
}


const questions = [
  {
    q: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    q: "Which planet is known as Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    q: "Who invented JavaScript?",
    options: ["Brendan Eich", "Bill Gates", "Elon Musk", "Steve Jobs"],
    answer: "Brendan Eich"
  },
  {
    q: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Mark Language",
      "None"
    ],
    answer: "Hyper Text Markup Language"
  }
];

let current = 0;
let timer;
let timeLeft = 10;
let score = 0;

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;

  document.getElementById("timer").innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;

    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {

  let q = questions[current];

  document.getElementById("quizQuestion").innerText = q.q;

  let optionsHTML = "";

  q.options.forEach(opt => {
    optionsHTML += `<button class="play-btn" onclick="checkAnswer('${opt}')">${opt}</button>`;
  });

  document.getElementById("quizOptions").innerHTML = optionsHTML;

  startTimer();
}

function checkAnswer(selected) {

  if (selected === questions[current].answer) {
    score++;
  }

  nextQuestion();
}

function nextQuestion() {

  current++;

  if (current >= questions.length) {
    clearInterval(timer);


    current = 0;
    score = 0;

    loadQuestion();
    return;
  }

  loadQuestion();
}

function openQuiz() {
  document.getElementById("quizModal").style.display = "flex";

  current = 0;
  score = 0;

  loadQuestion();
}

function closeQuiz() {
  document.getElementById("quizModal").style.display = "none";
  clearInterval(timer);
}
function nextQuestion() {

  current++;

  if (current >= questions.length) {

    clearInterval(timer);

    document.getElementById("quizQuestion").style.display = "none";
    document.getElementById("quizOptions").style.display = "none";
    document.getElementById("timer").style.display = "none";

    document.getElementById("resultBox").style.display = "block";
    document.getElementById("finalScore").innerText =
      "Your Score: " + score + " / " + questions.length;

    return;
  }

  loadQuestion();
}
function restartQuiz() {

  score = 0;
  current = 0;

  document.getElementById("resultBox").style.display = "none";

  document.getElementById("quizQuestion").style.display = "block";
  document.getElementById("quizOptions").style.display = "block";
  document.getElementById("timer").style.display = "block";

  loadQuestion();
}