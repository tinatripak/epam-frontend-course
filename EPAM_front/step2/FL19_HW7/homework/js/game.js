export function winOrLose(cmpChoice, usrChoice, res, usrCount, cmpCount, resElement, count) {
    if (cmpChoice === usrChoice) {
        res = 'Tie!'
        resElement.innerHTML = res;
    } else if(cmpChoice === 'rock' && usrChoice === 'paper' || 
        cmpChoice === 'paper' && usrChoice === 'scissors' || 
        cmpChoice === 'scissors' && usrChoice === 'rock') {
        res = `Round ${count}, ${usrChoice} vs. ${cmpChoice}, You've WON!`;
        usrCount++;
        resElement.innerHTML = res;
    } else{
        res = `Round ${count}, ${usrChoice} vs. ${cmpChoice}, You've LOST!`;
        cmpCount++;
        resElement.innerHTML = res;
    }
    return { usrCount, cmpCount };
}