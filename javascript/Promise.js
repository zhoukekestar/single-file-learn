const promise = (time, err) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) {
        reject(err);
      } else {
        resolve(time);
      }
    }, time);
  })
);


// Basic Usage
promise(1000).then((res) => {
  console.log(`Promise.then: ${res}`);
});

promise(2000, new Error('CustomeError')).then((res) => {
  console.log(`Promise.then: ${res}`);
}).catch((err) => {
  console.log(`Promise.catch: ${err}`);
});

// Promise.then & Promise.race


console.time('Promise.all-time');
Promise.all([promise(4000), promise(3000)]).then((res) => {
  console.log(`Promise.all: ${res}`);
  console.timeEnd('Promise.all-time');
});

console.time('Promise.race-time');
Promise.race([promise(4000), promise(3000)]).then((res) => {
  console.log(`Promise.race: ${res}`);
  console.timeEnd('Promise.race-time');
});

console.time('Promise-chain-time');
promise(5000).then((res) => {
  console.log(`Promise chain: ${res}`);
  return 0; // return just a number
}).then((res) => {
  console.log(`Promise chain: ${res}`);
  return promise(1000);
}).then((res) => {
  console.log(`Promise chain: ${res}`);
  console.timeEnd('Promise-chain-time');
});
