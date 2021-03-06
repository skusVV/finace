import {RegisterController} from '../controllers/register.controller';
import {PaymentsController} from '../controllers/payments.controller';
import {CategoriesController} from '../controllers/categories.controller';

export class Routes {
  private registerController: RegisterController = new RegisterController();
  private paymentsController: PaymentsController = new PaymentsController();
  private categoriesController: CategoriesController = new CategoriesController();

  public routes(app): void {
    app.route('/api/v1/user/auth')
      .post(this.registerController.authenticate);

    app.route('/api/v1/user/register')
      .post(this.registerController.register);

    app.route('/api/v1/payments')
      .get(this.paymentsController.getAllPayments)
      .post(this.paymentsController.newPayment);

    app.route('/api/v1/payments/:id')
      .delete(this.paymentsController.deletePayment)
      .put(this.paymentsController.updatePayment)

    app.route('/api/v1/categories')
      .get(this.categoriesController.getAllCategories)
      .post(this.categoriesController.addCategory);

    app.route('/api/v1/categories/:id')
      .delete(this.categoriesController.deleteCategory);
  }
}
