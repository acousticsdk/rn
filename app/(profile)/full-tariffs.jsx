import React, { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import { BlurView } from 'expo-blur';
import { Lock } from 'lucide-react-native';
import { IMAGES } from '@/config/images';
import TariffModal from '@/components/TariffModal';
const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let SELECTED_TARIFF = '';

const TARIFF_PLANS = [
  {
    id: '3month',
    title: '3 МЕСЯЧНЫЙ ПЛАН',
    price: '3000€',
    type: 'subscription'
  },
  {
    id: '6month',
    title: '6 МЕСЯЧНЫЙ ПЛАН',
    price: '5000€',
    type: 'subscription'
  },
  {
    id: '12month',
    title: '12 МЕСЯЧНЫЙ ПЛАН',
    price: '9000€',
    type: 'subscription'
  },
  {
    id: 'trial',
    title: 'ПРОБНЫЙ МЕСЯЦ',
    price: '1500€',
    type: 'trial'
  }
];

export default function FullTariffsScreen() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [tariffModalVisible, setTariffModalVisible] = useState(false);
  const [selectedTariffForModal, setSelectedTariffForModal] = useState(null);

  const handleBack = () => {
    router.back();
  };

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
    SELECTED_TARIFF = planId;
    
    // Находим выбранный тариф
    const selectedTariff = TARIFF_PLANS.find(plan => plan.id === planId);
    setSelectedTariffForModal(selectedTariff);
    setTariffModalVisible(true);
    
    console.log(`Выбран тариф: ${planId}`);
  };

  const renderTariffCard = (plan) => {
    const isSelected = selectedPlan === plan.id;
    const isTrial = plan.type === 'trial';
    const isSubscriptionPlan = plan.type === 'subscription';
    const isLocked = plan.id === '12month' || plan.id === 'trial';
    
    return (
      <TouchableOpacity
        key={plan.id}
        style={[
          styles.tariffCard,
          isTrial && styles.trialCard
        ]}
        onPress={isLocked ? undefined : () => handleSelectPlan(plan.id)}
        disabled={isLocked}
      >
        {isLocked ? (
          <ImageBackground
            source={{ uri: IMAGES.tariff1Bg }}
            style={styles.tariffBackground}
            imageStyle={styles.tariffBackgroundImage}
          >
            <View style={styles.tariffContent}>
              <Text style={styles.tariffTitle}>{plan.title}</Text>
              <Text style={styles.tariffPrice}>{plan.price}</Text>
              
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleSelectPlan(plan.id)}
              >
                <Text style={styles.selectButtonText}>
                  ВЫБРАТЬ
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.lockedOverlay}>
              <View style={styles.lockIconContainer}>
                <Lock size={32} color="#FFFFFF" />
              </View>
              
              <Text style={styles.lockedSubtitle}>
                Для разблокировки{'\n'}свяжитесь с поддержкой
              </Text>
            </View>
          </ImageBackground>
        ) : isSubscriptionPlan ? (
          <ImageBackground
            source={{ uri: IMAGES.tariff1Bg }}
            style={styles.tariffBackground}
            imageStyle={styles.tariffBackgroundImage}
          >
            <View style={styles.tariffContent}>
              <Text style={styles.tariffTitle}>{plan.title}</Text>
              <Text style={styles.tariffPrice}>{plan.price}</Text>
              
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => handleSelectPlan(plan.id)}
              >
                <Text style={styles.selectButtonText}>
                  ВЫБРАТЬ
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={['#0066FF', '#4A9EFF']}
            style={styles.tariffGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.tariffContent}>
              <Text style={styles.tariffTitle}>{plan.title}</Text>
              <Text style={styles.tariffPrice}>{plan.price}</Text>
              
              <TouchableOpacity
                style={styles.trialSelectButton}
                onPress={() => handleSelectPlan(plan.id)}
              >
                <Text style={styles.trialSelectButtonText}>
                  ВЫБРАТЬ
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={{ uri: IMAGES.tariffBgMain }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.titleWrapper}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ТАРИФЫ</Text>
            </View>
          </View>

          {/* Tariff Cards Grid */}
          <View style={styles.tariffsContainer}>
            <View style={styles.tariffsRow}>
              {renderTariffCard(TARIFF_PLANS[0])}
              {renderTariffCard(TARIFF_PLANS[1])}
            </View>
            
            <View style={styles.tariffsRow}>
              {renderTariffCard(TARIFF_PLANS[2])}
              {renderTariffCard(TARIFF_PLANS[3])}
            </View>
          </View>

          {/* Subscription Without Curator */}
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionContainer}>
              <LinearGradient
                colors={['#1a41f4', '#367af4']}
                style={styles.subscriptionBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.subscriptionContent}>
                  <Text style={styles.subscriptionTitle}>ПОДПИСКА БЕЗ{'\n'}КУРАТОРСТВА</Text>
                  <View style={styles.subscriptionPricePlate}>
                    <Text style={styles.subscriptionPrice}>100$/МЕС</Text>
                  </View>
                </View>
              </LinearGradient>
              
              {/* Man1 Image - positioned absolutely */}
              <Image
                source={{ uri: IMAGES.man1 }}
                style={styles.subscriptionImage}
              />
            </View>
          </View>

          {/* Referral Bonus */}
          <View style={styles.referralCard}>
            <LinearGradient
              colors={['#060606', '#272727']}
              style={styles.referralBackground}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {/* Bag Image - positioned absolutely on the left */}
              <Image
                source={{ uri: IMAGES.bag }}
                style={styles.referralImage}
              />
              
              <View style={styles.referralContent}>
                <View style={styles.referralTextRow}>
                  <Text style={styles.referralMainText}>ПОЛУЧИ</Text>
                  <LinearGradient
                    colors={['#0210F8', '#0088FF']}
                    style={styles.referralPricePlate}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.referralPrice}>1000$</Text>
                  </LinearGradient>
                  <Text style={styles.referralMainTextEnd}>ЗА</Text>
                </View>
                
                <Text style={styles.referralSubText}>КАЖДОГО НОВОГО{'\n'}ПОЛЬЗОВАТЕЛЯ</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
        
        {/* Tariff Modal */}
        <TariffModal
          visible={tariffModalVisible}
          onClose={() => setTariffModalVisible(false)}
          selectedTariff={selectedTariffForModal}
        />
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
  tariffsContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 20,
  },
  tariffsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  tariffCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3939ff4a',
  },
  trialCard: {
    borderWidth: 1,
    borderColor: '#3939ff4a',
  },
  tariffGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  tariffBackground: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  tariffBackgroundImage: {
    borderRadius: 20,
  },
  tariffContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  tariffTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tariffPrice: {
    color: '#FFFFFF',
    fontSize: 38,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#0066FF',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trialSelectButton: {
    backgroundColor: '#252525',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  trialSelectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  subscriptionCard: {
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 24,
  },
  subscriptionContainer: {
    flex: 1,
    position: 'relative',
  },
  subscriptionBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  subscriptionContent: {
    alignItems: 'flex-start',
  },
  subscriptionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 5,
  },
  subscriptionPricePlate: {
    backgroundColor: 'rgb(37, 37, 37)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  subscriptionPrice: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
  },
  subscriptionImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    width: 120,
    resizeMode: 'cover',
  },
  referralCard: {
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 24,
  },
  referralBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  referralContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  referralTextRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  referralMainText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    marginRight: 8,
  },
  referralPricePlate: {
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    marginTop: -5,
  },
  referralPrice: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Codec-Pro-Bold',
  },
  referralMainTextEnd: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
  },
  referralSubText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'right',
    lineHeight: 28,
  },
  referralImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    width: 140,
    resizeMode: 'cover',
  },
  referralImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lockedTariffBlur: {
    flex: 1,
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  lockIconContainer: {
    marginBottom: 15,
  },
  lockedTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  lockedSubtitle: {
    color: '#CCCCCC',
    fontSize: 10,
    fontFamily: 'Codec-Pro-News',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomSpacing: {
    height: 40,
  },
});