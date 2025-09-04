import { router } from 'expo-router';
import { useEffect } from 'react';

export default function ChatTabScreen() {
  useEffect(() => {
    // Перенаправляем на экран чата
    router.replace('/(chat)');
  }, []);

  return null;
}