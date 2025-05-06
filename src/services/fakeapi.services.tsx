import type { User } from '../types/users';

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(import.meta.env.VITE_USERS_URL);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: User[] = await response.json();

    const activeUsers = data.filter(user => user.status === true);

    return activeUsers;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
