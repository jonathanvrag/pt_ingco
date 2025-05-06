import { useEffect, useState } from 'react'
import type { User } from './types/users'
import './App.css'
import { fetchUsers } from './services/fakeapi.services'
import TableUsers from './components/TableUsers'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers()
      setUsers(users)
    }

    fetchData()
  }, [])

  return (
    <>
      <TableUsers users={users} />
    </>
  )
}

export default App
