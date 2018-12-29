import {RegisterController} from '../controllers/register.controller';
import {config} from '../../config';
import * as expressJwt from 'express-jwt';

export class Jwt {
  jwt() {
    const secret = config.secret;
    const isRevoked = this.isRevoked;

    return expressJwt({ secret, isRevoked }).unless({
      path: [
        // public routes that don't require authentication
        '/api/v1/user/auth',
        '/api/v1/user/register'
      ]
    });
  }

  async isRevoked(req, payload, done) {
    const user = await RegisterController.User.findById(payload.sub).select('-hash');

    if (!user) {
      return done(null, true);
    }

    done();
  }
}
