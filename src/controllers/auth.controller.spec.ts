import "jasmine";
import * as nodeMocks from "node-mocks-http";
import * as passport from "passport";
import { controller } from "./auth.controller";
import { mockUser } from "./../mocks/users.mock";
import { Request, Response, NextFunction } from "express";

describe("AuthController", () => {
  let req: Request;
  let res: Response;
  const next: NextFunction = () => null;

  beforeEach(() => {
    req = nodeMocks.createRequest({
      method: "POST",
      url: "/login",
      body: mockUser
    });
    res = nodeMocks.createResponse();
  });

  it("should be able to call controller", () => {
    const passportSpy = spyOn(passport, "authenticate").and.returnValue(
      () => null
    );
    controller.onUserLogin(req, res, next);
    expect(passportSpy).toHaveBeenCalled();
  });
});
