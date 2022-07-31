import { test,expect } from 'vitest';
import {transformToNumber} from './numbers.js'

test('Transform number should transform correct', () =>{
    expect(transformToNumber('5')).toBe(5);
})