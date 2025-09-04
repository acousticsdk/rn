import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay
} from 'react-native-reanimated';
import SecurityModal from '@/components/SecurityModal';
import ReferralModal from '@/components/ReferralModal';

const { width: screenWidth } = Dimensions.get('window');

const MENU_ITEMS = [
  {
    id: 'tariffs',
    title: 'Тарифы',
    route: '/(profile)/tariffs',
    gradient: ['#0066FF', '#0088FF'],
    hasIcon: true
  },
  {
    id: 'referral',
    title: 'Реферальная система',
    route: '/(profile)/referral',
    gradient: ['#0066FF', '#0088FF'],
    hasIcon: true
  },
  {
    id: 'analytics',
    title: 'Аналитика',
    route: '/(profile)/analytics',
    gradient: ['#1a1a1a', '#333333'],
    hasIcon: true,
    hasPattern: true
  },
  {
    id: 'personal-info',
    title: 'Личная информация',
    route: '/(profile)/personal-info',
    gradient: ['#1a1a1a', '#333333'],
    hasIcon: true
  },
  {
    id: 'portfolio',
    title: 'Портфолио/Кейсы',
    route: '/(profile)/portfolio',
    gradient: ['#1a1a1a', '#333333'],
    hasIcon: true
  },
  {
    id: 'security',
    title: 'Безопасность',
    route: '/(profile)/security',
    gradient: ['#1a1a1a', '#333333'],
    hasIcon: true
  },
  {
    id: 'support',
    title: 'Тех-Поддержка',
    route: '/(profile)/support',
    gradient: ['#1a1a1a', '#333333'],
    hasIcon: true
  },
  {
    id: 'education',
    title: 'Обучение по Реф. Системе',
    route: '/(profile)/education',
    gradient: ['#1a1a1a', '#333333'],
    hasIcon: true
  },
  {
    id: 'services',
    title: 'Услуги',
    route: '/(profile)/services',
    gradient: ['#1a1a1a', '#333333'],
    hasIcon: true
  }
];

export default function MasterProfileContent() {
  const backgroundOpacity = useSharedValue(0);
  const analyticsOpacity = useSharedValue(0);
  const backgroundImageOpacity = useSharedValue(0);
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const [securityModalVisible, setSecurityModalVisible] = useState(false);
  const [referralModalVisible, setReferralModalVisible] = useState(false);

  React.useEffect(() => {
    // Основной фон появляется сразу
    backgroundOpacity.value = withTiming(1, { duration: 200 });
    // Кнопка аналитики появляется с задержкой
    analyticsOpacity.value = withTiming(1, { duration: 200 });
  }, []);

  const handleBackgroundImageLoad = () => {
    console.log('🖼️ Фоновая картинка профиля загружена');
    setBackgroundImageLoaded(true);
    // Плавно показываем фоновую картинку
    backgroundImageOpacity.value = withTiming(1, { duration: 200 });
  };

  const handleBackgroundImageError = () => {
    console.log('❌ Ошибка загрузки фоновой картинки профиля');
    setBackgroundImageLoaded(true);
  };

  // Показываем UI сразу, не ждем загрузки фоновой картинки
  React.useEffect(() => {
    setBackgroundImageLoaded(true);
  }, []);

  const handleMenuPress = (route) => {
    if (route === '/(profile)/security') {
      setSecurityModalVisible(true);
    } else if (route === '/(profile)/referral') {
      setReferralModalVisible(true);
    } else {
      router.push(route);
    }
  };

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
    };
  });

  const animatedAnalyticsStyle = useAnimatedStyle(() => {
    return {
      opacity: analyticsOpacity.value,
    };
  });

  const animatedBackgroundImageStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundImageOpacity.value,
    };
  });

  return (
    <View style={styles.backgroundContainer}>
      {/* Черная подложка */}
      <Animated.View style={[styles.blackBackground, animatedBackgroundStyle]} />
      
      {/* Фоновая картинка */}
      <Animated.View style={[styles.backgroundImageContainer, animatedBackgroundImageStyle]}>
        <ImageBackground 
          source={{ uri: 'https://alfacta.online/100k/profile-bg.png' }}
          style={styles.backgroundImage}
          resizeMode="cover"
          onLoad={handleBackgroundImageLoad}
          onError={handleBackgroundImageError}
        >
          <View style={styles.backgroundOverlay} />
        </ImageBackground>
      </Animated.View>

      {/* Контент */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={[styles.header, styles.headerWithPadding]}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ПРОФИЛЬ</Text>
            </View>
          </View>

          {/* Profile Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {MENU_ITEMS.map((item, index) => (
              <React.Fragment key={item.id}>
                {item.id === 'analytics' ? (
                  <Animated.View style={animatedAnalyticsStyle}>
                    <TouchableOpacity
                      style={[styles.menuItem, styles.transparentMenuItem]}
                      onPress={() => handleMenuPress(item.route)}
                    >
                      <ImageBackground
                        source={{ uri: 'https://alfacta.online/100k/anal-button-bg.png' }}
                        style={styles.analyticsBackground}
                        resizeMode="stretch"
                      >
                        <View style={styles.menuItemContent}>
                          <Text style={styles.menuItemText}>
                            {item.title}
                          </Text>
                          <ChevronRight 
                            size={20} 
                            color="#FFFFFF" 
                          />
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </Animated.View>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      index < 2 && styles.blueMenuItem,
                      index >= 3 && styles.transparentMenuItem
                    ]}
                    onPress={() => handleMenuPress(item.route)}
                  >
                    <View style={[
                      styles.menuItemContent,
                      index < 2 && styles.blueMenuItemContent
                    ]}>
                      <Text style={[
                        styles.menuItemText,
                        index < 2 && styles.blueMenuItemText
                      ]}>
                        {item.title}
                      </Text>
                      {item.hasIcon && (
                        <ChevronRight 
                          size={20} 
                          color={index < 2 ? '#FFFFFF' : '#666666'} 
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                
                {/* Разделитель после первой синей кнопки (Тарифы) */}
                {index === 0 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))}
          </View>

          <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Security Modal */}
      <SecurityModal
        visible={securityModalVisible}
        onClose={() => setSecurityModalVisible(false)}
      />

      {/* Referral Modal */}
      <ReferralModal
        visible={referralModalVisible}
        onClose={() => setReferralModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    position: 'relative',
  },
  blackBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#070707',
    zIndex: 1,
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7, 7, 7, 0.3)', // Легкое затемнение для лучшей читаемости
  },
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 3,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  headerWithPadding: {
    paddingTop: 70, // Отступ сверху для статус бара
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#666666',
    padding: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 92,
    resizeMode: 'cover',
  },
  menuContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  menuItem: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  blueMenuItem: {
    backgroundColor: '#0066FF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  transparentMenuItem: {
    backgroundColor: '#0c0c0c96',
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  blueMenuItemContent: {
    backgroundColor: 'transparent',
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    flex: 1,
  },
  blueMenuItemText: {
    color: '#FFFFFF',
  },
  analyticsBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bottomSpacing: {
    height: 20,
  },
  separator: {
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginLeft: 85,
    marginRight: 85,
    borderRadius: 10,
  },
});