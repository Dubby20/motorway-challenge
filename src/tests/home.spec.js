import chai from "chai";
import chaiHttp from "chai-http";
import configureContainer from "../container";

const { expect } = chai;

chai.use(chaiHttp);

const { app } = configureContainer().cradle;

describe("Make a request to an wrong route", async () => {
  it("returns a 404 error", (done) => {
    chai
      .request(app)
      .get("/wrong-url")
      .end((err, res) => {
        const { status, body } = res;

        expect(status).to.be.equal(404);
        expect(body).to.be.an("object");
        expect(body).to.have.property("message", "Path not found");
        done(err);
      });
  });

  it("returns the home response successfully", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        const {
          status,
          body: { message },
        } = res;
        expect(status).to.be.equal(200);
        expect(message).to.be.equal("Motorway challenge");
        done(err);
      });
  });
});
