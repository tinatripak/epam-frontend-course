import { test,expect } from 'vitest';
import {add} from './math.js'

test('Add should return correct sum of values', () => {
    expect(add([7,8])).toBe(15);
    expect(add([-1,0])).toBe(-1);

})