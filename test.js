const fs = require("fs");
const { expect } = require("chai");
const State = require(".");

describe("State", function() {
  it("read init state", () => {
    let st = new State("Hello world");
    return st.then((read, write, val) => {
      expect(read()).to.be.equal("Hello world");
    });
  });

  it("write/read init state", () => {
    const msg = "Hello man";

    let st = new State();

    return st
      .then((read, write, val) => {
        write(msg);
      })
      .then((read, write, val) => {
        expect(read()).to.be.equal(msg);
      });
  });

  it("#then can handle fn with one parameter like a Promise", () => {
    let st = new State("Hello");

    st.then(val => expect(val).to.be.equal("Hello"));
  });
});
