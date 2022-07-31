import '../css/style.scss';
import findPrevDay from './findPrev.js'
import getAnotherMonth from './getAnotherMonth.js'

const monthsName = document.querySelector('.monthsName');
const year = document.querySelector('.year');
const monthDays = document.querySelector('#days');
const previousButton = document.querySelector('#previousMonth');
const nextButton = document.querySelector('#nextMonth');
const currentDate = new Date();
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const minusOneDay = -1;
const plusOneDay = 1;
let nextBoxes;
let lastBoxes;
let thisBoxes;
let numberOfDay;

function makeCalendar() {
    currentDate.setDate(1);

    const lastDayMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const prevLastDayMonth = new Date( currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    const first = currentDate.getDay();
    const last = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDay();
    const countOfDaysMinusOne = 6;
    const nextDays = countOfDaysMinusOne - last;

    monthsName.innerHTML = months[currentDate.getMonth()];
    year.innerHTML = currentDate.getFullYear();

    for (let i = first; i > 0; i--) {
        const prevDate = document.createElement('div');
        prevDate.className = 'prev-date'
        prevDate.innerHTML = prevLastDayMonth - i + 1;
        monthDays.appendChild(prevDate);
    }

    for (let i = 0; i < lastDayMonth; i++) {
        const date = document.createElement('div');
        if (i + 1 === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
            date.className = 'current-date'
            if(currentDate.getFullYear() === new Date().getFullYear()){
                date.style.backgroundColor = '#1f1f45';
                date.style.boxShadow = '5px 10px rgba(0, 0, 0, 0.8)'
            }
            date.innerHTML = i + 1;
        } else {
            date.className = 'this-month'
            date.innerHTML = i + 1;
        }
        monthDays.appendChild(date);
    }

    for (let i = 0; i < nextDays; i++) {
        const nextDate = document.createElement('div');
        nextDate.className = 'next-date'
        nextDate.innerHTML = i + 1;
        monthDays.appendChild(nextDate);
    }
    nextBoxes = document.querySelectorAll('.next-date');
    lastBoxes = document.querySelectorAll('.prev-date');
    thisBoxes = document.querySelectorAll('.this-month');
    ifClickDatesOfNextMonth();
    ifClickDatesOfPreviousMonth();
    ifClickDatesOfThisMonth();
}

previousButton.addEventListener('click', () => {
    getNextOrPrevMonth(minusOneDay);
});

nextButton.addEventListener('click', () => {
    getNextOrPrevMonth(plusOneDay);
});

makeCalendar();

function ifClickDatesOfNextMonth(){
    nextBoxes.forEach(box => {
        box.addEventListener('click', function handleClick() {
            getNextOrPrevMonth(plusOneDay);
        });
    });
}

function ifClickDatesOfPreviousMonth(){
    lastBoxes.forEach(box => {
        box.addEventListener('click', function handleClick() {
            getNextOrPrevMonth(minusOneDay);
        });
    });
}

function ifClickDatesOfThisMonth(){
    thisBoxes.forEach(box => {
        box.addEventListener('click', function handleClick() {
            findPrevDay(thisBoxes, document.querySelectorAll('.clicked'), numberOfDay)
            
            box.style.border = '1px solid white'
            box.className =`this-month clicked`;
            numberOfDay = box.innerHTML
        });
    });
}

function getNextOrPrevMonth(digit){
    getAnotherMonth(currentDate, digit, monthDays);
    makeCalendar();
}