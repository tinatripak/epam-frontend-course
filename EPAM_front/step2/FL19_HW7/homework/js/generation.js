export function generateCompChoice(imgs, firstCase, secondCase, thirdCase, cmpChoice) {
    const computerRandomChoice = Math.floor(Math.random() * imgs.length) + 1;
  
    switch(computerRandomChoice) {
        case firstCase:
            cmpChoice = 'rock';
        break;
        case secondCase:
            cmpChoice = 'scissors';
        break;
        case thirdCase:
            cmpChoice = 'paper';
        break;
        default:
        console.log('Error');
    }
    return cmpChoice;
}