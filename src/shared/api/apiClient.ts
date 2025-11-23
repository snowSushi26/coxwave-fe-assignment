const API_BASE_URL =
  'https://frontend-challenge-datetz-backend-725853975024.asia-northeast3.run.app';

interface FetchOptions extends Omit<RequestInit, 'body'> {
  endpoint: string;
  body?: unknown;
}

async function fetchAPI<T>(options: FetchOptions): Promise<T> {
  const { endpoint, body, ...restOptions } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Connect-Protocol-Version': '1',
    },
    body: body ? JSON.stringify(body) : undefined,
    ...restOptions,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data as T;
}

export async function callService<TRequest, TResponse>(
  service: string,
  method: string,
  request: TRequest,
): Promise<TResponse> {
  return fetchAPI<TResponse>({
    endpoint: `/event.v1.${service}/${method}`,
    body: request,
  });
}
