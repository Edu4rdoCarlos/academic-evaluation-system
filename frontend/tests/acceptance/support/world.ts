import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';

export const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';
export const API_URL = process.env.API_URL ?? 'http://localhost:3001/api';
export const TOKEN_KEY = 'sistema_provas_token';

export class SistemaProvasWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  accessToken: string | null = null;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(`${FRONTEND_URL}${path}`);
  }

  async loginViaApi(email: string, password: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error(`Login via API failed: ${response.status}`);

    const { accessToken } = await response.json() as { accessToken: string };
    this.accessToken = accessToken;

    await this.page.goto(`${FRONTEND_URL}/login`);
    await this.page.evaluate(
      ({ key, token }: { key: string; token: string }) => {
        localStorage.setItem(key, token);
      },
      { key: TOKEN_KEY, token: accessToken },
    );
  }

  async loginViaUI(email: string, password: string): Promise<void> {
    await this.navigateTo('/login');
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
    await this.page.waitForURL(`${FRONTEND_URL}/dashboard`, { timeout: 10000 });
  }

  async apiRequest(method: string, path: string, body?: object): Promise<Response> {
    return fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  }

  getClassIdFromUrl(): string {
    const match = this.page.url().match(/\/classes\/([^/?#]+)/);
    if (!match) throw new Error(`Could not extract class ID from URL: ${this.page.url()}`);
    return match[1];
  }

  async getStudentIdByName(name: string): Promise<string> {
    const res = await this.apiRequest('GET', '/students?page=1&perPage=100');
    const data = await res.json() as { data: Array<{ id: string; name: string }> };
    const student = data.data.find((s) => s.name === name);
    if (!student) throw new Error(`Student "${name}" not found`);
    return student.id;
  }
}

setWorldConstructor(SistemaProvasWorld);
