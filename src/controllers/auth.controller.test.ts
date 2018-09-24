import "mocha";
import * as nodeMocks from "node-mocks-http";
import * as sinon from "sinon";
import * as passport from "passport";
import { Request, Response, NextFunction } from "express";

import { expect } from "chai";
import { AuthController } from "../controllers/auth.controller";
import { mockUser } from "../mocks/users.mock";

describe("AuthController", () => {
  let req: Request;
  let res: Response;
  let controller: AuthController;
  const next: NextFunction = () => true;

  beforeEach(() => {
    req = nodeMocks.createRequest({
      method: "POST",
      url: "/login",
      body: mockUser
    });
    res = nodeMocks.createResponse();

    controller = new AuthController();
  });

  it("should authenticate user", () => {
    const passportSpy = sinon
      .spy(passport, "authenticate");

    controller.onUserLogin(req, res, next);
    expect(passportSpy.calledOnce).to.equal(true);
    passportSpy.restore();
  });
});
