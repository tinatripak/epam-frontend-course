const firstAttemp = 100;
const minNumber = 0;
const firstMaxNumber = 8;
const differenceMaxNumbers = 4;
const questionContinue = 'Do you want to continue?';
const questionGameAgain = 'Do you want to play again?';
const attempsCount = 3;
const two = 2;
let currentMaxNumber;
let degree = 0;
let randNumber;
let result = 0;
let playAgain = true;
let enteredNumber;
let ifContinue = true;
let possiblePrize = 0;

if (!confirm('Do you want to play a game?')) {
    alert('You did not become a billionaire, but can.');
} else {
    while(playAgain){
        currentMaxNumber = differenceMaxNumbers*degree + firstMaxNumber;
        randNumber = Math.floor(Math.random() * (currentMaxNumber - minNumber + 1) ) + minNumber;
        possiblePrize = firstAttemp * Math.pow(two, degree);

        for (let i = 0; i < attempsCount; i++) {
            enteredNumber = parseInt(prompt(`Choose a roulette pocket number `+
            `from ${minNumber} to ${currentMaxNumber}\n`+
            `Attempts left: ${attempsCount - i}\n`+
            `Total prize: ${result} $\n`+
            `Possible prize on current attempt: ${possiblePrize/Math.pow(two, i)} $ `));

            if (isNaN(enteredNumber)){
                alert('Invalid input data\nPlease type an int number');
            } 
            if (enteredNumber === randNumber) {
                if (i < attempsCount) {
                    result += possiblePrize/Math.pow(two, i);
                    alert(`Congratulation, you won!\nYour prize is: ${result} $.`);
                    break;
                } else {
                    alert(`Thank you for your participation.\nYour prize is: ${result} $`);
                }
            } else {
                continue;
            }
        }

        if ( enteredNumber === randNumber ) {
            ifContinue = confirm(questionContinue);
            if (!ifContinue) {
                alert(`Thank you for your participation.\nYour prize is: ${result}$.`);
                playAgain = confirm(questionGameAgain);

            } else {
                degree++;
            }
        } else {
            alert(`Thank you for your participation.\nYour prize is: ${result}$.`);
            ifContinue = false;
            playAgain = confirm(questionGameAgain);
        }
    }
}