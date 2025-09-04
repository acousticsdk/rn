import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Calendar, User, Users, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let TARIFFS_SELECTED_PLAN = '';

export default function TariffsScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleTryPlan = () => {
    // TODO: Логика пробного периода
    console.log('Попробовать план');
  };

  const handleViewAllTariffs = () => {
    router.push('/(profile)/full-tariffs');
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://alfacta.online/100k/main-bg.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.titleWrapper}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ПРОФИЛЬ</Text>
            </View>
          </View>

          {/* Main Title */}
          <View style={styles.mainTitleContainer}>
            <Text style={styles.mainTitle}>ВСЯ КОМАНДА</Text>
          </View>

          {/* Cost Per Service Block */}
          <View style={styles.costBlock}>
            <Text style={styles.costText}>ПО СЕБЕСТОИМОСТИ</Text>
          </View>

          {/* Try Button */}
          <View style={styles.tryButtonContainer}>
            <Button 
              title="ПОПРОБОВАТЬ" 
              onPress={handleTryPlan}
              variant="primary"
            />
          </View>

          {/* Placeholder Content */}
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>ТУТ БУДЕТ ЛЕНДОС</Text>
          </View>

          {/* Bottom Button */}
          <View style={styles.bottomButtonContainer}>
            <Button 
              title="ПОСМОТРЕТЬ ВСЕ ТАРИФЫ" 
              onPress={handleViewAllTariffs}
              variant="primary"
              textStyle={styles.bottomButtonTextStyle}
            />
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#070707',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 40,
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
  mainTitleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  mainTitle: {
    color: '#4A9EFF',
    fontSize: 32,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  costBlock: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 24,
  },
  costText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  tryButtonContainer: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  placeholderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#787878',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  bottomButtonTextStyle: {
    fontSize: 18,
  },
  bottomSpacing: {
    height: 20,
  },
});