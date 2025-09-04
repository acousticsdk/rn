import { router } from 'expo-router';
import { useEffect } from 'react';

// Глобальная переменная для определения типа пользователя
let USER_ROLE = 'master'; // 'master' | 'client' | 'marketing_partner'

export default function HomeTabScreen() {
  useEffect(() => {
    // Перенаправляем на соответствующую главную страницу в зависимости от роли
    if (USER_ROLE === 'master') {
      router.replace('/(homepage)/master');
    } else if (USER_ROLE === 'client') {
      router.replace('/(homepage)/client');
    } else {
      // По умолчанию мастер
      router.replace('/(homepage)/master');
    }
  }, []);

  return null;
}