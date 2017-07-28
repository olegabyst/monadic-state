const assert = require("assert");

module.exports = function State(st) {
  let state = st;
  const fns = [];
  let run = false;;

  function read() {
    return state;
  }

  function write(val) {
    state = val;
  }

  this.then = function (fn) {
    if (run) {
      throw new Error("State is already run");
    }
    if (typeof fn !== "function") {
      throw new TypeError( "You should pass a function");
    }
    if (fn.length < 3) {
      throw new TypeError("Function should receive at least 3 arguments")
    }
    fns.push(fn);
    return this;
  }

  this.run = function () {
    let promise = Promise.resolve();
    run = true;

    for (const fn of fns) {
      if (fn.length === 3) {
        promise = promise.then(val => {
          return fn(val, read, write)
        })
      } else if (fn.length === 4) {
        promise = promise.then(val => {
          return new Promise((resolve, reject) => {
            fn(val, read, write, (err, val) => {
              if (err) reject(err);
              else resolve(val);
            })
          });
        });
      }
    }

    return promise;
  }
}
