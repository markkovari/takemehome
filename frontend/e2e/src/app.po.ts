import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(
      by.xpath(
        '/html/body/app-root/mat-drawer-container/mat-drawer-content/mat-toolbar/button[2]/span[1]'
      )
    ).getText() as Promise<string>;
  }
}
