import chai from "chai";
import chaiHttp from "chai-http";
import "dotenv/config";
import configureContainer from "../container";

const { expect } = chai;

chai.use(chaiHttp);

const { app} = configureContainer().cradle;


const vehicleId = 2;
const timestamp = "2022-09-11T17:03:17.000Z";

describe("Get vehicle information", () => {
  it("returns a vehicle information", (done) => {
    chai
      .request(app)
      .get(`/vehicles/${vehicleId}/${timestamp}`)
      .end((err, res) => {
        const { status, body } = res;

        expect(status).to.be.equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property(
          "message",
          "Vehicle information retrieved successfully"
        );
        expect(body.data).to.have.property("vehicleId", vehicleId);
        expect(body.data).to.have.property("state", "selling");
        expect(body.data).to.have.property("timestamp", timestamp);
        done(err);
      });
  });

  it("returns return error if data is not found", (done) => {
    chai
      .request(app)
      .get(`/vehicles/4/${timestamp}`)
      .end((err, res) => {
        const { status, body } = res;

        expect(status).to.be.equal(404);
        expect(body).to.be.an("object");
        expect(body).to.have.property(
          "message",
          "Vehicle information not found"
        );
        done(err);
      });
  });

  it("returns return error if vehicleId is not a number", (done) => {
    chai
      .request(app)
      .get(`/vehicles/ab/${timestamp}`)
      .end((err, res) => {
        const { status, body } = res;

        expect(status).to.be.equal(422);
        expect(body).to.be.an("object");
        expect(body).to.have.property("message", "vehicleId must be a number");
        done(err);
      });
  });

});
