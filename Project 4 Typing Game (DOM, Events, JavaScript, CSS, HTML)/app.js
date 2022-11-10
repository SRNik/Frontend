const word = document.getElementById('word');
const text = document.getElementById('input');
const score = document.getElementById('score');
const seconds = document.getElementById('seconds');

const endgame = document.getElementById('end-game-box');        //Adding elements via JS

const butnsetngs = document.getElementById('butn-setngs');
const endbtn = document.getElementById('reloadbtn')

const setngs = document.getElementById('setngs');
const formsetngs = document.getElementById('form-setngs');
const diffclty = document.getElementById('diffclty');

// List of words for the game
const wordsArray = ["aback", "abaft", "abandoned", "abashed", "aberrant", "abhorrent", "abiding", "abject", "ablaze", "able", "abnormal", "aboard", "aboriginal", "abortive", "abounding", "abrasive", "abrupt", "absent", "absorbed", "absorbing", "abstracted", "absurd", "abundant", "dangerous", "dapper", "dare", "dark", "dashing", "daughter", "day", "dazzling", "dead", "deadpan", "deafening", "dear", "death", "debonair", "debt", "decay", "deceive", "decide", "decision", "decisive", "decorate", "decorous", "deep", "deeply", "deer", "defeated", "defective", "defiant", "full", "fumbling", "functional", "funny", "furniture", "furry", "furtive", "future", "futuristic", "fuzzy", "gabby", "gainful", "gamy", "gaping", "garrulous", "gate", "gather", "gaudy", "gaze", "geese", "general", "gentle", "ghost", "giant", "giants", "giddy", "gifted", "gigantic", "giraffe", "girl", "girls", "glamorous", "glass", "gleaming", "glib", "glistening", "glorious", "glossy", "glove", "glow", "glue", "godly", "gold", "good", "goofy", "gorgeous", "government", "governor", "grab", "miniature", "minister", "minor", "mint", "minute", "miscreant", "miss", "mist", "misty", "mitten", "mix", "mixed", "moan", "moaning", "modern", "moldy", "mom", "momentous", "money", "monkey", "month", "moon", "moor", "morning", "mother", "motion", "motionless", "mountain", "mountainous", "mourn", "mouth", "move", "muddle", "muddled", "mug", "multiply", "mundane", "murder", "murky", "muscle", "mushy", "mute", "mysterious", "nail", "naive", "name", "nappy", "narrow", "nasty", "nation", "natural", "naughty", "nauseating", "near", "neat", "nebulous", "necessary", "neck", "need", "needle", "needless", "needy", "neighborly", "nerve", "nervous", "nest", "new", "next", "nice", "nifty", "night", "nimble", "nine", "nippy", "nod", "noise", "noiseless", "noisy", "nonchalant", "nondescript", "nonstop", "normal", "north", "nose", "nostalgic", "nosy", "note", "notebook", "notice", "noxious", "null", "number", "numberless", "numerous", "nut", "rod", "roll", "romantic", "roof", "room", "roomy", "root", "rose", "rot", "rotten", "rough", "round", "route", "royal", "rub", "ruddy", "rude", "ruin", "rule", "run", "rural", "rush", "rustic", "ruthless", "sable", "sack", "sad", "safe", "sail", "salt", "salty", "same", "sand", "sassy", "satisfy"]

// Current word, score, time, and difficulty
let randomWord;
let currScore = 0;
let currTime = 12;

let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';          //Set difficulty to medium or value in localstorage. 

diffclty.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';              //Makes the dropdown stay the same value as above

// Cursor automatically visible in text field
text.focus()

//Initiate countdown
const timeInterval = setInterval(timeUpdate, 1000);      //Calls the function each second

// Retrieving random word from the array
function getWord() {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

// Making the word visible
function addWordToWind() {
    randomWord = getWord();
    word.innerHTML = randomWord;
};

scoreUpdate = () => {
    currScore += 1;
    score.innerText = currScore;
}

// Update the time
function timeUpdate() {
    currTime -= 1;
    seconds.innerText = currTime;

    if (currTime === 0) {
        clearInterval(timeInterval);            //Stops the calling of timeUpdate
        gameover();
    }
}

// Show screen when losing
function gameover() {
    endgame.innerHTML = `
    <h1>Game Over! Your time has ran out!</h1>
    <p>Your final score is ${currScore}</p>
    <button id="reloadbtn" onclick='location.reload()'>Reload</button>
    `
    endgame.style.display = 'flex'
}


addWordToWind();

//Event listeners

// Event for string input
text.addEventListener('input', (e) => {
    const inputText = e.target.value;        //Saving the inserted text

    if (inputText === randomWord) {
        addWordToWind();
        scoreUpdate();
        e.target.value = ''

        if (difficulty === 'easy') {
            currTime += 5
        } else if (difficulty === 'mediocre') {
            currTime += 3
        } else {
            currTime += 2
        }

        timeUpdate()
    }
});

// Settings display or not
butnsetngs.addEventListener('click', () => {
    setngs.classList.toggle('hide');         //Enables to turn on and off
})

// Settings difficulty
formsetngs.addEventListener('change', (e) => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)

})
