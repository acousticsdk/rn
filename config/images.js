// Конфигурация для изображений
export const IMAGE_BASE_URL = 'https://alfacta.online/100k';

// Функция для получения полного URL изображения
export const getImageUrl = (imageName) => {
  return `${IMAGE_BASE_URL}/${imageName}`;
};

// Список всех изображений приложения
export const IMAGES = {
  // Экраны приветствия
  screen1: getImageUrl('screen1.png'),
  screen2: getImageUrl('screen2.png'),
  screen3: getImageUrl('screen3.png'),
  
  // Фоны
  mainBg: getImageUrl('main-bg.png'),
  profileBg: getImageUrl('profile-bg.png'),
  analButtonBg: getImageUrl('anal-button-bg.png'),
  tariffBgMain: getImageUrl('tariff-bg-main.png'),
  
  // Тарифы
  tariff1Bg: getImageUrl('tariff1-bg.png'),
  kurBg: getImageUrl('kur-bg.png'),
  kur2Bg: getImageUrl('kur2-bg.png'),
  man1: getImageUrl('man1.png'),
  bag: getImageUrl('bag.png'),
};