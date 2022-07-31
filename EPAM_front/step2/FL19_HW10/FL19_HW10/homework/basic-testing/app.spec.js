// @vitest-environment jsdom

document.body.innerHTML =`
<form></form>
<div id="result"></div>`

import { test,expect } from 'vitest';
import {resultOfInput} from './app.js'

test('correct input', () => {
    expect(resultOfInput(10)).toBe('Result: 10');
    expect(resultOfInput('invalid')).toBe('Invalid input. You must enter valid numbers.')

})
