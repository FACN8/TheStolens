const logic = require("./logic.js");
const supertest = require("supertest");
const assert = require("assert");
const server = require("./server.js");

describe("GET /", () => {
  it("expected status 200", (done) => {
    supertest(server)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) done();
      });
  });
});
