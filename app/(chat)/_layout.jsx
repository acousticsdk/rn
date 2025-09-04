import { Stack } from 'expo-router';

export default function ChatLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: '#070707' }
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="conversation/[id]" />
    </Stack>
  );
}