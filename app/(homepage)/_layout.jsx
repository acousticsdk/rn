import { Stack } from 'expo-router';

export default function HomepageLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: '#070707' }
    }}>
      <Stack.Screen name="master" />
      <Stack.Screen name="client" />
    </Stack>
  );
}