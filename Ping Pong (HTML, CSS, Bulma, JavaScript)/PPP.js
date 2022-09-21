const pl1Button = document.querySelector('#pl1Button')
const pl2Button = document.querySelector('#pl2Button')

const pl1Display = document.querySelector('#pl1Display')
const pl2Display = document.querySelector('#pl2Display')
const reloadButton = document.querySelector('#reload')

const playlim = document.querySelector('#playlim')

let pl1Score = 0
let pl2Score = 0

let winScore = 3;
let isGaOver = true                 //can only start the game when chosing number in select




pl1Button.addEventListener('click', function () {
    if (playlim.value === '') {
        alert('Choose the reaching score in order to play')
        isGaOver = true                                                 //Needed so that the score does not update
    }
    if (!isGaOver) {
        pl1Score += 1                       //adding 1 to the score
        pl1Display.innerText = pl1Score
        if (pl1Score === winScore) {
            isGaOver = true
            pl1Display.classList.add('winner')
            pl2Display.classList.add('loser')
            pl1Button.disabled = true;                                  //Disabling the buttons when reaching the winning score
            pl2Button.disabled = true;
        }

    }
})

pl2Button.addEventListener('click', function () {
    if (playlim.value === '') {
        alert('Choose the reaching score in order to play')
        isGaOver = true
    }
    if (!isGaOver) {
        pl2Score += 1
        pl2Display.innerText = pl2Score
        if (pl2Score === winScore) {
            isGaOver = true
            pl1Display.classList.add('loser')
            pl2Display.classList.add('winner')
            pl1Button.disabled = true;
            pl2Button.disabled = true;
        }

    }
})

playlim.addEventListener('change', function () {
    if (this.value !== '') {
        winScore = parseInt(this.value);
        reload();
    }
})

reloadButton.addEventListener('click', reload)

function reload() {
    pl1Score = 0
    pl2Score = 0
    pl1Display.innerText = pl1Score
    pl2Display.innerText = pl2Score
    pl1Display.classList.remove('winner', 'loser')
    pl2Display.classList.remove('winner', 'loser')
    pl1Button.disabled = false;                                  //Abling the buttons when pressing reload
    pl2Button.disabled = false;
    isGaOver = false

}


