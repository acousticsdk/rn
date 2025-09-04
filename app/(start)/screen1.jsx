import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay 
} from 'react-native-reanimated';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';
import { TouchableOpacity } from 'react-native';


const { width: screenWidth } = Dimensions.get('window');

// Если реальный размер картинки 1080x720
const IMAGE_RATIO = 1080 / 1136; // width / height
const IMAGE_HEIGHT = screenWidth / IMAGE_RATIO; // высота адаптивная

export default function Screen1() {
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    // Картинка появляется за 0.6 секунды
    imageOpacity.value = withTiming(1, { duration: 600 });
  }, []);

  const handleContinue = () => {
    router.push('/(start)/screen2');
  };

  const handleDevProfile = () => {
    router.push('/(profile)/master');
  };

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* КАРТИНКА */}
        <Animated.View style={animatedImageStyle}>
          <Image
            source={{ uri: 'https://alfacta.online/100k/screen1.png' }}
            style={{ width: screenWidth, height: IMAGE_HEIGHT, resizeMode: 'cover' }}
          />
        </Animated.View>

        {/* КОНТЕНТ */}
        <View style={styles.content}>
          <Text style={styles.title}>
            <Text style={styles.titleWhite}>Твоя личная команда</Text>
          </Text>

          <View style={styles.gradientTextContainer}>
            <Svg height="30" width="300">
              <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#28CEFF" />
                  <Stop offset="100%" stopColor="#FFFFFF" />
                </LinearGradient>
              </Defs>
              <SvgText
                fill="url(#grad)"
                fontSize="26"
                fontWeight="600"
                x="150"
                y="22"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Codec-Pro-Bold"
              >
                под 0% комиссии
              </SvgText>
            </Svg>
          </View>

          <Text style={styles.subtitle}>
            Плати 0% наценки за свою{'\n'}команду по продвижению
          </Text>

          <View style={styles.buttonContainer}>
            <Button title="ПРОДОЛЖИТЬ" onPress={handleContinue} variant="rounded" />
          </View>
        </View>

        {/* Технические кнопки для разработки */}
        <View style={styles.devButtonsContainer}>
          <TouchableOpacity 
            style={styles.devButton} 
            onPress={() => router.push('/(profile)')}
          >
            <Text style={styles.devButtonText}>Профиль</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.devButton} 
            onPress={() => router.push('/(chat)')}
          >
            <Text style={styles.devButtonText}>Чат</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.devButton} 
            onPress={() => router.push('/(homepage)/master')}
          >
            <Text style={styles.devButtonText}>Главная</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#070707' },
  container: { flex: 1, backgroundColor: '#070707' },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'flex-start',
  },
  title: { 
    fontSize: 28, 
    fontWeight: '600', 
    textAlign: 'center', 
    lineHeight: 40, 
    fontFamily: 'Codec-Pro-Bold',
    position: 'relative',
    top: 10
  },
  titleWhite: { color: '#FFFFFF' },
  gradientTextContainer: { alignItems: 'center', justifyContent: 'center' },
  subtitle: { color: '#787878', fontSize: 16, fontWeight: '400', textAlign: 'center', lineHeight: 20, fontFamily: 'Codec-Pro-Bold', marginTop: 30, marginBottom: 64 },
  buttonContainer: { width: '100%', maxWidth: 320, paddingBottom: 32 },
  devButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  devButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  devButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
});