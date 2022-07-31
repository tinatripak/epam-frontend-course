// #1
function extractCurrencyValue(param) {
    let number = parseFloat(param)
    const lengthForBigInt = 16
    if(param.length > lengthForBigInt){
        return BigInt(number);
    } else{
        return number;
    }
}

console.log(extractCurrencyValue('120 USD')); // 120
console.log(extractCurrencyValue('1283948234720742 EUR')); // 1283948234720742n


// #2

let object = {
    name: 'Ann',
    age: 16,
    hobbies: undefined,
    degree: null,
    isChild: false,
    isTeen: true,
    isAdult: false
}

function clearObject(obj) { 
    for (const key in obj) {
        if (!obj[key]) {
          delete obj[key];
        }
      }
    return obj;
}

console.log(clearObject(object)); // { name: 'Ann', age: 16, isTeen: true }


// #3

function getUnique(param) {
    return Symbol(param);
} 

console.log(getUnique('Test')) // Symbol('Test')


// #4

function countBetweenTwoDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysInWeeks = 7;
    const daysInMonths = 28;
    const msecInDays = 1000 * 60 * 60 * 24;
    
    const diffTime = new Date(start.getTime() - end.getTime()).getTime();
    const diffDays = Math.round(diffTime / msecInDays); 
    const diffWeeks = Math.round(diffDays / daysInWeeks);
    const diffMonts = Math.round(diffDays / daysInMonths);

    return `The difference between dates is: ${diffDays} day(-s), ${diffWeeks} week(-s), ${diffMonts} month(-s)`;
}

console.log(countBetweenTwoDays('03/22/22', '05/25/22')); // The difference between dates is: 64 day(-s), 9 week(-s), 2 month(-s)


// #5

function filterArrayWithoutSet(arr) {
    let filteredArray = arr.filter((element, index) => {
        return arr.indexOf(element) === index
    });
    return filteredArray;
}

console.log(filterArrayWithoutSet([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 4, 5, 6, 7, 8, 9]

function filterArrayWithSet(arr) {
    return new Set(arr);
}

console.log(filterArrayWithSet([1, 2, 2, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9])); // [1, 2, 4, 5, 6, 7, 8, 9]