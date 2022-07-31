import { test,expect } from 'vitest';
import {extractNumbers} from './parser.js'

test('Extract numbers should correct return extracted values', () => {
    let obj1 ={
        num1: 5,
        num2: 1,
        get: function(someKey){
            return this[someKey];
        }
    }
    expect(extractNumbers(obj1)).toStrictEqual([5,1]);
})