import "mocha";
import * as bcrypt from "bcrypt";
import * as sinon from "sinon";
import { expect } from "chai";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { mockUser } from "../mocks/users.mock";

describe("User service", () => {
  const user = new User(mockUser);
  const spyHashSync = sinon.spy(bcrypt, "hashSync");
  let userService: UserService;

  before(() => {
    userService = new UserService();
    sinon.stub(user, "save").resolves("saveSpy");
    sinon.stub(User, "findOne").resolves("findOneSpy");
  });

  it("should hash user password while creating new user", done => {
    userService
      .create(user)
      .then(() => done())
      .catch(() => done());

    expect(spyHashSync.calledOnce).to.equal(true);
  });

  it("should save user to database", done => {
    userService
      .create(user)
      .then(isUserSaveStubCalled => {
        expect(isUserSaveStubCalled).to.equal("saveSpy");
        done();
      })
      .catch(() => done());
  });

  it("should check if user is present in database", done => {
    userService
      .getUser(user.email)
      .then(userFindOneWasCalled => {
        expect(userFindOneWasCalled).to.equal("findOneSpy");
        done();
      })
      .catch(() => done());
  });
});
