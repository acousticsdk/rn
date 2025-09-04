import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MessageCircle, Store, Wallet, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import HomeIcon from '@/components/ui/HomeIcon';
import ChatIcon from '@/components/ui/ChatIcon';
import MarketplaceIcon from '@/components/ui/MarketplaceIcon';
import WalletIcon from '@/components/ui/WalletIcon';
import ProfileIcon from '@/components/ui/ProfileIcon';

const { width: screenWidth } = Dimensions.get('window');

// ========================================
// ДАННЫЕ ДЛЯ ИНТЕГРАЦИИ С БЕКЕНДОМ
// ========================================

// Глобальные переменные для главной страницы мастера
// Обновляются при получении данных с сервера
let HOMEPAGE_USER_NAME = 'Mikhail';        // Имя пользователя
let HOMEPAGE_TEAM_COUNT = 0;               // Количество людей в команде
let HOMEPAGE_INVITED_COUNT = 1;            // Количество приглашенных друзей
let HOMEPAGE_EARNINGS = 1000;              // Заработанная сумма в евро
let HOMEPAGE_AVATAR_URL = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'; // URL аватара пользователя

// Функции для обновления данных с бекенда
const updateHomepageData = (userData) => {
  HOMEPAGE_USER_NAME = userData.name || 'Mikhail';
  HOMEPAGE_TEAM_COUNT = userData.teamCount || 0;
  HOMEPAGE_INVITED_COUNT = userData.invitedCount || 1;
  HOMEPAGE_EARNINGS = userData.earnings || 1000;
  HOMEPAGE_AVATAR_URL = userData.avatarUrl || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400';
};

// Функция для получения текущих данных
const getHomepageData = () => ({
  userName: HOMEPAGE_USER_NAME,
  teamCount: HOMEPAGE_TEAM_COUNT,
  invitedCount: HOMEPAGE_INVITED_COUNT,
  earnings: HOMEPAGE_EARNINGS,
  avatarUrl: HOMEPAGE_AVATAR_URL
});

// ========================================
// КОМПОНЕНТ ГЛАВНОЙ СТРАНИЦЫ МАСТЕРА
// ========================================

