import type { User } from '../types/users';
import { deleteUser } from '../services/fakeapi.services';

interface TableUsersProps {
  users: User[];
  onUserDeleted: (userId: number) => void;
}

export default function TableUsers({ users, onUserDeleted }: TableUsersProps) {
  if (!users || users.length === 0) {
    return <p className='text-center text-gray-500'>No users available.</p>;
  }

  const handleDelete = async (userId: number) => {
    if (window.confirm('Seguro quieres eliminar el usuario?')) {
      try {
        await deleteUser(userId);
        onUserDeleted(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className='rounded-2xl shadow-lg overflow-hidden my-10 overflow-x-auto'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Nombre
            </th>
            <th scope='col' className='px-6 py-3'>
              Apellidos
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <td className='px-6 py-4 text-sm'>{user.firstName}</td>
              <td className='px-6 py-4 text-sm'>{user.lastName}</td>
              <td className='px-6 py-4 text-sm'>{user.email}</td>
              <td className='px-6 py-4 text-sm'>
                <button
                  onClick={() => handleDelete(user.id)}
                  className='text-red-600 hover:text-red-800 font-medium'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
