import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { SistemaProvasWorld } from '../support/world';

When('I open the new class dialog', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: /Nova turma/i }).first().click();
  await this.page.waitForSelector('text=Nova turma', { timeout: 5000 });
});

When('I fill in the class topic with {string}', async function (this: SistemaProvasWorld, topic: string) {
  await this.page.getByPlaceholder('Ex: Algoritmos').fill(topic);
});

When('I submit the class form', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: 'Criar' }).click();
});

When('I save the class form', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: 'Salvar' }).click();
});

When('I click the edit button for class {string}', { timeout: 10000 }, async function (this: SistemaProvasWorld, topic: string) {
  const row = this.page.locator('tr', { hasText: topic });
  await row.getByRole('button').nth(1).click();
  await this.page.waitForSelector('text=Editar turma', { timeout: 5000 });
});

When('I clear the class topic field and type {string}', async function (this: SistemaProvasWorld, topic: string) {
  const topicInput = this.page.getByPlaceholder('Ex: Algoritmos');
  await topicInput.clear();
  await topicInput.fill(topic);
});

When('I click the delete button for class {string}', async function (this: SistemaProvasWorld, topic: string) {
  const row = this.page.locator('tr', { hasText: topic });
  await row.getByRole('button').nth(2).click();
});

Then('I should see {string} in the classes table', { timeout: 15000 }, async function (this: SistemaProvasWorld, topic: string) {
  await this.page.waitForSelector(`text=${topic}`, { timeout: 10000 });
  const cell = this.page.locator('td', { hasText: topic }).first();
  assert.ok(await cell.isVisible(), `Expected to see "${topic}" in the classes table`);
});

Then('I should not see {string} in the classes table', { timeout: 10000 }, async function (this: SistemaProvasWorld, topic: string) {
  await this.page.waitForTimeout(1000);
  const count = await this.page.locator('td', { hasText: topic }).count();
  assert.strictEqual(count, 0, `Expected "${topic}" to be absent from the classes table`);
});
