var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 30;
x = Math.floor((Math.random() * (canvas.width - 2 * ballRadius) + 1));
y = Math.floor((Math.random() * (canvas.height - 2 * ballRadius) + 1));
var dx = 0.5;
var dy = -0.5;
var time = 0;
var speed = 0.5;
var circleCreated = 0;
var score = 0;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, canvas.width / 2, 20);
}

function drawBall() {
    ctx.beginPath();
    keepInBounds();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

function redraw() {
    var today = new Date();
    circleCreated++;
    if (circleCreated % 7 == 0) { // after every 7 correct clicks, sped increases
        speed += 0.5;
    }
    console.log(today.getMilliseconds());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time = 0;
    x = Math.floor((Math.random() * (canvas.width - 2 * ballRadius)) + ballRadius);
    y = Math.floor((Math.random() * (canvas.height - 2 * ballRadius)) + ballRadius);
    var theta = Math.random() * (2 * Math.PI);
    dx = speed * Math.cos(theta);
    dy = speed * Math.sin(theta);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawScore();
    x += dx;
    y += dy;
    time++;
}

function gainShow(gain) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("+" + gain, x, y);
}

canvas.addEventListener('click', function(event) {
    var x1 = event.pageX,
        y1 = event.pageY;
    var currX = x;
    var currY = y;
    // if (y1 >= currY - ballRadius  && y1 <= currY + ballRadius + dy && x1 >= currX - ballRadius  && x1 <= currX + ballRadius )
    if (Math.pow(x - x1, 2) + Math.pow(y - y1, 2) < Math.pow(ballRadius, 2)) {
        if (time <= 50) { // less than 0.5 sec
            score = score + 10;
        } else if (time > 50 && time <= 1000) { // less than 10 sec
            score = score + Math.round(10 - (time - 100) / 100);
        } else {
            score = score;
        }
        if (score < 0) { //safety condition
            score = 0;
        }
        gainShow((score / time) + 10);

        redraw();
    } else {
        alert("GAME OVER! Your score is : " + score);
        document.location.reload();
        clearInterval(interval);
    }

}, false);

function keepInBounds() {
    if (x + 2 * dx > canvas.width - ballRadius || x + 2 * dx < ballRadius) {
        dx = -dx;
    }
    if (y + 2 * dy > canvas.height - ballRadius || y + 2 * dy < ballRadius) {
        dy = -dy;
    }
}


drawScore();
setInterval(draw, 10);