import type { User } from '../types/users';

export type UserFormData = Pick<User, 'firstName' | 'lastName' | 'email'>;

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

export async function createUser(formData: UserFormData): Promise<User> {
  try {
    const newUserPayload: Omit<User, 'id'> = {
      ...formData,
      status: true,
      birthday: '',
      skills: [],
      avatar: [],
    };

    const response = await fetch(import.meta.env.VITE_USERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserPayload),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return (await response.json()) as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}
