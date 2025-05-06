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
    <div className='overflow-x-auto px-96 py-10'>
      <table className='min-w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              Nombre
            </th>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              Apellidos
            </th>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-6 py-4 text-sm text-gray-900'>
                {user.firstName}
              </td>
              <td className='px-6 py-4 text-sm text-gray-900'>
                {user.lastName}
              </td>
              <td className='px-6 py-4 text-sm text-gray-900'>{user.email}</td>
              <td className='px-6 py-4 text-sm text-gray-900'>
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
