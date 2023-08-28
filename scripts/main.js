const startButton = document.getElementById('start');
const form = document.getElementById('form');
const numberInput = document.getElementById('number-input');
const output = document.getElementById('output');
const userList = document.querySelector('.user-list');
const cpuList = document.querySelector('.cpu-list');
const canvas = document.querySelector('.canvas');
const restart = document.getElementById('restart');
const gameoverButtons = document.querySelector('.gameover-buttons');
const counter = document.querySelector('.victory-count');
const playerVictory = document.querySelector('.player-victory');
const cpuVictory = document.querySelector('.opponent-victory');
const chooseCharsBtn = document.getElementById('choose-chars-btn');
const quitBtn = document.getElementById('quit-btn');

const balloon1 = document.getElementById('balloon1');
const balloon2 = document.getElementById('balloon2');
const clue = document.querySelector('.clue');

const char = document.querySelector('.char1');
const cpu = document.querySelector('.char2');

const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');

let availableChars = ['char1', 'char2', 'char3', 'char4'];
let availableCpuChars = [];

let playerId = '';
let cpuId = '';
let chosePlayer = false;

let playerTurn = true;

let secretNumber = 0;
let userGuess = 0;
let cpuGuess = 0;
let arrUser = []
let arrCpu = []
let minNumber = 0;
let maxNumber = 0;

let playerScore = 0;
let cpuScore = 0;

let gameover = false;

let charsImgs = {};

choice1.addEventListener('click', function () {
    playerId = 'char1';
    handlerChars();
    this.style.border = '6px solid #a82323';
})

choice2.addEventListener('click', function () {
    playerId = 'char2';
    handlerChars();
    this.style.border = '6px solid #a82323';
})

choice3.addEventListener('click', function () {
    playerId = 'char3';
    handlerChars();
    this.style.border = '6px solid #a82323';
})

choice4.addEventListener('click', function () {
    playerId = 'char4';
    handlerChars();
    this.style.border = '6px solid #a82323';
})

function handlerChars() {
    const nodeList = document.querySelectorAll('.character');
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.border = '6px solid transparent';
    }
    availableCpuChars = availableChars.filter(function (removeChar) {
        return removeChar !== playerId;
    })
    chosePlayer = true;
}

function chooseCpuChar() {
    cpuCharIndex = Math.floor(Math.random() * availableCpuChars.length);

    cpuId = availableCpuChars[cpuCharIndex];
}

chooseCharsBtn.addEventListener('click', function () {
    document.getElementById('players-section').style.display = 'block';
})

