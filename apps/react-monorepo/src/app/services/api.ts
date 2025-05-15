import type { User } from '../types/user';

/**
 * Get the base URL for API requests from environment variables
 * Falls back to localhost if not defined
 */
const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
};

const API_URL = `${getApiBaseUrl()}/api`;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
