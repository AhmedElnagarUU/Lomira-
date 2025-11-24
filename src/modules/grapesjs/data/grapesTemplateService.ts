import type {
  GrapesTemplatePayload,
  GrapesTemplateResponse,
} from '../types';

export async function fetchGrapesTemplate(signal?: AbortSignal) {
  const response = await fetch('/api/grapesjs', {
    method: 'GET',
    signal,
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Unable to load builder template');
  }

  return (await response.json()) as GrapesTemplateResponse;
}

export async function persistGrapesTemplate(
  payload: GrapesTemplatePayload,
  signal?: AbortSignal,
) {
  const response = await fetch('/api/grapesjs', {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to save builder template');
  }

  return response.json();
}

