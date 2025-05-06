import type { User } from "../types/users";

interface TableUsersProps {
  users: User[];
}

export default function TableUsers({users}: TableUsersProps) {
  if (!users || users.length === 0) {
    return <p>No users available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>firstName</th>
          <th>lastName</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
