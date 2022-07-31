import {generateCompChoice} from './generation.js';
import {winOrLose} from './game.js';
import '../scss/styles.scss';

const userChoiceElement = document.getElementById('user');
const computerChoiceElement = document.getElementById('computer');
const userPoints = document.getElementById('user-points');
const computerPoints = document.getElementById('computer-points');
const game = document.getElementById('game');
const main = document.getElementsByTagName('main')[0];
const reset = document.getElementsByTagName('button')[0];
const resultElement = document.getElementById('result');
const images = document.querySelectorAll('img'); 
const winPoints = 3;
const caseRock = 1;
const caseScissors = 2;
const casePaper = 3;

let results;
let count = 0;
let userCount = 0;
let computerCount = 0;
let p = document.createElement('p');
let result;
let userChoice;
let computerChoice;

images.forEach(img => img.addEventListener('click', (e) => {
    game.style.display='block';
    reset.style.display='block';
    userChoice = e.target.id;
    userChoiceElement.innerHTML = userChoice;
    computerChoice = generateCompChoice(images, caseRock, caseScissors, casePaper, computerChoice);
    computerChoiceElement.innerHTML = computerChoice;
    
    results = winOrLose(computerChoice, userChoice, result, userCount, computerCount, resultElement, count);
    userCount = results.usrCount;
    computerCount = results.cmpCount;

    userPoints.innerHTML = userCount;
    computerPoints.innerHTML = computerCount;

    if(userCount === winPoints || computerCount === winPoints){
        game.style.display = 'none';

        if(userCount === winPoints){
            p.innerHTML = 'The winner is user';
        } else if(computerCount === winPoints){
            p.innerHTML = 'The winner is computer';
        }
        main.appendChild(p);
        return;
    }
}));

reset.addEventListener('click', function(){
    userCount = 0;
    computerCount = 0;
    userChoiceElement.innerHTML = '';
    computerChoiceElement.innerHTML = '';
    resultElement.innerHTML = '';
    userPoints.innerHTML = '';
    computerPoints.innerHTML = '';
    game.style.display = 'none';
    reset.style.display='none';
});