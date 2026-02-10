/**
 * useModal Hook
 * Modal state management
 * 
 * @module hooks/useModal
 */

import { useState, useCallback } from 'react';

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

export function useModal() {
  const [modal, setModal] = useState<ModalState>({ isOpen: false, content: null });

  const openModal = useCallback((content: React.ReactNode) => {
    setModal({ isOpen: true, content });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, content: null });
  }, []);

  return { modal, openModal, closeModal };
}
