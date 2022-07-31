let clicks = 0;
let active = false;
let arrayResults = [];
let bestResult = 0;
let dictForLocal = JSON.parse(localStorage.getItem('dict')) || {};
let dictForSession = JSON.parse(sessionStorage.getItem('dictSession')) || [];
let nickname = '';
const nameNotNull = true;
const timer = 5000;
const notEqual = -1;

function checkName(){
    nickname = document.getElementById('nickname').value;
    if(nickname === '') {
        alert('Empty nickname');
    } else{
        return nameNotNull;
    }
}

function validate(){
    if(active){
        alert('Wait until the timer stops');
        return;
    }
    try {
        if(checkName() === nameNotNull){
            clicks = 0;
            active = true;
            setTimeout(() => completeTimer(), timer);
        }
    } catch(err) {
        throw new Error('Failed in another way', { cause: err });
    }
}

function ifNicknameInArray(){
    let index = arrayResults.findIndex(item => item.nickname === nickname);
    return index;
}

function countClicksInArray(){
    let equal = ifNicknameInArray();
    return arrayResults[equal].clicks;
}

function addResultToLocalStorage(){
    dictForLocal[nickname] = countClicksInArray();
    localStorage.setItem('dict', JSON.stringify(dictForLocal));
}

function addResultToSessionStorage(){
    dictForSession.push(clicks);
    sessionStorage.setItem('dictSession', JSON.stringify(dictForSession));
}

function counterClicks(){
    clicks++;
}

function completeTimer(){
    let equal = ifNicknameInArray();

    if(equal !== notEqual){
        arrayResults[equal].clicks = Math.max(clicks, countClicksInArray());
        addResultToLocalStorage();
    } else if(nickname in dictForLocal){
        dictForLocal[nickname] = Math.max(dictForLocal[nickname], clicks);
        localStorage.setItem('dict', JSON.stringify(dictForLocal));
    } else{
        arrayResults.push({nickname, clicks});
        addResultToLocalStorage();
    }
    addResultToSessionStorage()
    alert(`You clicked ${clicks} times`)
    clicks = 0;
    active = false;
}

function chooseBestResult(){
    const dictionary = JSON.parse(sessionStorage.getItem('dictSession'));
    const maxValue = Math.max(0,...dictionary);

    alert(`Best result is: ${maxValue}`);
}

function chooseBestResultForAllTime(){
    const dictionary = JSON.parse(localStorage.getItem('dict'));

    if(dictionary!==null){
        const dictEntries = Object.entries(dictionary);
        const reduce = dictEntries.reduce((a, dictionary) => a[1] > dictionary[1] ? a : dictionary);
        const bestKey = reduce[0];
        alert(`Best result for the whole time is: ${bestKey} by ${dictionary[bestKey]}`);
    }
}

function clearBestResultForAllTime(){
    for (let key in dictForLocal) {
        if(dictForLocal.hasOwnProperty(key)) {
            dictForLocal[key] = 0;
        }
    }
    localStorage.setItem('dict', JSON.stringify(dictForLocal));
    dictForLocal = {};
    alert('Best result for the whole time is cleared');
}

function clearBestResult(){
    const dictionary = JSON.parse(sessionStorage.getItem('dictSession'));
    const maxValue = Math.max(0,...dictionary);
    const index = dictionary.indexOf(maxValue);
    dictForSession[index] = 0;
    sessionStorage.setItem('dictSession', JSON.stringify(dictForSession));
    alert('Best result is cleared');
}