import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import ImagePreloader from '@/components/ImagePreloader';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    // Скрываем плашку "Made in Bolt" для веб-версии
    if (Platform.OS === 'web') {
      const style = document.createElement('style');
      style.textContent = `
        .badge,
        div.badge,
        [class*="badge"],
        div[style*="Made in Bolt"],
        div[style*="made-in-bolt"],
        div:has(span:contains("Made in Bolt")),
        div[style*="border-radius: 8px"][style*="background: white"],
        div[style*="font-family: Inter"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    'Benzin-Bold': require('../assets/fonts/Benzin-Bold.ttf'),
    'Codec-Pro-Light': require('../assets/fonts/CodecPro-Light.ttf'),
    'Codec-Pro-News': require('../assets/fonts/CodecPro-News.ttf'),
    'Codec-Pro-Bold': require('../assets/fonts/CodecPro-Bold.ttf'),
    'Codec-Pro-Heavy': require('../assets/fonts/CodecPro-Heavy.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImagePreloader />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(start)" options={{ contentStyle: { backgroundColor: '#070707' } }} />
        <Stack.Screen name="(auth)" options={{ contentStyle: { backgroundColor: '#070707' } }} />
        <Stack.Screen name="(profile)" options={{ contentStyle: { backgroundColor: '#070707' } }} />
        <Stack.Screen name="(chat)" options={{ contentStyle: { backgroundColor: '#070707' } }} />
      </Stack>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
});