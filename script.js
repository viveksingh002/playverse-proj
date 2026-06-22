




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
    q: "What is the square root of 144?",
    options: ["10", "12", "14", "16"],
    answer: "12"
  },
  {
    q: "Which gas is most abundant in Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Nitrogen"
  },
  {
    q: "A train travels 60 km in 1 hour. How far in 5 hours?",
    options: ["300 km", "250 km", "200 km", "150 km"],
    answer: "300 km"
  },
  {
    q: "Find the next number: 2, 6, 12, 20, ?",
    options: ["30", "28", "32", "24"],
    answer: "30"
  },
  {
    q: "Which organ purifies blood in human body?",
    options: ["Heart", "Lungs", "Kidney", "Liver"],
    answer: "Kidney"
  },
  {
    q: "If a = 5 and b = 3, then a² + b² = ?",
    options: ["34", "25", "30", "28"],
    answer: "34"
  },
  {
    q: "Speed = Distance / ?",
    options: ["Time", "Mass", "Force", "Energy"],
    answer: "Time"
  },
  {
    q: "Which is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    answer: "Diamond"
  },
  {
    q: "What is 9 × 8?",
    options: ["72", "64", "81", "74"],
    answer: "72"
  },
  {
    q: "Which planet is closest to Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    answer: "Mercury"
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
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  let q = questions[current];

  document.getElementById("quizQuestion").innerText = q.q;

  let html = "";

  q.options.forEach(opt => {
    html += `<button class="play-btn" onclick="checkAnswer('${opt}')">${opt}</button>`;
  });

  document.getElementById("quizOptions").innerHTML = html;

  startTimer();
}

function checkAnswer(opt) {
  if (opt === questions[current].answer) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {

  current++;

  if (current >= questions.length) {

    clearInterval(timer);

    document.getElementById("quizBox").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("finalScore").innerText =
      `Your Score: ${score} / ${questions.length}`;

    return;
  }

  loadQuestion();
}

function openQuiz() {
  document.getElementById("quizModal").style.display = "flex";

  current = 0;
  score = 0;

  document.getElementById("quizBox").style.display = "block";
  document.getElementById("resultBox").style.display = "none";

  loadQuestion();
}

function restartQuiz() {
  openQuiz();
}

function closeQuiz() {
  document.getElementById("quizModal").style.display = "none";
  clearInterval(timer);
}

// Number gussing game add


let secretNumber;
let attempts = 0;

function openGuess() {
  document.getElementById("guessModal").style.display = "flex";
  initGame();
}

function initGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;

  const attemptsEl = document.getElementById("attempts");
  const hintEl = document.getElementById("hint");
  const inputEl = document.getElementById("guessInput");

  if (attemptsEl) attemptsEl.innerText = "0";
  if (hintEl) hintEl.innerText = "";
  if (inputEl) inputEl.value = "";
}

function checkGuess() {
  const inputEl = document.getElementById("guessInput");
  const hintEl = document.getElementById("hint");
  const attemptsEl = document.getElementById("attempts");

  if (!inputEl || inputEl.value === "") return;

  let userGuess = Number(inputEl.value);

  attempts++;
  if (attemptsEl) attemptsEl.innerText = attempts;

  if (userGuess === secretNumber) {

    if (hintEl) {
      hintEl.innerText = `🎉 You Win! Number was ${secretNumber}`;
    }

    setTimeout(() => {
      initGame();
      if (hintEl) hintEl.innerText = "🎯 New number generated!";
    }, 1200);

  } 
  else if (userGuess > secretNumber) {
    if (hintEl) hintEl.innerText = "📉 Too High!";
  } 
  else {
    if (hintEl) hintEl.innerText = "📈 Too Low!";
  }
}

function resetGame() {
  initGame();
}

function closeGuess() {
  document.getElementById("guessModal").style.display = "none";
}


const SnakeGame = (() => {

  let canvas, ctx;
  let box = 15;

  let snake, food, score, loop;

  function openSnake() {
    document.getElementById("snake-modal").style.display = "flex";
    start();
  }

  function closeSnake() {
    document.getElementById("snake-modal").style.display = "none";
    clearInterval(loop);
  }

  function start() {
    canvas = document.getElementById("snake-canvas");
    ctx = canvas.getContext("2d");

    snake = [{ x: 100, y: 100 }];
    score = 0;

    document.getElementById("snake-score").innerText = score;

    food = createFood();

    clearInterval(loop);
    loop = setInterval(update, 150);
  }

  function createFood() {
    return {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  }

  function update() {

    let head = {
      x: snake[0].x + box,
      y: snake[0].y
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      document.getElementById("snake-score").innerText = score;
      food = createFood();
    } else {
      snake.pop();
    }

    draw();

    if (head.x < 0 || head.y < 0 || head.x >= 300 || head.y >= 300) {
      clearInterval(loop);
      alert("Game Over! Score: " + score);
    }
  }

  function draw() {
    ctx.fillStyle = "#0f1220";
    ctx.fillRect(0, 0, 300, 300);

    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#00d4ff" : "#fff";
      ctx.fillRect(s.x, s.y, box, box);
    });

    ctx.fillStyle = "#ff4d8d";
    ctx.fillRect(food.x, food.y, box, box);
  }

  return {
    openSnake,
    closeSnake
  };

})();