import type { User } from '../types/users';

export type UserFormData = Pick<User, 'firstName' | 'lastName' | 'email'>;

/**
 * La función obtiene los datos de usuario de una URL específica y devuelve solo los usuarios activos.
 * @returns La función `fetchUsers` devuelve una matriz de usuarios activos (usuarios con `status`
 * establecido en `true`) obtenidos de la URL especificada en la variable de entorno `VITE_USERS_URL`.
 * Si se produce un error durante el proceso de obtención, se devuelve una matriz vacía.
 */
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

/**
 * Esta función crea un nuevo usuario enviando una solicitud POST con los datos del usuario a una URL específica y
 * devuelve el usuario creado.
 * @param {UserFormData} formData - UserFormData {
 * @returns La función `createUser` devuelve una Promesa que se resuelve en un objeto Usuario.
 */
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

/**
 * La función deleteUser(userId: number) envía una solicitud DELETE y un id de usuario especifico y
 * gestiona los errores según corresponda.
 * @param {number} userId: el parámetro `userId` de la función `deleteUser` es un número que
 * representa el identificador único del usuario que se desea eliminar del servidor.
 * @returns La función `deleteUser` devuelve una promesa que se resuelve como `void`.
 */
export async function deleteUser(userId: number): Promise<void> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_USERS_URL}/${userId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error(
        `Network response was not ok on delete: ${response.status}`
      );
    }
    return;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
}
