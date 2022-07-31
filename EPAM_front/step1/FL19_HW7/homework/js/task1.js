let start = prompt('Please enter the first number');
const firstnumber = parseInt(start);
if (isNaN(firstnumber)) {
    alert('Invalid input data');
} else {
    let end = prompt('Please enter the second number');
    const secondnumber = parseInt(end);
    if (isNaN(secondnumber) || firstnumber>secondnumber) {
        alert('Invalid input data');
    } else {
        let list = [];
        for (let i = firstnumber+1; i < secondnumber; i++) {
            list.push(i);
        }
        alert(`First number: ${firstnumber}\nSecond number: ${secondnumber}\nNumbers between: ` + list);
    }
}