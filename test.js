const fs = require("fs");
const { expect } = require("chai");
const State = require(".");

const msg = "Hello World";

describe("State", function() {
  it("read init state", () => {
    return new State(msg).then((read, write, val) => {
      expect(read()).to.be.equal(msg);
    });
  });

  it("write/read init state", () => {
    return new State()
      .then((read, write, val) => {
        write(msg);
      })
      .then((read, write, val) => {
        expect(read()).to.be.equal(msg);
      });
  });

  it("#then can handle fn with one parameter like a Promise", () => {
    return new State(msg).then(val => expect(val).to.be.equal(msg));
  });
});
