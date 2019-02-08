import {browser, ProtractorBrowser} from 'protractor';

let browserInstance: ProtractorBrowser;

export function currentBrowser(): ProtractorBrowser {
  return browserInstance || browser;
}
