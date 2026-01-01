const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle
const paddleWidth = 10;
const paddleHeight = 80;

let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = playerY;

const paddleSpeed = 6;

// Ball
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
const ballSize = 10;

// Score
let playerScore = 0;
let aiScore = 0;

// Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") playerY -= paddleSpeed;
  if (e.key === "ArrowDown") playerY += paddleSpeed;
});

// Game loop
function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Wall collision
  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY *= -1;
  }

  // Player paddle collision
  if (
    ballX <= paddleWidth &&
    ballY > playerY &&
    ballY < playerY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // AI paddle collision
  if (
    ballX >= canvas.width - paddleWidth &&
    ballY > aiY &&
    ballY < aiY + paddleHeight
  ) {
    ballSpeedX *= -1;
  }

  // Score update
  if (ballX < 0) {
    aiScore++;
    resetBall();
  }

  if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }

  // AI movement
  aiY += (ballY - (aiY + paddleHeight / 2)) * 0.08;
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX *= -1;
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Paddles
  ctx.fillStyle = "white";
  ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(
    canvas.width - paddleWidth,
    aiY,
    paddleWidth,
    paddleHeight
  );

  // Ball
  ctx.fillRect(ballX, ballY, ballSize, ballSize);

  // Score
  ctx.font = "20px Arial";
  ctx.fillText(playerScore, canvas.width / 4, 30);
  ctx.fillText(aiScore, (canvas.width * 3) / 4, 30);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

