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
import MasterProfileContent from '@/components/profile/MasterProfileContent';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для определения типа пользователя
let USER_ROLE = 'master'; // 'master' | 'client' | 'marketing_partner'

export default function ProfileScreen() {
  const [userRole] = useState(USER_ROLE);

  // Пока показываем только мастер-профиль
  // В будущем здесь будет условный рендеринг по ролям
  if (userRole === 'master') {
    return <MasterProfileContent />;
  }

  // TODO: Добавить ClientProfileContent и MarketingPartnerProfileContent
  return <MasterProfileContent />;
}