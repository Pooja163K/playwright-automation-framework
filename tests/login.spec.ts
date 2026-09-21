import { expect } from "@playwright/test"
import { test } from "../utils/fixtures"
//import { login } from "../utils/login"
import { LoginPage } from "../pages/LoginPage";



test('valid login', async ({ loggedInPage }) => {
  // await login(page,'standard_user','secret_sauce');
  await expect(loggedInPage).toHaveURL(/inventory/);
})

test('invalid  login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('standard_user', 'not_so_secret_sauce');
  await expect(loginPage.error)
    .toBeVisible();
})




