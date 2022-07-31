import { test,expect } from 'vitest';
import {validateStringNotEmpty, validateNumber} from './validation.js'

test('Validate string not empty', () =>{
    expect(() => validateStringNotEmpty('')).toThrow('Invalid input - must not be empty.');
})
test('Validate number', () =>{
    expect(() => validateNumber('num')).toThrow('Invalid number input.');
})