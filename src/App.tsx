import { useEffect, useState } from 'react';
import type { User } from './types/users';
import './App.css';
import { fetchUsers } from './services/fakeapi.services';
import TableUsers from './components/TableUsers';
import Modal from './components/Modal';
import FormUser from './components/FormUser';
import UserDetails from './components/UserDetails';
import { HiOutlineUserAdd } from 'react-icons/hi';

const ITEMS_PER_PAGE = 10;

function App() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] =
    useState<boolean>(false);

  /* El hook `useEffect` se encarga de obtener los datos del usuario de una API cuando el componente se monta 
  por primera vez. */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const usersFromApi = await fetchUsers();
        setAllUsers(usersFromApi);
      } catch (error) {
        console.log('Failed to fetch users');
        setError(error instanceof Error ? error.message : 'Unknown error');
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (userToEdit: User | null = null) => {
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * La función `handleFormSubmit` actualiza la lista de usuarios según si el usuario está siendo editado o añadido.
   * @param {User} submittedUser - El parámetro `submittedUser` de la función `handleFormSubmit` es
   * un objeto de tipo `User` que representa los datos del usuario enviados a través de un formulario.
   */
  const handleFormSubmit = (submittedUser: User) => {
    if (editingUser) {
      setAllUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === submittedUser.id ? submittedUser : user
        )
      );
    } else {
      setAllUsers(prevUsers => [submittedUser, ...prevUsers]);
      setCurrentPage(1);
    }
    closeModal();
  };

  const handleEditUserClick = (user: User) => {
    openModal(user);
  };

  const openUserDetailsModal = (user: User) => {
    setViewingUser(user);
    setIsUserDetailsModalOpen(true);
  };

  const closeUserDetailsModal = () => {
    setIsUserDetailsModalOpen(false);
    setViewingUser(null);
  };

  /**
   * La función `handleUserDeleted` elimina un usuario de una lista de usuarios y ajusta el número de la página actual
   * según los usuarios restantes.
   * @param {number} userId - El parámetro `userId` es el identificador único del usuario que ha sido eliminado.
   */
  const handleUserDeleted = (userId: number) => {
    setAllUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    const newTotalPages = Math.ceil((allUsers.length - 1) / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1);
    }
  };

  /* Estas líneas de código son responsables de gestionar la paginación en la tabla. */
  const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);

  const goToNextPage = () =>
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  const goToPage = (pageNumber: number) => {
    const page = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(page);
  };

  if (loading) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  if (error) {
    return <p className='text-center text-red-500'>Error: {error}</p>;
  }

  return (
    <div className='mx-auto p-4 sm:px-20 md:px-30 lg:px-50 min-h-screen flex flex-col bg-white dark:bg-gray-600'>
      <h1 className='text-3xl font-bold text-center my-8 text-gray-700 dark:text-white'>
        Lista de Usuarios
      </h1>
      <div className='flex items-end justify-end'>
        <button
          onClick={() => openModal()}
          className='w-auto px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-600 shadow-lg cursor-pointer'>
          <HiOutlineUserAdd className='size-6' />
        </button>
      </div>
      <div className='flex-grow'>
        <TableUsers
          users={currentUsers}
          onUserDeleted={handleUserDeleted}
          onEditUser={handleEditUserClick}
          onShowDetails={openUserDetailsModal}
        />
      </div>
      {totalPages > 1 && (
        <div className='flex justify-center items-center space-x-2 py-8'>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'>
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            pageNumber => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                disabled={currentPage === pageNumber}
                className={`px-4 py-2 rounded-xl ${
                  currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } disabled:opacity-75`}>
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className='px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'>
            Siguiente
          </button>
        </div>
      )}
      {allUsers.length > 0 && totalPages > 0 && (
        <p className='text-center text-sm text-gray-600 dark:text-white pb-4'>
          Página {currentPage} de {totalPages}. Mostrando {currentUsers.length}{' '}
          de {allUsers.length} usuarios.
        </p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'} // Título dinámico
      >
        <FormUser
          onFormSubmit={handleFormSubmit}
          onCancel={closeModal}
          userToEdit={editingUser}
        />
      </Modal>

      <Modal
        isOpen={isUserDetailsModalOpen}
        onClose={closeUserDetailsModal}
        title={`Detalles de ${viewingUser?.firstName || 'Usuario'}`}>
        <UserDetails user={viewingUser} />
      </Modal>
    </div>
  );
}

export default App;
