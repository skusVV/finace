import {config} from '../../config';
import {UserSchema} from '../models/user.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export class RegisterController {
  static User = mongoose.model('User', UserSchema);

  async authenticate(req, res, next) {
    const user = await RegisterController.User.findOne({ userName: req.body.userName });

    if (user && bcrypt.compareSync(req.body.password, user.hash)) {
      const { hash, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);

      res.json({...userWithoutHash, token});
    } else {
      res.send('Login or password invalid');
    }
  }

  register(req, res, next) {
    if (req.body.promoCode !== config.promocode) {
      res.send('Invalid Promocode');
      return;
    }

    const user = new RegisterController.User(req.body);

    if (req.body.password) {
      user.hash = bcrypt.hashSync(req.body.password, 10);

    }

    user.save((err, user) => {
      if (err) {
        res.send(err);
      }

      res.json(user);
    });
  }
}
