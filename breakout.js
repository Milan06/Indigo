var canvas = document.getElementById("breakout");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var leftPressed = false;
var rightPressed = false;
var spacePressed = false;
var centerX = (canvas.width/2);
var centerY = (canvas.height/2);
var lives = 3;
var playerScore = 0;
var brickRowCount = 4;
var brickColumnCount = 12;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
function drawStart() {
    ctx.fillStyle = "white"
    ctx.fillRect(paddleX, 550, paddleWidth, paddleHeight);
    ctx.beginPath();
    ctx.arc(535, 260, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Atari Breakout", 385, 50);
    ctx.font="30px Arial";
    ctx.fillText("Click to play!", 455, 100)
}
drawStart();
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, 550, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+playerScore, 8, 20);
}
function gameOver(){
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER!", 350, 275)
    ctx.font = "25px Arial";
    ctx.fillText("You lost. Press space to play again!", 320, 350)
    if (spacePressed) {
        document.location.reload();
        clearInterval(interval);
    }
    clearInterval(interval);
}
function drawLives() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: "+lives, canvas.width-90, 20);
}
function ballReset() {
    x = canvas.width/2;
    y = canvas.height-30;
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-(ballRadius + 20)) {
        if(x > paddleX + 5 && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                gameOver();
            }
            else {
                ballReset();
            }
        }
    }
    
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    
    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.keyCode == "32") {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(e.keyCode == "32") {
        spacePressed = false;
    }
}
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x+7 && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight+7) {
                    dy = -dy;
                    b.status = 0;
                    playerScore++;
                    if(playerScore == brickRowCount*brickColumnCount) {
                        ctx.fillText("YOU WIN, CONGRATULATIONS! Press space to play again.", );
                        if (spacePressed) {
                            document.location.reload();
                            clearInterval(interval);
                        }
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}
$("#breakout").on("click", function() {
    var interval = setInterval(draw, 10);
});

