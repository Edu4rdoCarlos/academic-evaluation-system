import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { SistemaProvasWorld, FRONTEND_URL } from '../support/world';

Given('I am on the login page', async function (this: SistemaProvasWorld) {
  await this.navigateTo('/login');
  await this.page.waitForSelector('#email');
});

When('I fill in the email field with {string}', async function (this: SistemaProvasWorld, email: string) {
  await this.page.fill('#email', email);
});

When('I fill in the password field with {string}', async function (this: SistemaProvasWorld, password: string) {
  await this.page.fill('#password', password);
});

When('I click the submit button', async function (this: SistemaProvasWorld) {
  await this.page.click('button[type="submit"]');
});

Then('I should be redirected to the dashboard', { timeout: 15000 }, async function (this: SistemaProvasWorld) {
  await this.page.waitForURL(`${FRONTEND_URL}/dashboard`, { timeout: 12000 });
});

Then('I should remain on the login page', async function (this: SistemaProvasWorld) {
  await this.page.waitForTimeout(1500);
  const url = this.page.url();
  assert.ok(url.includes('/login'), `Expected to remain on /login, got: ${url}`);
});

Then('I should see an error message', { timeout: 10000 }, async function (this: SistemaProvasWorld) {
  const error = await this.page.waitForSelector('.text-destructive', { timeout: 8000 });
  assert.ok(error, 'Expected an error message to be visible');
});

Then('I should see an email validation error', async function (this: SistemaProvasWorld) {
  const isInvalid = await this.page.locator('#email').evaluate(
    (el) => !(el as HTMLInputElement).validity.valid,
  );
  assert.ok(isInvalid, 'Expected #email to be invalid according to browser HTML5 validation');
});

Then('I should see a password validation error', async function (this: SistemaProvasWorld) {
  await this.page.waitForTimeout(500);
  const errors = this.page.locator('.text-destructive');
  const count = await errors.count();
  assert.ok(count > 0, 'Expected a password validation error');
});
