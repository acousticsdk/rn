import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: '#070707' }
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="tariffs" />
      <Stack.Screen name="referral" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="portfolio" />
      <Stack.Screen name="security" />
      <Stack.Screen name="support" />
      <Stack.Screen name="education" />
      <Stack.Screen name="services" />
      <Stack.Screen name="add-case" />
      <Stack.Screen name="full-tariffs" />
    </Stack>
  );
}