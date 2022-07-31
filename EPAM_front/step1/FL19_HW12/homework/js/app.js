import { dictionary } from './dictionary.js';

let step = 1;
const maxSteps = 7;

function getRandomWord(obj) {
    const values = Object.values(obj);

    return values[Math.floor(Math.random() * values.length)];
}

let randomWord = getRandomWord(dictionary);
console.log(randomWord);

document.getElementById('resetButton').onclick = function () { 
    document.querySelectorAll('input').forEach( input => {
        input.value = '';
        input.style.backgroundColor = null;
    });
    randomWord = getRandomWord(dictionary);
    console.log(randomWord);
    step = 1;
};

document.getElementById('checkButton').onclick = function () {
    let arr = [];
    let notFound = -1;
    let objectOfLetters = document.querySelectorAll(`tr.line${step} input`);

    for( const form of objectOfLetters) {
        arr.push(form.value);
    }
    
    const guess = arr.join('');
    if(randomWord === guess){
        alert('Congratulations! You won.');
        objectOfLetters.forEach( input => {
        input.style.backgroundColor = '#69a964';
        });
        return;
    }

    if (dictionary.some(e => e === guess)){

        objectOfLetters.forEach(function (inputWithLetter, index) {
            if (inputWithLetter.value === randomWord[index]) {
                inputWithLetter.style.backgroundColor = '#69a964'; //green
            } else if (randomWord.indexOf(inputWithLetter.value) !== notFound) {
                inputWithLetter.style.backgroundColor = '#c8b358'; //orange
            } else {
                inputWithLetter.style.backgroundColor = '#777b7c'; //grey
            }
        });
        step += 1;
    } else{
        alert('Word not in list!');
        objectOfLetters.forEach( input => {
            input.value = '';
        });
        return;
    }

    if(step === maxSteps && randomWord !== guess){
        alert('Game over');
    }
};
