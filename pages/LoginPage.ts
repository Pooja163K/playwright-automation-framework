import {Page} from "@playwright/test"

export class LoginPage{

  readonly username;
  readonly password;
  readonly loginButton;

    constructor(private page:Page) {
       
         this.username = this.page.getByTestId('username');
        this.password = this.page.getByTestId('password');
        this.loginButton = this.page.getByRole('button', {name:'Login'});
    
}

async goto() {
  await this.page.goto('/');
}

async login(username: string,password: string){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
}
}