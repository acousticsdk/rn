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
const { width: screenWidth } = Dimensions.get('window');

// Если реальный размер картинки 1080x720L
const IMAGE_RATIO = 1080 / 1180; // width / height
const IMAGE_HEIGHT = screenWidth / IMAGE_RATIO; // высота адаптивная

export default function Screen2() {
  const imageOpacity = useSharedValue(0);

  useEffect(() => {
    // Картинка появляется за 0.6 секунды
    imageOpacity.value = withTiming(1, { duration: 600 });
  }, []);

  const handleContinue = () => {
    router.push('/(start)/screen3');
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
            source={{ uri: 'https://alfacta.online/100k/screen2.png' }}
            style={{ width: screenWidth, height: IMAGE_HEIGHT, resizeMode: 'cover' }}
          />
        </Animated.View>

        {/* КОНТЕНТ */}
        <View style={styles.content}>
          <Text style={styles.title}>
            <Text style={styles.titleWhite}>Под крылом своего</Text>
          </Text>

          <View style={styles.gradientTextContainer}>
            <Svg height="30" width="300">
              <Defs>
                <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#28CEFF" />
                  <Stop offset="100%" stopColor="#FFFFFF" />
                </LinearGradient>
              </Defs>
              <SvgText
                fill="url(#grad2)"
                fontSize="26"
                fontWeight="600"
                x="150"
                y="22"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Codec-Pro-Bold"
              >
                личного продюсера!
              </SvgText>
            </Svg>
          </View>

          <Text style={styles.subtitle}>
            Тебе пишут стратегию продвижения{'\n'}и собирают команду под задачи{'\n'}из лучших специалистов
          </Text>

          <View style={styles.buttonContainer}>
            <Button title="ПРОДОЛЖИТЬ" onPress={handleContinue} variant="rounded" />
          </View>
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
});