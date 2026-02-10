/**
 * API Service
 * Backend API client
 * 
 * @module services/api
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  
  return response.json();
}

export const api = {
  health: () => request<{ status: string }>('/health'),
  metrics: () => request<Record<string, unknown>>('/metrics'),
};
