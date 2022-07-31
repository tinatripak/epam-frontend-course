// #1

function getWeekDay(date){
    return new Intl.DateTimeFormat('en-US', { weekday : 'long' }).format(date);
}

// console.log(getWeekDay(Date.now())); // "Thursday" (if today is the 22nd October)
// console.log(getWeekDay(new Date(2020, 9, 22))); // "Thursday"

// #2

function getAmountDaysToNewYear(){
    const current = new Date(); 
    const currentMonth = current.getMonth();
    const currentDay = current.getDate();
    const currentYear = current.getFullYear();
    const dateNow = new Date(currentYear, currentMonth, currentDay);
    const dateNewYear = new Date(currentYear + 1, 0, 1);
    const msecsInSecond = 1000;
    const secondsInHour = 3600;
    const hoursInDay = 24;
    const toDays = msecsInSecond * secondsInHour * hoursInDay;
    let difference = Math.abs(dateNewYear-dateNow);
    let days = difference/toDays;

    return Math.round(days);
}
console.log(getAmountDaysToNewYear()); // 124 (if today is the 30th August)

// #3

// const birthday17 = new Date(2005, 12, 29);
// const birthday15 = new Date(2007, 12, 29);
// const birthday22 = new Date(2000, 9, 22);

function getApproveToPass(birthday){
    let yearsLeft = 0;
    const adulthood = 18;
    const almostAdulthood = 17;
    const ifLessYearByEighteen = 'Hello adventurer, you are too young for this quest wait for few more months';
    const ifMoreEighteen = 'Hello adventurer, you may pass!';
    const yearOfBirthday = birthday.getFullYear() - 1;
    const currentYear = new Date().getFullYear();
    let difference = Math.abs(currentYear - yearOfBirthday);
    
    if(difference >= adulthood){
        return ifMoreEighteen;
    } else if(difference < almostAdulthood){
        yearsLeft = adulthood - difference;
        const ifMoreYearByEighteen = `Hello adventurer, you are too young for this quest` +
        ` wait for ${yearsLeft} years more`;
        return ifMoreYearByEighteen;
    } else{
        return ifLessYearByEighteen;
    }
}

// console.log(getApproveToPass(birthday17)); // Hello adventurer, you are too young for this quest wait for few more months!
// console.log(getApproveToPass(birthday15)); // Hello adventurer, you are too young for this quest wait for 3 years more!
// console.log(getApproveToPass(birthday22)); // Hello adventurer, you may pass!

// #4

const elementP = 'tag="p" class="text" style={color: #aeaeae;} value="Hello World!"';

function transformStringToHtml(element){
    const tagRegex = new RegExp('(?<=tag=")[^"]+(?=")', 'g');
    const valueRegex = new RegExp('(?<=value=")[^"]+(?=")', 'g');
    const [tag] = element.match(tagRegex);
    const [value] = element.match(valueRegex);
    const attributes = element.replace(/(tag=".*?")/g, '').replace(/({|})/g, '"').replace(/(value=".*?")/g, '');
    return `<${tag}${attributes}>${value}</${tag}>`;
}

console.log(transformStringToHtml(elementP));
// ‘<p class=”text” style=”color: #aeaeae;”>Hello World!</p>’

// #5

function isValidIdentifier(variable){
    return /^((?:\b[_a-zA-Z]|\B\$)[_$a-zA-Z0-9]*)$/.test(variable);
}

console.log(isValidIdentifier('myVar!')); // false
console.log(isValidIdentifier('myVar$')); // true
console.log(isValidIdentifier('myVar_1')); // true
console.log(isValidIdentifier('1_myVar')); // false

// #6

const testStr = 'My name is John Smith. I am 27.';

function capitalize(str){
    return str.replace(/(^\w|\s\w)/g, word => word.toUpperCase());
}

console.log(capitalize(testStr)); // "My Name Is John Smith. I Am 27."

// #7

function isValidPassword(password){
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

console.log(isValidPassword('agent007')); // false (no uppercase letter)
console.log(isValidPassword('AGENT007')); // false (no lowercase letter)
console.log(isValidPassword('AgentOOO')); // false (no numbers)
console.log(isValidPassword('Age_007')); // false (too short)
console.log(isValidPassword('Agent007')); // true

// #8

function bubbleSort(array){
    for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[j] > array[j + 1]) {
				let temporary = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temporary;
			}
		}
	}
	return array;
}

// console.log(bubbleSort([7,5,2,4,3,9])); //[2, 3, 4, 5, 7, 9]

// #9

const inventory = [
    { name: 'milk', brand: 'happyCow', price: 2.1 },
    { name: 'chocolate', brand: 'milka', price: 3 },
    { name: 'beer', brand: 'hineken', price: 2.2 },
    { name: 'soda', brand: 'coca-cola', price: 1 }
    ];

function sortByItem(obj){
    const ifMore = 1;
    const ifLess = -1;
    return obj.array.sort((a,b) => a[obj.item] > b[obj.item] ? ifMore : ifLess);
}

console.log(sortByItem({item: 'name', array: inventory})); 
// [ { "name": "beer", "brand": "hineken", "price": 2.2 },
// { "name": "chocolate", "brand": "milka", "price": 3 },
// { "name": "milk", "brand": "happyCow", "price": 2.1 },
// { "name": "soda", "brand": "coca-cola", "price": 1 } ]
