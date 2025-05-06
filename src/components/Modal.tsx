import React, { type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 bg-black/70 bg-opacity-50 z-40 flex justify-center items-center p-4'
      onClick={onClose}>
      <div
        className='bg-white text-black p-6 rounded-lg shadow-xl z-50 w-full max-w-md dark:bg-gray-800 dark:text-white'
        onClick={e => e.stopPropagation()}>
        <div className='flex justify-between items-center mb-4'>
          {title && <h2 className='text-xl font-semibold'>{title}</h2>}
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl cursor-pointer'
            aria-label='Cerrar modal'>
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
