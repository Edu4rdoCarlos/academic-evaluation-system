import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { SistemaProvasWorld } from '../support/world';

When('I open the new goal dialog', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: /Novo objetivo/i }).first().click();
  await this.page.waitForSelector('text=Novo objetivo', { timeout: 5000 });
});

When('I fill in the goal name with {string}', async function (this: SistemaProvasWorld, name: string) {
  await this.page.getByPlaceholder('Ex: Compreensão de textos').fill(name);
});

When('I submit the goal form', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: 'Criar' }).click();
});

When('I click the delete button for goal {string}', async function (this: SistemaProvasWorld, name: string) {
  const row = this.page.locator('tr', { hasText: name });
  await row.getByRole('button').click();
});

Then('I should see {string} in the goals table', { timeout: 15000 }, async function (this: SistemaProvasWorld, name: string) {
  await this.page.waitForSelector(`text=${name}`, { timeout: 10000 });
  const cell = this.page.locator('td', { hasText: name });
  assert.ok(await cell.isVisible(), `Expected to see "${name}" in the goals table`);
});

Then('I should not see {string} in the goals table', { timeout: 10000 }, async function (this: SistemaProvasWorld, name: string) {
  await this.page.waitForTimeout(1000);
  const cell = this.page.locator('td', { hasText: name });
  assert.ok(!(await cell.isVisible()), `Expected "${name}" to be absent from the goals table`);
});

Then('I should see a validation error in the goal form', async function (this: SistemaProvasWorld) {
  await this.page.waitForTimeout(500);
  const error = this.page.locator('.text-destructive').first();
  assert.ok(await error.isVisible(), 'Expected a validation error in the goal form');
});
