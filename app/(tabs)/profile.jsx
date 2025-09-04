import { router } from 'expo-router';
import { useEffect } from 'react';

export default function ProfileTabScreen() {
  useEffect(() => {
    // Перенаправляем на профиль мастера
    router.replace('/(profile)/master');
  }, []);

  return null;
}