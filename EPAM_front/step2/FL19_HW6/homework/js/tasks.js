const date = new Date('2018-04-02'); //input
const datee = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

const newDataForDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
const newDataForMonth = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() - 1, 23, 59, 59);
const newDataForYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());

console.log(date)
console.log(datee)
console.log(newDataForDay)
console.log(newDataForMonth)
console.log(newDataForYear)
// console.log("2")
//1
const getMaxEvenElement = arr => arr.reduce((x, y) => Math.max(x, y));
const arr = ['1', '3', '4', '2', '5'];

console.log(getMaxEvenElement(arr));

//2
function swapVariables(){
    let a = 3;
    let b = 5;

    [a, b] = [b, a];

    console.log(a);
    console.log(b);
}
swapVariables()

//3
function getValue(variable){
    return variable ?? '-';
}

console.log(getValue(0));
console.log(getValue(4));
console.log(getValue('someText'));
console.log(getValue(null));
console.log(getValue(undefined));

//4
function getObjFromArray(arr){
 return Object.fromEntries(arr)
}
const arrayOfArrays = [
    ['name', 'dan'],
    ['age', '21'],
    ['city', 'lviv']
];

console.log(getObjFromArray(arrayOfArrays));

//5
function addUniqueId(obj){
    return {...obj, id: Symbol()};
}
const obj1 = {name: 'nick'};

console.log(addUniqueId(obj1));
console.log(addUniqueId({name: 'buffy'}));
console.log(Object.keys(obj1).includes('id'));

//6
const getRegroupedObject = ({details, name}) => { 
    return { 
        university: details.university, 
        user: { 
            age: details.age, 
            firstName: name, 
            id: details.id 
        } 
    };
}

const oldObj={
    name: 'willow',
    details: {id: 1, age: 47, university: 'LNU'}
};

console.log(getRegroupedObject(oldObj))

//7
function getArrayWithUniqueElements(array){
 return [... new Set(array)]
}
const array = [2, 3, 4, 2, 4, 'a', 'c', 'a'];

console.log(getArrayWithUniqueElements(array));

//8
function hideNumber(phone){
    const endDigits = phone.slice(-4);
    return endDigits.padStart(phone.length, '*');
}
const phoneNumber = '0123456789';

console.log(hideNumber(phoneNumber));

//9
const isRequired = (str) => { 
    console.error(new Error(`${str} is required`));
};

function add(a, b){
    try{
        if(typeof b === 'undefined'){
            isRequired('b');
        } else if(typeof a === 'undefined'){
            isRequired('a');
        } else{
            const sum = a + b;
            console.log(sum);
        }
    } catch (e) { 
        return new Error(e.message); 
    }
}

// add(2);
add(2,3);

//10
function* generateIterableSequence(){
    yield 'I'
    yield 'love'
    yield 'Epam'
}

const generatorObject = generateIterableSequence();

for(let value of generatorObject){
    console.log(value);
}