import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let HOMEPAGE_USER_NAME = 'Mikhail';
let HOMEPAGE_TEAM_COUNT = 0;
let HOMEPAGE_INVITED_COUNT = 1;
let HOMEPAGE_EARNINGS = 1000;

export default function MasterHomepage() {
  const [userName] = useState(HOMEPAGE_USER_NAME);
  const [teamCount] = useState(HOMEPAGE_TEAM_COUNT);
  const [invitedCount] = useState(HOMEPAGE_INVITED_COUNT);
  const [earnings] = useState(HOMEPAGE_EARNINGS);

  const handleBuildTeam = () => {
    // TODO: Логика сборки команды
    console.log('Собрать команду');
  };

  return (
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
          <LinearGradient
            colors={['#4A9EFF', '#0066FF']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.avatar}
              />
            </View>

            {/* Greeting */}
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Привет, {userName}!</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            {/* Left Block - Team */}
            <View style={styles.statsBlock}>
              <Text style={styles.blockLabel}>Ваша команда:</Text>
              <LinearGradient
                colors={['#0066FF', '#4A9EFF']}
                style={styles.blockValueGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.blockValueText}>{teamCount} человек</Text>
              </LinearGradient>
            </View>

            {/* Right Block - Invited/Earnings */}
            <View style={styles.statsBlock}>
              <View style={styles.blockRow}>
                <Text style={styles.blockLabel}>Приглашено:</Text>
                <Text style={styles.blockValue}>{invitedCount} друг</Text>
              </View>
              <LinearGradient
                colors={['#0066FF', '#4A9EFF']}
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
              colors={['#0066FF', '#4A9EFF']}
              style={styles.buildTeamGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.buildTeamText}>СОБРАТЬ КОМАНДУ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  },
  cardGradient: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  greetingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 20,
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
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
    gap: 15,
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockValueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  buildTeamContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  buildTeamButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  buildTeamGradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buildTeamText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
    letterSpacing: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});