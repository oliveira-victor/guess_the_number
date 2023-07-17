const startButton = document.getElementById('start');
const form = document.getElementById('form');
const numberInput = document.getElementById('number-input');
const output = document.getElementById('output');
const userList = document.querySelector('.user-list');
const cpuList = document.querySelector('.cpu-list');
const canvas = document.querySelector('.canvas')

let secretNumber = 0;
let userGuess = 0;
let cpuGuess = 0;
let arrUser = []
let minNumber = 0;
let maxNumber = 0;
let arrCpu = []


startButton.addEventListener(('click'), function() {
    randomNumber();
    output.innerHTML = `<h2>Guess a number between ${minNumber} and ${maxNumber}</h2>`;
    startButton.style.display = 'none';
    numberInput.style.display = 'block'
    canvas.style.display = 'block';
    
    document.querySelector('.title').style.display = 'none';
    document.querySelector('.menu-buttons-container').style.display = 'none';
})

const randomNumber = () => {
    minNumber = 1;
    maxNumber = 50;
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    // secretNumber = Math.floor(Math.random() * 10) + 1;
}

const cpuTurn = () => {
    cpuGuess = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    arrCpu.push(cpuGuess);
    cpuList.innerHTML = arrCpu.toString();

    if (cpuGuess > secretNumber) {
        maxNumber = cpuGuess - 1;
    } else if (cpuGuess < secretNumber) {
        minNumber = cpuGuess + 1;
    } else {
        alert(`Computer guesses the right number: ${cpuGuess}. GAME OVER!`)
        canvas.style.display = 'none';
        // output.innerHTML = `<h2 class="game-over">CPU guessed the right number: ${cpuGuess}. GAME OVER!</h2>`;
    }

    if (minNumber == maxNumber) {
        output.innerHTML = `<h2>You got the last number: ${secretNumber}. YOU WIN!</h2>`;
        form.style.display = 'none';
    } else {
        output.innerHTML = `<h2>Guess between ${minNumber} and ${maxNumber}</h2>`;
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

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
        output.innerHTML = `<h2>Acertou, mizerávi! Número ${secretNumber}</h2>`;
        form.style.display = 'none';
    }

    numberInput.value = '';

    function validGuess() {
        arrUser.push(userGuess)
        userList.innerHTML = arrUser.toString();
        validGuess = false
        cpuTurn();
    }
})
