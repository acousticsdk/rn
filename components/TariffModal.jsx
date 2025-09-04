import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import { IMAGES } from '@/config/images';

// Глобальные переменные для интеграции с бекендом
let TARIFF_MODAL_SELECTED_PLAN = '';

const TARIFF_FEATURES = {
  '3month': [
    'Полный доступ к платформе 100K LAB',
    'Все специалисты по себестоимости',
    'Личный продюсер-куратор на проект',
    'Доступ к новостям, ивентам и мероприятиям от платформы 100K LAB',
    'Экономия: 0€ (0 месяцев)',
    'Поддержка 24/7'
  ],
  '6month': [
    'Полный доступ к платформе 100K LAB',
    'Все опытные специалисты по себестоимости',
    'Личный продюсер-куратор на проект, который пишет стратегию курирует команду и доводит проект до результата',
    'Доступ к новостям, ивентам и мероприятиям от платформы 100K LAB',
    'Экономия: 1000€ (1 месяц)',
    'Поддержка 24/7'
  ],
  '12month': [
    'Полный доступ к платформе 100K LAB',
    'Все специалисты по себестоимости',
    'Личный продюсер-куратор на проект',
    'Экономия: 3000€ (3 месяца)',
    'Доступ к новостям, ивентам и мероприятиям от платформы 100K LAB',
    'Поддержка 24/7'
  ],
  'trial': [
    'Полный доступ к платформе 100K LAB',
    'Все специалисты по себестоимости',
    'Личный продюсер-куратор на проект',
    'Доступ к новостям, ивентам и мероприятиям от платформы 100K LAB',
    'Экономия: 0€ (0 месяцев)',
    'Поддержка 24/7'
  ]
};

export default function TariffModal({ visible, onClose, selectedTariff }) {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePayment = () => {
    // Обновляем глобальную переменную
    TARIFF_MODAL_SELECTED_PLAN = selectedPlan || selectedTariff?.id || '3month';
    
    // TODO: Здесь будет логика оплаты
    // Данные доступны в переменной: TARIFF_MODAL_SELECTED_PLAN
    
    console.log(`Оплата тарифа: ${TARIFF_MODAL_SELECTED_PLAN}`);
    onClose();
  };

  const getTariffTitle = () => {
    if (selectedTariff?.title) {
      return selectedTariff.title;
    }
    return '3 МЕСЯЧНЫЙ ПЛАН';
  };

  const getTariffPrice = () => {
    if (selectedTariff?.price) {
      return selectedTariff.price;
    }
    return '3000€';
  };

  const getTariffFeatures = () => {
    const tariffId = selectedTariff?.id || '3month';
    return TARIFF_FEATURES[tariffId] || TARIFF_FEATURES['3month'];
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ImageBackground
        source={{ uri: 'https://alfacta.online/100k/tariff-bg-main.png' }}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.handleBar} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Main Tariff Card */}
            <View style={styles.mainTariffContainer}>
              <ImageBackground
                source={{ uri: IMAGES.tariff1Bg }}
                style={styles.tariffBackground}
                imageStyle={styles.tariffBackgroundImage}
              >
                <View style={styles.tariffContent}>
                  <Text style={styles.tariffTitle}>{getTariffTitle()}</Text>
                  <Text style={styles.tariffPrice}>{getTariffPrice()}</Text>
                </View>
              </ImageBackground>
            </View>

            {/* Features List */}
            <View style={styles.featuresContainer}>
              {getTariffFeatures().map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <View style={styles.bottomSpacing} />
          </ScrollView>
          
          {/* Payment Button - Fixed at bottom */}
        {/* Payment Button - Fixed at bottom */}
        <View style={styles.paymentButtonContainer}>
          <Button 
            title="ОПЛАТИТЬ" 
            onPress={handlePayment}
            variant="primary"
          />
        </View>
      </View>
      </ImageBackground>
    </Modal>
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
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  mainTariffContainer: {
    height: 130,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#3939ff4a',
  },
  tariffBackground: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tariffBackgroundImage: {
    borderRadius: 20,
  },
  tariffContent: {
    alignItems: 'center',
  },
  tariffTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  tariffPrice: {
    color: '#FFFFFF',
    fontSize: 48,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 40,
  },
  featureItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    textAlign: 'left',
  },
  paymentButtonContainer: {
    marginBottom: 20,
  },
  paymentButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  bottomSpacing: {
    height: 40,
  },
});