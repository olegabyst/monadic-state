const state = Symbol("state");
const root = global || window;

const Promise = (root.Promise = root.Promise || require("bluebird"));

process.on("unhandledRejection", e => console.log("\n==== Error ====\n\n", e));

function State(initState) {
  let state = initState;
  const read = () => state;
  const write = val => {
    state = val;
  };

  class State extends Promise {
    then(fn) {
      if (typeof fn !== "function") return this;
      if (fn.length <= 1) {
        return super.then(fn);
      } else {
        return super.then(fn.bind(root, read, write));
      }
    }
  }

  return State.resolve(initState);
}

module.exports = State;