startButton.addEventListener(('click'), function () {
    if (chosePlayer != true) {
        setTimeout(() => {
            startButton.innerHTML = 'Ready';
            startButton.style.background = '#a82323';
            startButton.style.color = '#e6b30e';
            startButton.classList.remove('shake');
            choice1.style.border = '6px solid transparent';
            choice2.style.border = '6px solid transparent';
            choice3.style.border = '6px solid transparent';
            choice4.style.border = '6px solid transparent';
        }, 3000);
        startButton.innerHTML = 'Choose a character!';
        startButton.style.background = '#e6b30e';
        startButton.style.color = '#a82323';
        startButton.classList.add('shake');
        choice1.style.border = '6px solid #999';
        choice2.style.border = '6px solid #999';
        choice3.style.border = '6px solid #999';
        choice4.style.border = '6px solid #999';
    } else {
        chooseCpuChar();
        randomNumber();

        charsImgs = {
            player: {
                main: `<img src="./images/${playerId}.webp" alt="First character">`,
                win: `<img src="./images/${playerId}-win.webp" alt="First character">`,
                lose: `<img src="./images/${playerId}-lose.webp" alt="First character">`,
                fear: `<img src="./images/${playerId}-fear.webp" alt="First character">`,
                guess: `<img src="./images/${playerId}-guess.webp" alt="First character">`,
            },
            cpu: {
                main: `<img src="./images/${cpuId}.webp" alt="Second character">`,
                win: `<img src="./images/${cpuId}-win.webp" alt="Second character">`,
                lose: `<img src="./images/${cpuId}-lose.webp" alt="Second character">`,
                fear: `<img src="./images/${cpuId}-fear.webp" alt="Second character">`,
                guess: `<img src="./images/${cpuId}-guess.webp" alt="Second character">`,
            }
        }

        char.innerHTML = charsImgs.player.main;
        cpu.innerHTML = charsImgs.cpu.main;

        output.innerHTML = `<h2>Guess a number between ${minNumber} and ${maxNumber}</h2>`;
        document.getElementById('main-section').style.display = 'none';
        document.getElementById('players-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';

        window.scrollTo({
            top: 1,
            left: 1,
            behavior: "smooth",
        });
        
        history.back()
    }
})

const randomNumber = () => {
    minNumber = 1;
    maxNumber = 100;
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
}

const cpuTurn = () => {
    cpuGuess = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    arrCpu.push(cpuGuess);
    cpuList.innerHTML = arrCpu.toString();

    cpu.innerHTML = charsImgs.cpu.guess;
    balloons();

    if (cpuGuess > secretNumber) {
        maxNumber = cpuGuess - 1;
        output.innerHTML = `<h2>Guess between ${minNumber} and ${maxNumber}</h2>`;
    } else if (cpuGuess < secretNumber) {
        minNumber = cpuGuess + 1;
        output.innerHTML = `<h2>Guess between ${minNumber} and ${maxNumber}</h2>`;
    } else {
        cpuScore += 1;
        cpuVictory.innerHTML = cpuScore;

        callGameover();

        minNumber = 0;

        char.innerHTML = charsImgs.player.lose;
        cpu.innerHTML = charsImgs.cpu.win;

        output.innerHTML = `<h2>Your opponent guessed the right number: ${secretNumber}. <br />GAME OVER!</h2>`;
    }

    if (minNumber == maxNumber) {
        playerScore += 1;
        playerVictory.innerHTML = playerScore;

        callGameover();

        char.innerHTML = charsImgs.player.win;
        cpu.innerHTML = charsImgs.cpu.lose;
        output.innerHTML = `<h2>You got the last number: ${secretNumber}. <br />YOU WIN!</h2>`;
    }

    setTimeout(() => {
        let numbersDifference = maxNumber - minNumber;
        if (numbersDifference <= 3 && gameover != true) {
            char.innerHTML = charsImgs.player.fear;
            cpu.innerHTML = charsImgs.cpu.fear;
            output.classList.add('pulsate');
        } else if (gameover != true) {
            cpu.innerHTML = charsImgs.cpu.main;
        }

        playerTurn = true;
    }, 1200);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (playerTurn == true) {
        userGuess = Number(numberInput.value);

        if (userGuess < minNumber || userGuess > maxNumber) {
            setTimeout(() => {
                form.classList.remove('shake');
            }, 500);
            form.classList.add('shake');
        } else if (userGuess > secretNumber) {
            maxNumber = userGuess - 1;
            balloons();
            validGuess();
        } else if (userGuess < secretNumber) {
            minNumber = userGuess + 1;
            balloons();
            validGuess();
        } else {
            balloons();
            arrUser.push(userGuess)
            playerScore += 1;
            playerVictory.innerHTML = playerScore;

            callGameover();

            char.innerHTML = charsImgs.player.win;
            cpu.innerHTML = charsImgs.cpu.lose;
            userList.innerHTML = arrUser.toString();
            output.innerHTML = `<h2>You guessed the right number! ${secretNumber}.<br />YOU WIN!</h2>`;
        }

        numberInput.value = '';

        function validGuess() {
            setTimeout(() => {
                char.innerHTML = charsImgs.player.main;
                cpuTurn();
            }, 1000);
            playerTurn = false;
            char.innerHTML = charsImgs.player.guess;
            arrUser.push(userGuess)
            userList.innerHTML = arrUser.toString();

        }
    }
})

restart.addEventListener('click', function(e) {
    e.preventDefault();
    randomNumber();

    userGuess = 0;
    cpuGuess = 0;
    arrUser = [];
    arrCpu = [];

    cpuList.innerHTML = arrCpu.toString();
    userList.innerHTML = arrCpu.toString();

    output.innerHTML = `<h2>Guess a number between ${minNumber} and ${maxNumber}</h2>`;

    form.style.display = 'flex';

    gameoverButtons.style.display = 'none';

    char.innerHTML = charsImgs.player.main;
    cpu.innerHTML = charsImgs.cpu.main;

    gameover = false;
    playerTurn = true;
})

quitBtn.addEventListener('click', function() {
    document.location.href="/";
})

function balloons() {
    if (playerTurn == true) {
        balloon1.classList.add('balloon1');
        balloon1.innerHTML = userGuess;
        setTimeout(() => {
            balloon1.classList.remove('balloon1');
            balloon1.innerHTML = '';
        }, 1000);

        if (userGuess < secretNumber) {
            clue.innerHTML = "Higher!"
            setTimeout(() => {
                clue.innerHTML = ""
            }, 1000);
        } else if (userGuess > secretNumber) {
            clue.innerHTML = "Lower!"
            setTimeout(() => {
                clue.innerHTML = ""
            }, 1000);
        }
    } else {
        balloon2.classList.add('balloon2');
        balloon2.innerHTML = cpuGuess;
        setTimeout(() => {
            balloon2.classList.remove('balloon2');
            balloon2.innerHTML = '';
        }, 1000);

        if (cpuGuess < secretNumber) {
            clue.innerHTML = "Higher!"
            setTimeout(() => {
                clue.innerHTML = ""
            }, 1000);
        } else if (cpuGuess > secretNumber) {
            clue.innerHTML = "Lower!"
            setTimeout(() => {
                clue.innerHTML = ""
            }, 1000);
        }
    }
}

function callGameover() {
    gameover = true;
    form.style.display = "none";
    output.classList.remove('pulsate');
    gameoverButtons.style.display = 'block';
}

// Collapsable
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}