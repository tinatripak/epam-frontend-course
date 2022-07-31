import jwt from 'jsonwebtoken';

export function generateToken(email, callback, somejwt = jwt) {
  somejwt.sign({ email }, 'password', callback);
}

export function generateTokenPromise(email) {
  return new Promise((resolve, reject) => {
    jwt.sign({ email }, 'password', (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

 generateToken('test@test.com', (err, token) => {
  console.log(token);
});

generateTokenPromise('test@test.com').then((token) => console.log(token)); 
