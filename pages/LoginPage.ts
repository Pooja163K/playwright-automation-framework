import { Locator, Page } from "@playwright/test"

export class LoginPage {

  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error : Locator;

  constructor(private page: Page) {

    this.username = this.page.getByTestId('username');
    this.password = this.page.getByTestId('password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.error = this.page.getByTestId('error')
    .filter({ hasText: "Epic sadface: Username and password do not match any user in this service" })

  }

  async login(uName: string, pswd: string) {
    await this.page.goto('/');
    await this.username.fill(uName);
    await this.password.fill(pswd);
    await this.loginButton.click();
  }




}