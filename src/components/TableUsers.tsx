import type { User } from '../types/users';
import { deleteUser } from '../services/fakeapi.services';
import {
  HiOutlineInformationCircle,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi';

interface TableUsersProps {
  users: User[];
  onUserDeleted: (userId: number) => void;
  onEditUser: (user: User) => void;
  onShowDetails: (user: User) => void;
}

export default function TableUsers({
  users,
  onUserDeleted,
  onEditUser,
  onShowDetails,
}: TableUsersProps) {
  /* Este fragmento de código comprueba si el array `users` es falso o tiene una longitud de 0. 
  Si cualquiera de las condiciones es verdadera, significa que no hay usuarios disponibles en 
  el array. En ese caso, devuelve un elemento de párrafo con el texto "No hay usuarios disponibles" 
  centrado en gris. Esta es una comprobación condicional simple para gestionar el caso en el que no 
  haya usuarios para mostrar en la tabla. */
  if (!users || users.length === 0) {
    return (
      <p className='text-center text-gray-500'>No hay usuarios disponibles.</p>
    );
  }

  /**
   * La función handleDelete confirma la eliminación del usuario e invoca deleteUser con gestión de errores.
   * @param {number} userId: el parámetro `userId` de la función `handleDelete` es un número que
   * representa el identificador único del usuario que se va a eliminar.
   */
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
    <div className='rounded-2xl shadow-2xl overflow-hidden my-10 overflow-x-auto'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
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
          {/*Esta parte del código utiliza la función `map` en la matriz `users` para iterar sobre cada objeto 
          de usuario y crear una fila de tabla (`<tr>`) para cada usuario de la tabla. */}
          {users.map(user => (
            <tr
              key={user.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <td className='px-6 py-4 text-sm'>{user.firstName}</td>
              <td className='px-6 py-4 text-sm'>{user.lastName}</td>
              <td className='px-6 py-4 text-sm'>{user.email}</td>
              <td className='px-6 py-4 text-sm gap-4 flex justify-start items-center'>
                <button
                  onClick={() => onShowDetails(user)}
                  className='text-yellow-600 hover:text-yellow-800 font-medium cursor-pointer'>
                  <HiOutlineInformationCircle className='text-lg' />
                </button>
                <button
                  onClick={() => onEditUser(user)}
                  className='text-green-600 hover:text-green-800 font-medium cursor-pointer'>
                  <HiOutlinePencil className='text-lg' />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className='text-red-600 hover:text-red-800 font-medium cursor-pointer'>
                  <HiOutlineTrash className='text-lg' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