export default function MasterHomepage() {
  const [userName] = useState(HOMEPAGE_USER_NAME);
  const [teamCount] = useState(HOMEPAGE_TEAM_COUNT);
  const [invitedCount] = useState(HOMEPAGE_INVITED_COUNT);
  const [earnings] = useState(HOMEPAGE_EARNINGS);
  const [avatarUrl] = useState(HOMEPAGE_AVATAR_URL);

  const handleBuildTeam = () => {
    // TODO: Логика сборки команды
    console.log('Собрать команду');
  };

  const handleTabPress = (tabName) => {
    switch (tabName) {
      case 'home':
        // Уже на главной
        break;
      case 'chat':
        router.push('/(chat)');
        break;
      case 'marketplace':
        // TODO: Переход на маркетплейс
        console.log('Маркетплейс');
        break;
      case 'wallet':
        // TODO: Переход на кошелек
        console.log('Кошелек');
        break;
      case 'profile':
        router.push('/(profile)');
        break;
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://alfacta.online/100k/main-bg.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>100KLAB</Text>
          </View>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          <Image
            source={{ uri: avatarUrl }}
            style={styles.fullBlockAvatar}
          />
          {/* Greeting - moved to bottom left */}
          <View style={styles.greetingContainerBottomLeft}>
            <View style={styles.blurContainer}>
              <BlurView intensity={20} style={styles.blurBackground}>
                <View style={styles.greetingContent}>
                  <Text style={styles.greeting}>Привет, {userName}!</Text>
                </View>
              </BlurView>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            {/* Left Block - Team */}
            <View style={styles.statsBlock}>
              <Text style={styles.teamLabel}>Ваша команда:</Text>
              <LinearGradient
                colors={['#023CFE', '#027EFD']}
                style={styles.blockValueGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[styles.blockValueText, { fontSize: 14 }]}>{teamCount} человек</Text>
              </LinearGradient>
            </View>

            {/* Right Block - Invited/Earnings */}
            <View style={styles.statsBlock}>
              <View style={styles.firstEarningsPlaque}>
                <Text style={styles.firstEarningsText}>
                  <Text style={styles.invitedLabel}>Приглашено: </Text>
                  <Text style={styles.invitedValue}>1 друг</Text>
                </Text>
              </View>
              <LinearGradient
                colors={['#023CFE', '#027EFD']}
                style={styles.blockValueGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.blockValueText}>Заработано: € {earnings}</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Build Team Button */}
        <View style={styles.buildTeamContainer}>
          <TouchableOpacity style={styles.buildTeamButton} onPress={handleBuildTeam}>
            <LinearGradient
              colors={['rgb(53, 68, 252)', 'rgb(74, 152, 255)']}
              style={styles.buildTeamGradientBorder}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <LinearGradient
                colors={['#0210F8', '#0088FF']}
                style={styles.buildTeamGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buildTeamText}>СОБРАТЬ КОМАНДУ</Text>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Tab Bar */}
      <View style={styles.floatingTabBar}>
        <View style={styles.tabBarContainer}>
          {/* Home Tab */}
          <TouchableOpacity 
            style={styles.tabItem}
            onPress={() => handleTabPress('home')}
          >
            <HomeIcon size={24} color="#0066FF" />
          </TouchableOpacity>

          {/* Chat Tab */}
          <TouchableOpacity 
            style={styles.tabItem}
            onPress={() => handleTabPress('chat')}
          >
            <ChatIcon size={24} color="#666666" />
          </TouchableOpacity>

          {/* Marketplace Tab */}
          <TouchableOpacity 
            style={styles.tabItem}
            onPress={() => handleTabPress('marketplace')}
          >
            <MarketplaceIcon size={24} color="#666666" />
          </TouchableOpacity>

          {/* Wallet Tab */}
          <TouchableOpacity 
            style={styles.tabItem}
            onPress={() => handleTabPress('wallet')}
          >
            <WalletIcon size={24} color="#666666" />
          </TouchableOpacity>

          {/* Profile Tab */}
          <TouchableOpacity 
            style={styles.tabItem}
            onPress={() => handleTabPress('profile')}
          >
            <ProfileIcon size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   
  safeArea: {
    flex: 1,
    backgroundColor: '#070707',
  },
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  mainCard: {
    marginHorizontal: 24,
    marginBottom: 30,
    borderRadius: 30,
    overflow: 'hidden',
    height: 300,
    position: 'relative',
  },
  fullBlockAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  greetingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 20,
  },
  greetingContainerBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  blurContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  blurBackground: {
    borderRadius: 25,
  },
  greetingContent: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  statsBlock: {
    flex: 1,
    backgroundColor: '#131313',
    borderRadius: 28,
    padding: 15,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockLabel: {
    color: '#787878',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  blockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  blockValueGradient: {
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  blockValueText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  invitedPlaque: {
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#131313',
    marginBottom: 10,
  },
  firstEarningsPlaque: {
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131313',
    borderWidth: 1,
    borderColor: '#333333',
    width: '100%',
  },
  firstEarningsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  invitedLabel: {
    color: '#8C8C8C',
  },
  invitedValue: {
    color: '#FFFFFF',
  },
  buildTeamContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  buildTeamButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  buildTeamGradientBorder: {
    borderRadius: 15,
    padding: 2,
  },
  buildTeamGradient: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buildTeamText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Codec-Pro-Bold',
    letterSpacing: 1,
  },
  bottomSpacing: {
    height: 20,
  },
  floatingTabBar: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    height: 75,
    backgroundColor: '#1A1A1A',
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  tabBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  teamLabel: {
    color: '#787878',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
});