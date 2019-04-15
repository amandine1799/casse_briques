var canvas = document.getElementById("myCanvas"); // def du contenu //
var ctx = canvas.getContext("2d"); // variable ctx pour rendu 2D //
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 0.5; // direction balle //
var dy = -2.5; // vitesse balle //
var ballRadius = 10; // rayon de la balle //

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // permet à ce que la balle ne laisse pas de trâce //
  drawBall();
// def délimitation zones haut et bas //
  if(y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
  }
  // delimite gauche / droite //
  if(x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
  }

  x += dx; // pour que la balle se remette à sa position initiale //
  y += dy;
}

setInterval(draw, 10);
