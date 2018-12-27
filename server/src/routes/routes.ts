import {AuthController} from '../controllers/auth.controller';

export class Routes {
    private authController: AuthController = new AuthController();

    public routes(app): void {
        app.route('/api/v1/user/auth')
            .post(this.authController.auth)
    }
}
