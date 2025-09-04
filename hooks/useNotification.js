import { useState } from 'react';

export function useNotification() {
  const [notification, setNotification] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showNotification = (type, title, message = '') => {
    console.log('showNotification вызван:', { type, title, message });
    setNotification({
      visible: true,
      type,
      title,
      message,
    });
  };

  const hideNotification = () => {
    console.log('hideNotification вызван');
    setNotification(prev => ({
      ...prev,
      visible: false,
    }));
  };

  const showSuccess = (title, message = '') => {
    console.log('showSuccess вызван:', { title, message });
    showNotification('success', title, message);
  };

  const showError = (title, message = '') => {
    console.log('showError вызван:', { title, message });
    showNotification('error', title, message);
  };

  return {
    notification,
    showSuccess,
    showError,
    hideNotification,
  };
}