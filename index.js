const word  = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

// initialize word
let randomWord;

// initialize score
let score = 0;

// initialize time
let time = 10;


// set countdown Timer
let timerInterval = setInterval(upDateTimer, 1000);


// Set difficulty value to local storage or medium
let difficulty = localStorage.getItem('difficulty') !== null 
? localStorage.getItem('difficulty')
: 'medium';


// Set select difficulty value to local Storage or medium
difficultySelect.value = 
localStorage.getItem('difficulty') !==null
? localStorage.getItem('difficulty')
: 'medium' ;




// get random Word from Array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)]
}


// Add random word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
addWordToDOM();


// Timer countdown function
function upDateTimer(){
    time--;
    timeEl.innerHTML = time +'s';
    if (time===0){
        clearInterval(timerInterval);
        gameOver();
    }
    
}


// Update score
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

// Game over, show end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Your time ran out</h1>
    <p> Your score is ${score}</p>
    <button onclick="location.reload()">Reload</button> `;
    endgameEl.style.display = 'flex';
}

// Event Listeners

// Input text

    text.addEventListener('input', e=>{
        const inputedVal = e.target.value;
        if (randomWord == inputedVal){
            addWordToDOM();
            updateScore();

            // clear the text area
            e.target.value = '';

            if (difficulty === 'hard'){
                time += 2;
            }
            else if (difficulty === 'medium'){
                time += 3;
            }
            else {
                time += 5;
            }
            upDateTimer();
        }
    });




// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});