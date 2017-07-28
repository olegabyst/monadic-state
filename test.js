const {expect} = require("chai");
const State = require(".");
const fs = require("fs");

describe("State", function () {
  let st;

  beforeEach(() => {
    st = new State("Hello World")
  });

  it("read the state", async () => {
    let state = await st.then((val, read, write) => {
      let state = read();
      return state;
    })
    .run();
    
    expect(state).to.be.equal("Hello World");
  });

  it("write the state", async () => {
    let state = await st.then((val, read, write) => {
      write("Hello man");
      return read();
    })
    .run();

    expect(state).to.be.equal("Hello man");
  });

  context("When already run", () => {
    beforeEach((done) => {
      st.run().then(() => done());
    });

    it("should not accept new functions", () => {
      expect(() => {
        st.then((val, read, write) => {})
      })
      .to.throw();
    });
  });

  describe("Running with asynchronous functions", () => {
    const testfile = "testfile.js";

    it("read the state", async function () {
      let state = await st.then((val, read, write, done) => {
        fs.writeFile(testfile, read(), (err) => {
          done(null, "File is written");
        });
      })
      .run();

      expect(state).to.be.equal("File is written");
    })

    after(function () {
      fs.unlinkSync(testfile);
    });

  });
});
