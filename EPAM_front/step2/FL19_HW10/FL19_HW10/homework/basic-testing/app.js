import { extractNumbers } from './src/parser.js';
import { validateStringNotEmpty, validateNumber } from './src/util/validation.js';
import { add } from './src/math.js';
import { transformToNumber } from './src/util/numbers.js';

const form = document.querySelector('form');
const output = document.getElementById('result');

function formSubmitHandler(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const numberInputs = extractNumbers(formData);
  let result = '';
  
  try {
    const numbers = [];
    for (const numberInput of numberInputs) {
      validateStringNotEmpty(numberInput);
      const number = transformToNumber(numberInput);
      validateNumber(number);
      numbers.push(number);
    }
    result = add(numbers).toString();
  } catch (error) {
    result = error.message;
  }
  output.textContent = resultOfInput(result);
}

const resultOfInput = (result) => { 
 
  let resultText = ''; 
 
  if (result === 'invalid') { 
    resultText = 'Invalid input. You must enter valid numbers.'; 
    return resultText 
  } else if (result !== 'no-calc') { 
    resultText = 'Result: ' + result; 
    return resultText 
  } 
} 
form.addEventListener('submit', formSubmitHandler); 
 
export { resultOfInput }