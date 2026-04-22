import { Given, When } from '@cucumber/cucumber';
import { SistemaProvasWorld } from '../support/world';

Given('I am logged in as the admin', { timeout: 20000 }, async function (this: SistemaProvasWorld) {
  await this.loginViaApi('admin@sistema-provas.edu', 'admin123');
});

Given('I navigate to the students page', async function (this: SistemaProvasWorld) {
  await this.navigateTo('/students');
  await this.page.waitForSelector('h1', { timeout: 10000 });
});

Given('I navigate to the classes page', async function (this: SistemaProvasWorld) {
  await this.navigateTo('/classes');
  await this.page.waitForSelector('h1', { timeout: 10000 });
});

Given('I navigate to the goals page', async function (this: SistemaProvasWorld) {
  await this.navigateTo('/goals');
  await this.page.waitForSelector('h1', { timeout: 10000 });
});

When('I navigate to the dashboard', async function (this: SistemaProvasWorld) {
  await this.navigateTo('/dashboard');
});
