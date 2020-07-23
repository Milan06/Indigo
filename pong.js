var canvas = document.getElementById("pong");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 75;
var paddleWidth = 10;
var paddleYO = (canvas.height-paddleHeight) / 2;
var paddleYT = (canvas.height-paddleHeight) / 2;
var downPressed = false;
var upPressed = false;
var wPressed = false;
var sPressed = false;
var spacePressed = false;
var enterPressed = false;
var poScore = 0;
var ptScore = 0;
var centerX = (canvas.width/2)
var centerY = (canvas.height/2)
function drawStart() {
    ctx.fillStyle = "white"
    ctx.fillRect(20, 220, 20, 100);
    ctx.fillRect(710, 220, 20, 100);
    ctx.beginPath();
    ctx.arc(370, 260, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("PONG", 305, 50);
    ctx.font="30px Arial";
    ctx.fillText("Click to play!", 295, 100)
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawPaddleOne() {
    ctx.beginPath();
    ctx.rect(20, paddleYO, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function drawPaddleTwo() {
    ctx.beginPath();
    ctx.rect(720, paddleYT, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
function score(){
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText(("Player 1 Score: " + poScore), 100, 50);
    ctx.fillText(("Player 2 Score: " + ptScore), 450, 50);
}
function gameOver(){
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("GAME OVER!", 200, 175)
    ctx.font = "25px Arial";
    if (poScore > ptScore) {
        ctx.fillText("Player one wins! Press space to play again.", 135, 250)
        if (spacePressed) {
            document.location.reload();
            clearInterval(interval);
        }
        clearInterval(interval);

    }
    else {
        ctx.fillText("Player two wins! Press space to play again.", 135, 250)
        if (spacePressed) {
            document.location.reload();
            clearInterval(interval);
        }
        clearInterval(interval);
    }
}

function ballReset() {
    x = canvas.width/2;
    y = canvas.height-30;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    score();
    drawBall();
    drawPaddleOne();
    drawPaddleTwo();
    // Right Paddle Collision (Player Two)
    if(x + dx > 710) {
        if (y + dy >= paddleYT && y + dy <= paddleYT + paddleHeight) {
            dx = -dx;
        }
        else {
            if (ptScore < 6) {
                ptScore++;
                ballReset();
            } 
            else {
                gameOver();
            }
        }
    }
    // Left Paddle Collision (Player One)
    if (x + dx < 30) {
        if (y + dy >= paddleYO && y + dy <= paddleYO + paddleHeight) {
            dx = -dx;
        }
        else {
            if (poScore < 6) {
                poScore++;
                ballReset();
            } 
            else {
                gameOver();
            }
    }
}
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    if(paddleYO > canvas.height - 75) {
        sPressed = false
    }
    else if(paddleYO < 0) {
        wPressed = false
    }
    if(paddleYT > canvas.height - 75) {
        downPressed = false
    }
    else if(paddleYT < 0) {
        upPressed = false
    }
    if(wPressed) {
        paddleYO -= 7;
    }
    else if(sPressed) {
        paddleYO += 7;
    }
    if(upPressed) {
        paddleYT -=7;
    }
    else if(downPressed) {
        paddleYT +=7;
    }
    x += dx;
    y += dy;
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
    if(e.key == "w") {
        wPressed = true;
    }
    else if(e.key == "s") {
        sPressed = true;
    }
    if(e.keyCode == "13") {
        enterPressed = true;
    }
    if(e.keyCode == "32") {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
    if(e.key == "w") {
        wPressed = false;
    }
    else if(e.key == "s") {
        sPressed = false;
    }
    if(e.keyCode == "32") {
        spacePressed = false;
    }
    if(e.keyCode == "13") {
        enterPressed = false;
    }
}
$("#pong").on("click", function() {
    var interval = setInterval(drawGame, 10);
});