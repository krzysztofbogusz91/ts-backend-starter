import 'mocha';
import * as nodeMocks from 'node-mocks-http';
import * as sinon from 'sinon';
import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';

import { expect } from 'chai';
import { AuthController } from '../controllers/auth.controller';
import { mockUser } from '../mocks/users.mock';

describe('AuthController', () => {
  let req: Request;
  let res: Response;
  let controller: AuthController;
  const next: NextFunction = () => true;
  let passportSpy;

  beforeEach(() => {
    req = nodeMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: mockUser
    });
    res = nodeMocks.createResponse();

    controller = new AuthController();
    passportSpy = sinon.spy(passport, 'authenticate');
  });

  it('should authenticate user', () => {
    controller.onUserLogin(req, res, next);

    expect(res.statusCode).to.equal(200);
    expect(passportSpy.calledOnce).to.equal(true);
    passportSpy.restore();
  });

  it('should not authenticate user when wrong credentials are passed', () => {
    req.body = {};

    controller.onUserLogin(req, res, next);

    expect(passportSpy.calledOnce).to.equal(true);
    expect(res.statusCode).to.equal(401);
    passportSpy.restore();
  });
});
