import React, { useState, type FormEvent } from 'react';
import type { UserFormData } from '../services/fakeapi.services';
import type { User } from '../types/users';
import { createUser } from '../services/fakeapi.services';

interface FormUserProps {
  onUserCreated: (createdUser: User) => void;
  onCancel: () => void;
}

export default function FormUser({ onUserCreated, onCancel }: FormUserProps) {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const newUserFromApi = await createUser(formData);
      onUserCreated(newUserFromApi);
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
          className='block text-sm font-medium text-gray-700 mb-1'>
          Nombre
        </label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          value={formData.firstName}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      {/* Repetir estructura similar para lastName y email */}
      <div>
        <label
          htmlFor='lastName'
          className='block text-sm font-medium text-gray-700 mb-1'>
          Apellido
        </label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 mb-1'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
      <div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'>
          {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
        </button>
        <button
          type='button'
          onClick={onCancel}
          className='mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          Cancelar
        </button>
      </div>
    </form>
  );
}
