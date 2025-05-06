import type { User } from '../types/users';

interface TableUsersProps {
  users: User[];
}

export default function TableUsers({ users }: TableUsersProps) {
  if (!users || users.length === 0) {
    return <p className='text-center text-gray-500'>No users available.</p>;
  }

  return (
    <div className='overflow-x-auto px-96 py-10'>
      <table className='min-w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              First Name
            </th>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              Last Name
            </th>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase'>
              Action
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
              <td className='px-6 py-4 text-sm text-gray-900'>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
