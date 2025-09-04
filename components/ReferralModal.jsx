import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '@/components/ui/Button';
import Calendar from '@/components/Calendar';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withRepeat
} from 'react-native-reanimated';

// ========================================
// ДАННЫЕ ДЛЯ РЕФЕРАЛЬНОЙ СИСТЕМЫ
// ========================================

// Глобальные переменные для интеграции с бекендом
// Обновляются при получении данных с сервера
let REFERRAL_TOTAL_EARNINGS = 1247; // Общая сумма заработка
let REFERRAL_INVITED_LIST = []; // Список приглашенных рефералов

// Моковые данные приглашенных рефералов
// В реальном приложении эти данные будут приходить с бекенда
const INVITED_REFERRALS = [
  {
    id: 1,
    name: 'Александр Петров',
    time: 'Вчера, 16:45',
    amount: '+850$',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    time: '2 дня назад, 12:20',
    amount: '+1200$',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'Дмитрий Козлов',
    time: '3 дня назад, 09:15',
    amount: '+650$',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

// ========================================
// КОМПОНЕНТ РЕФЕРАЛЬНОЙ СИСТЕМЫ
// ========================================

export default function ReferralModal({ visible, onClose }) {
  // Состояние для общей суммы заработка
  const [totalEarnings] = useState(REFERRAL_TOTAL_EARNINGS);
  
  const confirmButtonOpacity = useSharedValue(1);

  const animatedConfirmButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: confirmButtonOpacity.value,
    };
  });

  const handleConfirm = () => {
    // Обновляем глобальные переменные
    REFERRAL_TOTAL_EARNINGS = totalEarnings;
    REFERRAL_INVITED_LIST = INVITED_REFERRALS;
    
    // TODO: Здесь будет отправка данных на сервер
    
    onClose();
  };

  const handleWithdrawRequest = () => {
    // TODO: Логика запроса вывода средств
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.handleBar} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Referral System Title */}
          <View style={styles.referralTitleContainer}>
            <Text style={styles.referralTitle}>РЕФЕРАЛЬНАЯ СИСТЕМА</Text>
          </View>

          {/* Total Amount */}
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmount}>1,247$</Text>
          </View>

          {/* Withdraw Button */}
          <View style={styles.withdrawButtonContainer}>
            <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdrawRequest}>
              <Text style={styles.withdrawButtonText}>ЗАПРОСИТЬ ВЫВОД</Text>
            </TouchableOpacity>
          </View>

          {/* Calendar Component */}
          <Calendar />

          {/* Invited Referrals Section */}
          <View style={styles.invitedSection}>
            <Text style={styles.invitedTitle}>Приглашенные рефералы</Text>
            
            {INVITED_REFERRALS.map((referral) => (
              <View key={referral.id} style={styles.referralItem}>
                <View style={styles.referralAvatar}>
                  <Image source={{ uri: referral.avatar }} style={styles.referralAvatarImage} />
                </View>
                <View style={styles.referralInfo}>
                  <Text style={styles.referralName}>{referral.name}</Text>
                  <Text style={styles.referralTime}>{referral.time}</Text>
                </View>
                <Text style={styles.referralAmount}>{referral.amount}</Text>
              </View>
            ))}

            {/* Close Button styled as referral item */}
            <TouchableOpacity style={styles.closeButtonItem} onPress={handleConfirm}>
              <Text style={styles.closeButtonText}>ЗАКРЫТЬ</Text>
            </TouchableOpacity>

            {/* Большой отступ снизу для мобильных */}
            <View style={{ height: 80 }} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileTitleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  profileTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  referralTitleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  referralTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  totalAmountContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  totalAmount: {
    color: '#28CEFF',
    fontSize: 48,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  withdrawButtonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  withdrawButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  invitedSection: {
    marginBottom: 20,
  },
  invitedTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 20,
  },
  referralItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131313',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  referralAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 15,
  },
  referralAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  referralInfo: {
    flex: 1,
  },
  referralName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 4,
  },
  referralTime: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-News',
  },
  referralAmount: {
    color: '#10B981',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  closeButtonContainer: {
    paddingHorizontal: 0,
    paddingTop: 30,
    paddingBottom: 50,
  },
  scrollBottomSpacing: {
    height: 20,
  },
  closeButtonItem: {
    backgroundColor: '#0066FF',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
});




