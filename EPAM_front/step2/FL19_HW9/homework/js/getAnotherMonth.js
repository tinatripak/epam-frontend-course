export default function getAnotherMonth(date, number, monthdays) {
    date.setMonth(date.getMonth() + number);
        
    while (monthdays.firstChild) {
        monthdays.removeChild(monthdays.lastChild);
    }
}