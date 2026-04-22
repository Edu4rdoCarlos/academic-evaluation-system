const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...init?.headers,
    },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function get<T>(path: string): Promise<T> {
  const body = await request<{ data: T }>(path);
  return body.data;
}

export async function getPaginated<T>(path: string): Promise<{ data: T[]; metadata: import('@/lib/types').PaginationMetadata }> {
  return request(path);
}

export async function post<T>(path: string, payload: unknown): Promise<T> {
  const body = await request<{ data: T }>(path, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return body.data;
}

export async function put<T>(path: string, payload: unknown): Promise<T> {
  const body = await request<{ data: T }>(path, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return body.data;
}

export async function del<T>(path: string): Promise<T> {
  const body = await request<{ data: T }>(path, { method: 'DELETE' });
  return body.data;
}
