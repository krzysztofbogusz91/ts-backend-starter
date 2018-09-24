import "jasmine";
import * as bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { UserService } from "./user.service";
import { mockUser } from "../mocks/users.mock";

describe("User service", () => {
  const user = new User(mockUser);
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  beforeAll(() => {
    spyOn(User, "findOne");
    spyOn(bcrypt, "hashSync");
    spyOn(user, "save");
  });

  it("should hash user password while creating new user", () => {
    userService.create(user);
    expect(bcrypt.hashSync).toHaveBeenCalled();
    expect(bcrypt.hashSync).toHaveBeenCalledWith("1234", 10);
  });
  it("should save user to database", () => {
    userService.create(user);
    expect(user.save).toHaveBeenCalled();
  });

  it("should check if user is present in database", () => {
    userService.getUser(user.email);
    expect(User.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith(user.email);
  });
});
