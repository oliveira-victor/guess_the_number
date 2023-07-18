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

const char = document.querySelector('.char1');
const cpu = document.querySelector('.char2');

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

startButton.addEventListener(('click'), function () {
    randomNumber();
    char.innerHTML = '<img src="./images/char1.webp" alt="First character">'
    output.innerHTML = `<h2>Guess a number between ${minNumber} and ${maxNumber}</h2>`;
    startButton.style.display = 'none';
    numberInput.style.display = 'block'
    canvas.style.display = 'block';
    counter.style.display = 'flex';

    document.querySelector('.title').style.display = 'none';
    document.querySelector('.menu-buttons-container').style.display = 'none';
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
        char.innerHTML = '<img src="./images/char1-lose.webp" alt="First character">';
        cpu.innerHTML = '<img src="./images/char2-win.webp" alt="First character">';
        output.innerHTML = `<h2>Your opponent guessed the right number: ${secretNumber}. <br />GAME OVER!</h2>`;
        gameover = true;
        gameoverButtons.style.display = 'block';
    }

    if (minNumber == maxNumber) {
        playerScore += 1;
        playerVictory.innerHTML = playerScore;

        char.innerHTML = '<img src="./images/char1-win.webp" alt="First character">';
        cpu.innerHTML = '<img src="./images/char2-lose.webp" alt="First character">';
        output.innerHTML = `<h2>You got the last number: ${secretNumber}. <br />YOU WIN!</h2>`;
        gameover = true;
        form.style.display = 'none';
        gameoverButtons.style.display = 'block';
    }

    let numbersDifference = maxNumber - minNumber;
    if (numbersDifference <= 3 && gameover != true) {
        char.innerHTML = '<img src="./images/char1-fear.webp" alt="First character">';
        cpu.innerHTML = '<img src="./images/char2-fear.webp" alt="First character">';
    }

    playerTurn = true;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (playerTurn == true) {
        userGuess = Number(numberInput.value);

        if (userGuess < minNumber || userGuess > maxNumber) {
            alert("This number is not an option.")
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

            char.innerHTML = '<img src="./images/char1-win.webp" alt="First character">';
            cpu.innerHTML = '<img src="./images/char2-lose.webp" alt="First character">';
            userList.innerHTML = arrUser.toString();
            output.innerHTML = `<h2>You guessed the right number! ${secretNumber}.<br />YOU WIN!</h2>`;
            form.style.display = 'none';
            gameoverButtons.style.display = 'block';
        }

        numberInput.value = '';

        function validGuess() {
            playerTurn = false;
            char.innerHTML = '<img src="./images/char1-guess.webp" alt="First character">'
            arrUser.push(userGuess)
            userList.innerHTML = arrUser.toString();
            char.innerHTML = '<img src="./images/char1.webp" alt="First character">'
            cpuTurn();
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

    char.innerHTML = '<img src="./images/char1.webp" alt="First character">'
    cpu.innerHTML = '<img src="./images/char2.webp" alt="First character">';

    gameover = false;
    playerTurn = true;


})