import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { SistemaProvasWorld } from '../support/world';

When('I open the new student dialog', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: /Novo aluno/i }).first().click();
  await this.page.waitForSelector('text=Novo aluno', { timeout: 5000 });
});

When('I fill in the student name with {string}', async function (this: SistemaProvasWorld, name: string) {
  await this.page.getByPlaceholder('Nome completo').fill(name);
});

When('I fill in the student CPF with a unique value', async function (this: SistemaProvasWorld) {
  const unique = Date.now().toString().slice(-11);
  await this.page.getByPlaceholder('Somente números').fill(unique);
});

When('I fill in the student email with {string}', async function (this: SistemaProvasWorld, email: string) {
  const uniqueEmail = email.replace('@', `+${Date.now()}@`);
  await this.page.getByPlaceholder('email@exemplo.com').fill(uniqueEmail);
});

When('I submit the student form', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: 'Criar' }).click();
  await this.page.locator('[role="dialog"]').waitFor({ state: 'detached', timeout: 8000 }).catch(() => {});
});

When('I save the student form', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: 'Salvar' }).click();
});

When('I click the edit button for {string}', async function (this: SistemaProvasWorld, name: string) {
  await this.page.waitForSelector(`tr:has-text("${name}")`, { timeout: 15000 });
  const row = this.page.locator('tr', { hasText: name }).last();
  await row.getByRole('button').nth(0).click({ timeout: 10000 });
  await this.page.waitForSelector('text=Editar aluno', { timeout: 8000 });
});

When('I clear the student name field and type {string}', async function (this: SistemaProvasWorld, name: string) {
  const nameInput = this.page.getByPlaceholder('Nome completo');
  await nameInput.clear();
  await nameInput.fill(name);
});

When('I click the delete button for {string}', async function (this: SistemaProvasWorld, name: string) {
  const row = this.page.locator('tr', { hasText: name });
  await row.getByRole('button').nth(1).click();
});

When('I confirm the deletion', { timeout: 10000 }, async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: 'Excluir' }).click();
  await this.page.waitForTimeout(1000);
});

Then('I should see {string} in the students table', { timeout: 15000 }, async function (this: SistemaProvasWorld, name: string) {
  await this.page.waitForSelector(`text=${name}`, { timeout: 10000 });
  const cell = this.page.locator('td', { hasText: name }).first();
  assert.ok(await cell.isVisible(), `Expected to see "${name}" in the students table`);
});

Then('I should not see {string} in the students table', { timeout: 10000 }, async function (this: SistemaProvasWorld, name: string) {
  await this.page.waitForTimeout(1000);
  const cell = this.page.locator('td', { hasText: name });
  assert.ok(!(await cell.isVisible()), `Expected "${name}" to be absent from the students table`);
});

Then('I should see a validation error in the student form', async function (this: SistemaProvasWorld) {
  await this.page.waitForTimeout(500);
  const error = this.page.locator('.text-destructive').first();
  assert.ok(await error.isVisible(), 'Expected a validation error in the student form');
});
