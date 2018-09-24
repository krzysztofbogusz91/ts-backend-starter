import "jasmine";
import * as nodeMocks from "node-mocks-http";
import { Request, Response } from "express";
import { controller } from "./user.controller";
import { mockUser } from "./../mocks/users.mock";
import { UserService } from "../services/user.service";

describe("UserController", () => {
  let req: Request;
  let res: Response;
  let userService: UserService;

  beforeEach(() => {
    req = nodeMocks.createRequest({
      method: "POST",
      url: "/user",
      body: mockUser
    });
    res = nodeMocks.createResponse();
    userService = new UserService();
    spyOn(userService, "create");
  });

  it("should create user", done => {
    controller
      .createUser(req, res)
      .then(() => {
        expect(res.statusCode).toBe(200);
        done();
      })
      .catch(err => done());
  });
});
