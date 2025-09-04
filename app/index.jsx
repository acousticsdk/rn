import { useEffect } from 'react';

import { router } from 'expo-router';

export default function IndexScreen() {
  useEffect(() => {
    // Перенаправляем на главную страницу (табы)
    router.replace('/(tabs)');
  }, []);

  return null;
}