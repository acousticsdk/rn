import { useEffect } from 'react';
import { router } from 'expo-router';

export default function IndexScreen() {
  useEffect(() => {
    // Перенаправляем на первый экран приложения
    router.replace('/(start)/screen1');
  }, []);

  return null;
}