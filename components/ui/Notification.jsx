import { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function Notification({ 
  visible, 
  type = 'success', // 'success' | 'error'
  title, 
  message, 
  onHide,
  duration = 3000 
}) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      console.log('Notification показывается:', { type, title, message });
      
      // Показываем уведомление
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
      
      // Автоматически скрываем через duration
      const hideTimeout = setTimeout(() => {
        translateY.value = withTiming(-100, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 }, (finished) => {
          if (finished) {
            runOnJS(onHide)();
          }
        });
      }, duration);

      return () => clearTimeout(hideTimeout);
    } else {
      // Сбрасываем значения когда не видимо
      translateY.value = -100;
      opacity.value = 0;
    }
  }, [visible, type, title, message, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  // Для отладки - показываем состояние
  console.log('Notification render:', { visible, type, title });

  if (!visible) return null;

  const isSuccess = type === 'success';
  const Icon = isSuccess ? CheckCircle : AlertCircle;
  const iconColor = isSuccess ? '#10B981' : '#EF4444';
  const borderColor = isSuccess ? '#10B981' : '#EF4444';

  return (
    <Animated.View style={[styles.container, { borderLeftColor: borderColor }, animatedStyle]}>
      <View style={styles.content}>
        <Icon size={24} color={iconColor} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 60,
    left: 20,
    right: 20,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    ...(Platform.OS === 'web' && {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'web' ? 'system-ui' : 'Codec-Pro-Bold',
  },
  message: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 2,
    fontFamily: Platform.OS === 'web' ? 'system-ui' : 'Codec-Pro-News',
  },
});