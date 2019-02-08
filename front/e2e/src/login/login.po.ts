import { browser, by, element } from 'protractor';

export class LoginPO {
  navigateTo(path: string) {
    return browser.get(path);
  }

  get loginPage() {
    return element(by.css('.login'));
  }

  get form() {
    return element(by.css('.login_form'));
  }

  // get loginFeild() {
  //   return element(by.css('.login'));
  // }
  //
  // get passwordFeild() {
  //   return element(by.css('.login'));
  // }
  //
  // get loginButton() {
  //   return element(by.css('.login'));
  // }
  //
  // get registerButton() {
  //   return element(by.css('.login'));
  // }
}
