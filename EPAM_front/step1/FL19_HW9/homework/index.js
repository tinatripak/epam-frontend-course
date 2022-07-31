// #1
function calculateSum(arr) {
    let sum = 0;
    arr.forEach(element => {
        sum += element
    });
    return sum;
}

//console.log(calculateSum([1,2,3,4,5])); //15

// #2
function isTriangle(a, b, c) {
    if(a<=0 || b<=0 || c<=0){
        return false;
    }

    if(a+b>c && a+c>b && b+c>a){
        return true;
    } else{
        return false;
    }
}

//console.log(isTriangle(5,6,7)); //true
//console.log(isTriangle(2,9,3)); //false

// #3
function isIsogram(word) {
    return !word.match(/([a-z]).*\1/i);
}

//console.log(isIsogram('Dermatoglyphics')); //true
//console.log(isIsogram('abab')); //false

// #4
function isPalindrome(word) {
    return word === word.split('').reverse().join('');
}

//console.log(isPalindrome('Dermatoglyphics')); //false
//console.log(isPalindrome('abbabba')); //true

// #5
function showFormattedDate(dateObj) {
    const monthName = dateObj.toLocaleString('en-US', {month: 'long'});
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
   return `${date} of ${monthName}, ${year}`;
}

//console.log(showFormattedDate(new Date('05/12/22'))); //'12 of May, 2022'

// #6
const letterCount = (str, letter) => {
    return str.split('').filter( str => str === letter ).length;
};

// console.log(letterCount('abbaba', 'b')); //3

// #7
function countRepetitions(arr) {
    const array = {};
    arr.forEach(element => {
        array[element] = (array[element] || 0) + 1;
    });
    return array;
}

//console.log(countRepetitions(['banana', 'apple', 'banana'])); // { banana: 2, apple: 1 }

// #8
function calculateNumber(arr) {
    return parseInt(arr.join(''), 2 );
}

//console.log(calculateNumber([0, 1, 0, 1])); //5
//console.log(calculateNumber([1, 0, 0, 1])); //9