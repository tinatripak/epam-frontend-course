import { test,expect } from 'vitest';
import {generateToken} from './async-example.js'

test('Generate should correct generate token for user', () => {
    const res = {
        email: null,
        password: null,
        callBack: null,
        calls: 0
    };
    const callBack = (err, token) => token;
    const signUser ={
        sign(email, password, callBack){
            res.user = email;
            res.password = password;
            res.callBack = callBack;
            res.calls +=1;
        }
    };
    generateToken('test@test.com', callBack, signUser);
    expect(res.calls).toBe(1);
    expect(res.user.email).toBe('test@test.com');
    expect(res.password).toBe('password');
    expect(res.callBack).toBe(callBack);
})
