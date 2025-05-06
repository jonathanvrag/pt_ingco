import React from 'react';
import type { User } from '../types/users';

interface UserDetailsProps {
  user: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  if (!user) {
    return (
      <p className='text-center text-gray-500 dark:text-gray-400'>
        No hay información del usuario para mostrar.
      </p>
    );
  }

  /**
   * La función `formatDate` toma una cadena de fecha como entrada y devuelve una fecha formateada en español
   * según la configuración regional, o 'N/D' si la entrada no está definida.
   * @param {string | undefined} dateString - La función `formatDate` toma un parámetro `dateString`,
   * que se espera que sea una cadena que representa una fecha. La función intenta formatear esta cadena de fecha
   * a un formato específico mediante el método `toLocaleDateString` con la configuración regional 'es-ES'. Si
   * no se proporciona la cadena de fecha
   * @returns La función `formatDate` devuelve una cadena de fecha formateada con el formato "día, mes, año"
   * (p. ej., "1 de enero de 2022") según la entrada `dateString`. Si no se proporciona `dateString`
   * (undefined), devuelve 'N/D'. Si se produce un error al formatear la fecha, se registra un mensaje de error
   * y se devuelve la `dateString` original.
   */
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return dateString;
    }
  };

  return (
    <div className='space-y-3 text-sm'>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Nombre:</strong> {user.firstName}
      </p>
      <p>
        <strong>Apellido:</strong> {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Estado:</strong>{' '}
        <span className={user.status ? 'text-green-500' : 'text-red-500'}>
          {user.status ? 'Activo' : 'Inactivo'}
        </span>
      </p>
      <p>
        <strong>Cumpleaños:</strong> {formatDate(user.birthday)}
      </p>
      <div>
        <strong>Habilidades:</strong>
        {user.skills && user.skills.length > 0 ? (
          <ul className='list-disc list-inside ml-4'>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          ' N/A'
        )}
      </div>
    </div>
  );
};

export default UserDetails;
