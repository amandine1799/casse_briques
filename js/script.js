var canvas = document.getElementById("myCanvas"); // def du contenu //
var ctx = canvas.getContext("2d"); // variable ctx pour rendu 2D //
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2; // direction balle //
var dy = -2; // vitesse balle //
var ballRadius = 8; // rayon de la balle //
var paddleHeight = 10;
var paddleWidth = 85;
var paddleX = (canvas.width-paddleWidth)/2; // point de départ //
var rightPressed = false; // touches claviers pour le paddle //
var leftPressed = false;
var brickRowCount = 4; // nombre de lignes //
var brickColumnCount = 7; // colonnes de briques //
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30; //hauteur des briques //
var brickOffsetLeft = 30;
var interval;
var score = 0;
var lives = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = {x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false); // mouvement avec le paddle //
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// def des touches du clavier //
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

// balle collision avec briques //
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("TU AS GAGNÉ, BRAVO!");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks [c][r].status == 1) {
        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "15px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText("Score: "+score, 0, 20);
}

function drawLives() {
  ctx.font = "15px Arial";
  ctx.fillStyle= "Blue";
  ctx.fillText("Vies: "+lives, canvas.width-65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // permet à ce que la balle ne laisse pas de trâce //
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
// def délimitation zones haut et bas //
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // delimite gauche / droite //
  if(y + dy < ballRadius) {
      dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      }
      else {
        lives--;
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          x = canvas.width/2;
          y = canvas.height-30;
          dx = 3;
          dy = -3;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }


  if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
       paddleX -= 7;
  }

    x += dx; // pour que la balle se remette à sa position initiale //
    y += dy;
    requestAnimationFrame(draw);
}

draw();
