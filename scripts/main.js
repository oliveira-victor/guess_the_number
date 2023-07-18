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

const char = document.querySelector('.char1');
const cpu = document.querySelector('.char2');

const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');

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

choice1.addEventListener('click', function () {
    this.style.border = '6px solid #a82323';
    choice2.style.border = '6px solid transparent';
    playerId = 'char1';
    cpuId = 'char2';
    chosePlayer = true;
})

choice2.addEventListener('click', function () {
    this.style.border = '6px solid #a82323';
    choice1.style.border = '6px solid transparent';
    playerId = 'char2';
    cpuId = 'char1';
    chosePlayer = true;
})

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
        }, 3000);
        startButton.innerHTML = 'Choose a character!';
        startButton.style.background = '#e6b30e';
        startButton.style.color = '#a82323';
        startButton.classList.add('shake');
        choice1.style.border = '6px solid #999';
        choice2.style.border = '6px solid #999';
    } else {
        window.scrollTo(0, 0);
        randomNumber();
        char.innerHTML = `<img src="./images/${playerId}.webp" alt="First character">`
        cpu.innerHTML = `<img src="./images/${cpuId}.webp" alt="First character">`
        output.innerHTML = `<h2>Guess a number between ${minNumber} and ${maxNumber}</h2>`;
        /*
        startButton.style.display = 'none';
        numberInput.style.display = 'block'
        canvas.style.display = 'block';
        counter.style.display = 'flex';
        */
        document.getElementById('main-section').style.display = 'none';
        document.getElementById('players-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
    }
})

const randomNumber = () => {
    minNumber = 1;
    maxNumber = 50;
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
}

const cpuTurn = () => {
    cpuGuess = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    arrCpu.push(cpuGuess);
    cpuList.innerHTML = arrCpu.toString();

    if (cpuGuess > secretNumber) {
        maxNumber = cpuGuess - 1;
        output.innerHTML = `<h2>Guess between ${minNumber} and ${maxNumber}</h2>`;
    } else if (cpuGuess < secretNumber) {
        minNumber = cpuGuess + 1;
        output.innerHTML = `<h2>Guess between ${minNumber} and ${maxNumber}</h2>`;
    } else {
        cpuScore += 1;
        cpuVictory.innerHTML = cpuScore;

        minNumber = 0;

        form.style.display = "none"
        char.innerHTML = `<img src="./images/${playerId}-lose.webp" alt="First character">`;
        cpu.innerHTML = `<img src="./images/${cpuId}-win.webp" alt="Second character">`;
        output.innerHTML = `<h2>Your opponent guessed the right number: ${secretNumber}. <br />GAME OVER!</h2>`;
        gameover = true;
        gameoverButtons.style.display = 'block';
    }

    if (minNumber == maxNumber) {
        playerScore += 1;
        playerVictory.innerHTML = playerScore;

        char.innerHTML = `<img src="./images/${playerId}-win.webp" alt="First character">`;
        cpu.innerHTML = `<img src="./images/${cpuId}-lose.webp" alt="Second character">`;
        output.innerHTML = `<h2>You got the last number: ${secretNumber}. <br />YOU WIN!</h2>`;
        gameover = true;
        form.style.display = 'none';
        gameoverButtons.style.display = 'block';
    }

    let numbersDifference = maxNumber - minNumber;
    if (numbersDifference <= 3 && gameover != true) {
        char.innerHTML = `<img src="./images/${playerId}-fear.webp" alt="First character">`;
        cpu.innerHTML = `<img src="./images/${cpuId}-fear.webp" alt="Second character">`;
    }

    playerTurn = true;
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
            validGuess()
        } else if (userGuess < secretNumber) {
            minNumber = userGuess + 1;
            validGuess()
        } else {
            arrUser.push(userGuess)
            playerScore += 1;
            playerVictory.innerHTML = playerScore;

            char.innerHTML = `<img src="./images/${playerId}-win.webp" alt="First character">`;
            cpu.innerHTML = `<img src="./images/${cpuId}-lose.webp" alt="Second character">`;
            userList.innerHTML = arrUser.toString();
            output.innerHTML = `<h2>You guessed the right number! ${secretNumber}.<br />YOU WIN!</h2>`;
            form.style.display = 'none';
            gameoverButtons.style.display = 'block';
        }

        numberInput.value = '';

        function validGuess() {
            playerTurn = false;
            char.innerHTML = `<img src="./images/${playerId}-guess.webp" alt="First character">`;
            arrUser.push(userGuess)
            userList.innerHTML = arrUser.toString();
            char.innerHTML = `<img src="./images/${playerId}.webp" alt="First character">`;
            cpuTurn();
        }
    }
})

restart.addEventListener('click', function (e) {
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

    char.innerHTML = `<img src="./images/${playerId}.webp" alt="First character">`;
    cpu.innerHTML = `<img src="./images/${cpuId}.webp" alt="First character">`;

    gameover = false;
    playerTurn = true;


})