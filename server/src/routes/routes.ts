import {RegisterController} from '../controllers/register.controller';

export class Routes {
  private registerController: RegisterController = new RegisterController();

  public routes(app): void {
    app.route('/api/v1/user/auth')
      .post(this.registerController.authenticate);

    app.route('/api/v1/user/register')
      .post(this.registerController.register);
  }
}
