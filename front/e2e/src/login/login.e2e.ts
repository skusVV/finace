import { LoginPO } from './login.po';

describe('Login Page', () => {
  let page: LoginPO;

  beforeEach(() => {
    page = new LoginPO();
  });

  describe('Redirect to login page if user did not authorize', () => {

    it('Should redirect to login from dashboard', () => {
      page.navigateTo('dashboard');
      expect(page.loginPage).toBeTruthy();
    });

    it('Should redirect to login from root', () => {
      page.navigateTo('/');

      expect(page.loginPage).toBeTruthy();
    });
  });

  describe('Login page elements', () => {

    beforeEach(() => {
      page.navigateTo('login');
    });

    it('To have form', () => {
      expect(page.form).toBeTruthy();
    });

    // it('Form have login input', () => {
    //   expect(page.loginPage).toBeTruthy();
    // });
    //
    // it('Form have password input', () => {
    //   expect(page.loginPage).toBeTruthy();
    // });
    //
    // it('Form have login button', () => {
    //   expect(page.loginPage).toBeTruthy();
    // });
    //
    // it('Form have register button', () => {
    //   expect(page.loginPage).toBeTruthy();
    // });
  });
});
