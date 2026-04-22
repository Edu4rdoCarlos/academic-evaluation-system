import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { SistemaProvasWorld } from '../support/world';

Given('{string} is not enrolled in the current class', async function (this: SistemaProvasWorld, studentName: string) {
  const classId = this.getClassIdFromUrl();
  const studentId = await this.getStudentIdByName(studentName);
  await this.apiRequest('DELETE', `/classes/${classId}/enrollments/${studentId}`);
  await this.page.reload();
  await this.page.waitForSelector(`text=${studentName}`, { state: 'detached', timeout: 5000 }).catch(() => {});
});

Given('{string} is enrolled in the current class', async function (this: SistemaProvasWorld, studentName: string) {
  const classId = this.getClassIdFromUrl();
  const studentId = await this.getStudentIdByName(studentName);
  await this.apiRequest('POST', `/classes/${classId}/enrollments`, { studentId });
  await this.page.reload();
  await this.page.waitForSelector(`[data-slot="table-cell"]:has-text("${studentName}")`, { timeout: 8000 });
});

Given('I open the detail page for class {string}', { timeout: 15000 }, async function (this: SistemaProvasWorld, topic: string) {
  const row = this.page.locator('tr', { hasText: topic });
  await row.getByRole('link').click();
  await this.page.waitForSelector(`text=${topic}`, { timeout: 10000 });
});

When('I open the enroll student dialog', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: /Matricular/i }).click();
  await this.page.waitForSelector('text=Matricular aluno', { timeout: 5000 });
});

When('I select the student {string} to enroll', async function (this: SistemaProvasWorld, studentName: string) {
  await this.page.locator('[role="dialog"]').getByRole('combobox').click();
  await this.page.waitForSelector(`text=${studentName}`, { timeout: 10000 });
  await this.page.getByRole('option', { name: studentName }).click();
});

When('I confirm the enrollment', async function (this: SistemaProvasWorld) {
  await this.page.getByRole('button', { name: 'Matricular' }).last().click();
  await this.page.waitForTimeout(1000);
});

When('I unenroll the student {string}', { timeout: 15000 }, async function (this: SistemaProvasWorld, studentName: string) {
  await this.page.waitForSelector(`[data-slot="table-cell"]:has-text("${studentName}")`, { timeout: 8000 });
  const row = this.page.locator('tr').filter({
    has: this.page.locator('[data-slot="table-cell"]', { hasText: studentName }),
  });
  await row.getByRole('button').click({ timeout: 8000 });
  await this.page.waitForTimeout(1000);
});

When('I set the concept {string} for student {string} and goal {string}', { timeout: 15000 }, async function (this: SistemaProvasWorld, concept: string, studentName: string, goalName: string) {
  const studentRow = this.page.locator('tr', { hasText: studentName });
  const goalHeader = this.page.locator('th', { hasText: goalName });
  const goalIndex = await goalHeader.evaluate((el) => {
    const headers = Array.from(el.closest('thead')!.querySelectorAll('th'));
    return headers.indexOf(el as HTMLTableCellElement);
  });

  const conceptSelect = studentRow.locator('button[role="combobox"]').nth(goalIndex - 1);
  await conceptSelect.click();
  await this.page.waitForSelector(`text=${concept}`, { timeout: 5000 });
  await this.page.getByRole('option', { name: concept, exact: true }).click();
  await this.page.waitForTimeout(500);
});

Then('I should see {string} in the enrolled students list', { timeout: 10000 }, async function (this: SistemaProvasWorld, studentName: string) {
  await this.page.waitForSelector(`[data-slot="table-cell"]:has-text("${studentName}")`, { timeout: 8000 });
  const cell = this.page.locator('[data-slot="table-cell"]', { hasText: studentName }).first();
  assert.ok(await cell.isVisible(), `Expected to see "${studentName}" in the enrolled students list`);
});

Then('I should not see {string} in the enrolled students list', { timeout: 10000 }, async function (this: SistemaProvasWorld, studentName: string) {
  await this.page.waitForTimeout(1000);
  const cell = this.page.locator('[data-slot="table-cell"]', { hasText: studentName });
  const count = await cell.count();
  assert.strictEqual(count, 0, `Expected "${studentName}" to be absent from the enrolled students list`);
});

Then('the concept for {string} and {string} should be {string}', { timeout: 10000 }, async function (this: SistemaProvasWorld, studentName: string, goalName: string, concept: string) {
  const studentRow = this.page.locator('tr', { hasText: studentName });
  const goalHeader = this.page.locator('th', { hasText: goalName });
  const goalIndex = await goalHeader.evaluate((el) => {
    const headers = Array.from(el.closest('thead')!.querySelectorAll('th'));
    return headers.indexOf(el as HTMLTableCellElement);
  });

  const conceptSelect = studentRow.locator('button[role="combobox"]').nth(goalIndex - 1);
  const selectedText = await conceptSelect.textContent();
  assert.ok(selectedText?.includes(concept), `Expected concept "${concept}", got: "${selectedText}"`);
});
