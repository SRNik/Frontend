const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
// Shows the wrong letters chosen 

const popup = document.getElementById('popup-container')
const notification = document.getElementById('notis-container')
const finalMessage = document.getElementById('final-msg')

const figParts = document.querySelectorAll('.fig-part')
const words = ["aback", "abaft", "abandoned", "abashed", "aberrant", "abhorrent", "abiding", "abject", "ablaze", "able", "abnormal", "aboard", "aboriginal", "abortive", "abounding", "abrasive", "abrupt", "absent", "absorbed", "absorbing", "abstracted", "absurd", "abundant", "dangerous", "dapper", "dare", "dark", "dashing", "daughter", "day", "dazzling", "dead", "deadpan", "deafening", "dear", "death", "debonair", "debt", "decay", "deceive", "decide", "decision", "decisive", "decorate", "decorous", "deep", "deeply", "deer", "defeated", "defective", "defiant", "full", "fumbling", "functional", "funny", "furniture", "furry", "furtive", "future", "futuristic", "fuzzy", "gabby", "gainful", "gamy", "gaping", "garrulous", "gate", "gather", "gaudy", "gaze", "geese", "general", "gentle", "ghost", "giant", "giants", "giddy", "gifted", "gigantic", "giraffe", "girl", "girls", "glamorous", "glass", "gleaming", "glib", "glistening", "glorious", "glossy", "glove", "glow", "glue", "godly", "gold", "good", "goofy", "gorgeous", "government", "governor", "grab", "miniature", "minister", "minor", "mint", "minute", "miscreant", "miss", "mist", "misty", "mitten", "mix", "mixed", "moan", "moaning", "modern", "moldy", "mom", "momentous", "money", "monkey", "month", "moon", "moor", "morning", "mother", "motion", "motionless", "mountain", "mountainous", "mourn", "mouth", "move", "muddle", "muddled", "mug", "multiply", "mundane", "murder", "murky", "muscle", "mushy", "mute", "mysterious", "nail", "naive", "name", "nappy", "narrow", "nasty", "nation", "natural", "naughty", "nauseating", "near", "neat", "nebulous", "necessary", "neck", "need", "needle", "needless", "needy", "neighborly", "nerve", "nervous", "nest", "new", "next", "nice", "nifty", "night", "nimble", "nine", "nippy", "nod", "noise", "noiseless", "noisy", "nonchalant", "nondescript", "nonstop", "normal", "north", "nose", "nostalgic", "nosy", "note", "notebook", "notice", "noxious", "null", "number", "numberless", "numerous", "nut", "rod", "roll", "romantic", "roof", "room", "roomy", "root", "rose", "rot", "rotten", "rough", "round", "route", "royal", "rub", "ruddy", "rude", "ruin", "rule", "run", "rural", "rush", "rustic", "ruthless", "sable", "sack", "sad", "safe", "sail", "salt", "salty", "same", "sand", "sassy", "satisfy"]

let selectedWord = words[Math.floor(Math.random() * words.length)];
// Gives us a random word from the array "words"

const rightLetters = [];
const faultLetters = [];

// Show hidden word. Creates new span for each letter. In the beginning just lines are shown beacuse nothing has been guessed yet
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class='letter'>
                        ${rightLetters.includes(letter) ? letter : ''}
                    </span>
                `
                // Includes method returns true if a string contains a specifies string 
                // Checking if the chosen letter is in the rightLetters array. 
            )
            .join('')}
    `;


    const theInnerWord = wordEl.innerText.replace(/\n/g, '')
    // Needed so that all spans in corresponding div are inline

    if (theInnerWord === selectedWord) {
        finalMessage.innerText = 'Hurray! You have won!';
        popup.style.display = 'flex'
        // Message is shown
    }

}

displayWord();

// Update the wrong letters
function updateFaultLettersEl() {
    //Shows the wrong letters
    wrongLettersEl.innerHTML = `
    ${faultLetters.length > 0 ? '<p>Wrong guesses:</p>' : ''} 
    ${faultLetters.map(i => `<span>${i}</span><br>`)}
    `
    // Shows hangman parts
    figParts.forEach(function (part, index) {           //figParts is an array because there are several elements with same class name
        const errors = faultLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none'         //Erase the body when lost
        }
    });

    // If the player lost the game
    if (faultLetters.length === 6) {
        finalMessage.innerText = `Nooo :( You have lost.... The word was: ${selectedWord}`;
        popup.style.display = 'flex'

    }
}

//Show notis
function showNotification() {
    notification.classList.add('show')    //adds notis class

    setTimeout(() => {
        notification.classList.remove('show')    //removes notis class
    }, 3000)
}



// Keydown letter press
window.addEventListener('keydown', (e) => {
    if (e.code >= 'KeyA' && e.code <= 'KeyZ') {     //condition if any letter has been pressed. Other ones are ignored
        const bokstav = e.key; //saving the pressed key

        if (selectedWord.includes(bokstav)) {
            if (!rightLetters.includes(bokstav)) {
                rightLetters.push(bokstav);

                displayWord();    //Needed so that the displayed word is updated
            }
            else {
                showNotification()
            }
        }
        else {
            if (!faultLetters.includes(bokstav)) {       //only add letter in fault array if it is not guessed before
                faultLetters.push(bokstav);

                updateFaultLettersEl();
            }
            else {
                showNotification();
            }

        }
    }
    else {
        alert('Please press an english letter or press the button')
    }
})

// Clicking the play again button
const btn = document.querySelector('#play-btn')
btn.addEventListener('click', () => {
    //Erasing the content
    rightLetters.splice(0);
    faultLetters.splice(0);

    //Selecting a new word from the word array
    selectedWord = words[Math.floor(Math.random() * words.length)];

    // Calling the displaywords again
    displayWord();

    //Empting all the added elements in DOM
    updateFaultLettersEl();

    //Hiding the popup
    popup.style.display = 'none'

})


