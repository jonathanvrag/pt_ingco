import React, { useState, type FormEvent, useEffect } from 'react';
import type { UserFormData } from '../services/fakeapi.services';
import type { User } from '../types/users';
import { createUser, updateUser } from '../services/fakeapi.services';

interface FormUserProps {
  onFormSubmit: (submittedUser: User) => void;
  onCancel: () => void;
  userToEdit?: User | null;
}

export default function FormUser({
  onFormSubmit,
  onCancel,
  userToEdit,
}: FormUserProps) {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setError] = useState<string | null>(null);

  /* El gancho `useEffect` en el fragmento de código proporcionado se encarga de actualizar los datos del 
  formulario (`formData`) según la propiedad `userToEdit` cada vez que `userToEdit` cambia. */
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        email: userToEdit.email,
      });
    } else {
      setFormData({ firstName: '', lastName: '', email: '' });
    }
  }, [userToEdit]);

  /**
   * La función handleChange  actualiza los datos del formulario según la entrada del usuario.
   * @param e - El parámetro `e` en la función `handleChange` es de tipo`React.ChangeEvent<HTMLInputElement>`.
   * Esto significa que es un objeto de evento que se activa cuando el valor de un elemento de entrada cambia
   * en el componente.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /**
   * La función handleSubmit gestiona el envío de formularios actualizando o creando un usuario y mostrando cualquier error.
   * @param e - El parámetro `e` de la función `handleSubmit` es de tipo `FormEvent<HTMLFormElement>`.
   * Este parámetro representa el evento que se activa al enviar el formulario.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      let submittedUser: User;
      if (userToEdit && userToEdit.id) {
        submittedUser = await updateUser(userToEdit.id, formData);
      } else {
        submittedUser = await createUser(formData);
      }
      onFormSubmit(submittedUser);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al crear el usuario.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-4'>
      <div>
        <label
          htmlFor='firstName'
          className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
          Nombre
        </label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={formData.firstName}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='lastName'
          className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
          Apellido
        </label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 dark:text-white mb-1'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      <div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer'>
          {isSubmitting
            ? 'Guardando...'
            : userToEdit
            ? 'Actualizar Usuario'
            : 'Guardar Usuario'}
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer'>
          Cancelar
        </button>
      </div>
    </form>
  );
}
