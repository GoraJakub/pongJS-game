const canvas = document.querySelector(".game");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
let x = width / 2, y = height / 2;
let PaddleY = (height / 2) - 75;
let rightPaddleY = (height / 2) - 75;
let directionX = Math.floor((Math.random() * 2) + 1);
let directionY = Math.floor((Math.random() * 2) + 1);
let interval = 0;
let speed = 1;
let scoreA = 0, scoreB = 0;
let letRound = 0;
let clock = 0;
const playerOneScore = document.querySelector("#playerOneScore");
const playerTwoScore = document.querySelector("#playerTwoScore");
const round = document.querySelector(".round");
round.innerHTML = `Round: ${letRound}`;
playerOneScore.innerHTML = `Points: ${scoreA}`;
playerTwoScore.innerHTML = `Points: ${scoreB}`;

const degToRad = (deg) => { return deg * Math.PI / 180; }

const drawLine = () => {
    ctx.beginPath();
    ctx.setLineDash([15, 15]);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.closePath();
}

const drawBall = () => {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x, y, 10, degToRad(0), degToRad(360), false);
    ctx.fill();
    ctx.closePath();
}
const PaddleCollisionCheck = (e) => {
    if (e == "right") {
        if (y >= rightPaddleY && y <= rightPaddleY + 150) {
            directionX = 2
        } else {
            scoreA += 1;
            playerOneScore.innerHTML = `Points: ${scoreA}`;
            reset();
        }
    } else if (e == "left") {
        if (y >= PaddleY && y <= PaddleY + 150) {
            directionX = 1
        } else {
            scoreB += 1;
            playerTwoScore.innerHTML = `Points: ${scoreB}`;
            reset();
        }
    }
}

const collisionCheck = () => {
    if (directionX == 1) {
        if (x <= width - 30) {
            x = x + 1;
        } else {
            speed = Math.floor((Math.random() * 2) + 1);
            PaddleCollisionCheck("right");
        }
    } else if (directionX == 2) {
        if (x >= 30) {
            x = x - 1;
        } else {
            speed = Math.floor((Math.random() * 2) + 1);
            PaddleCollisionCheck("left");
        }
    }
    if (directionY == 1) {
        if (y >= 0) {
            y = y - speed;
        } else {
            directionY = 2;
        }
    } else if (directionY == 2) {
        if (y <= height) {
            y = y + speed;
        } else {
            directionY = 1;
        }
    }

}

const drawPaddle = (color, player) => {
    if (player == 1) {
        ctx.fillStyle = color;
        ctx.fillRect(20, PaddleY, 10, 150);
    } else if (player == 2) {
        ctx.fillStyle = color;
        ctx.fillRect(width - 30, rightPaddleY, 10, 150);
    }

}


window.addEventListener("keydown", (e) => {
    PaddleY = (e.keyCode == ctrl1A && PaddleY >= 0) ? PaddleY - 15 : PaddleY;
    PaddleY = (e.keyCode == ctrl2A && PaddleY < 345) ? PaddleY + 15 : PaddleY;
    rightPaddleY = (e.keyCode == ctrl1B && rightPaddleY >= 0) ? rightPaddleY - 15 : rightPaddleY;
    rightPaddleY = (e.keyCode == ctrl2B && rightPaddleY < 345) ? rightPaddleY + 15 : rightPaddleY;

})
const game = () => {
    ctx.clearRect(0, 0, width, height);
    drawLine();
    drawBall();
    collisionCheck();
    drawPaddle(colorA, 1);
    drawPaddle(colorB, 2);
}

const reset = () => {
    letRound += 1;
    round.innerHTML = `Round: ${letRound}`;
    x = width / 2, y = height / 2;
    PaddleY = (height / 2) - 75;
    rightPaddleY = (height / 2) - 75;
    directionX = Math.floor((Math.random() * 2) + 1);
    directionY = Math.floor((Math.random() * 2) + 1);
    speed = 1;
}
const start = document.querySelector(".start");
const startFunction = () => {
    reset();
    playerOneScore.innerHTML = `Points: ${scoreA}`;
    playerTwoScore.innerHTML = `Points: ${scoreB}`;
    interval = setInterval(game, 5);
    clock = setInterval(timer, 1000);
    start.removeEventListener("click", startFunction);
}
start.addEventListener("click", startFunction);

const end = document.querySelector(".end");

end.addEventListener("click", () => {
    clearInterval(interval);
    clearInterval(clock);
    scoreA = 0;
    scoreB = 0;
    letRound = 0;
    secounds = 0;
    minutes = 0;
    start.addEventListener("click", startFunction);
})
const time = document.querySelector(".time");
let secounds = 1;
let minutes = 0;
const timer = () => {
    if (secounds == 60) {
        minutes += 1;
        secounds = 0;
    }
    if (secounds < 10) {
        if (minutes < 10) {
            time.innerHTML = `Time: 0${minutes}:0${secounds}`;
        } else {
            time.innerHTML = `Time: ${minutes}:0${secounds}`;
        }
    } else {
        if (minutes < 10) {
            time.innerHTML = `Time: 0${minutes}:${secounds}`
        } else {
            time.innerHTML = `Time: ${minutes}:${secounds}`
        }
    }


    secounds += 1;
}



