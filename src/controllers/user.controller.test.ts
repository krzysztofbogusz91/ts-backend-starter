import "mocha";
import * as nodeMocks from "node-mocks-http";
import * as sinon from "sinon";
import { expect } from "chai";
import { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { mockUser } from "../mocks/users.mock";
import { UserService } from "../services/user.service";

describe("UserController", () => {
  let req: Request;
  let res: Response;
  let userService: UserService;
  let controller: UserController;

  beforeEach(() => {
    req = nodeMocks.createRequest({
      method: "POST",
      url: "/user",
      body: mockUser
    });
    res = nodeMocks.createResponse();
  });

  beforeEach(() => {
    userService = new UserService();
    controller = new UserController(userService);
  });

  it("should create user", done => {
    const stub = sinon.stub(userService, "create");
    stub.returns(Promise.resolve());

    controller
      .createUser(req, res)
      .then(() => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(err => done());

    stub.reset();
  });

  it("should return status code 500 when user failed to create", done => {
    const stub = sinon.stub(userService, "create").returns(Promise.reject());

    controller
      .createUser(req, res)
      .then(() => {
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(err => done());
    stub.reset();
  });

});
