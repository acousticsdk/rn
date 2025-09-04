import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  style,
  textStyle,
  disabled = false 
}) {
  switch (variant) {
    case 'primary':
      return (
        <TouchableOpacity 
          onPress={onPress} 
          style={[styles.buttonContainer, style]}
          disabled={disabled}
        >
          <LinearGradient
            colors={disabled ? ['#666666', '#444444'] : ['rgb(53, 68, 252)', 'rgb(74, 152, 255)']}
            style={styles.gradientBorder}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <LinearGradient
              colors={disabled ? ['#666666', '#444444'] : ['#0210F8', '#0088FF']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={[styles.primaryButtonText, textStyle]}>{title}</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      );

    case 'rounded':
      return (
        <TouchableOpacity 
          onPress={onPress} 
          style={[styles.buttonContainer, style]}
          disabled={disabled}
        >
          <LinearGradient
            colors={disabled ? ['#666666', '#444444'] : ['rgb(53, 68, 252)', 'rgb(74, 152, 255)']}
            style={styles.roundedGradientBorder}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <LinearGradient
              colors={disabled ? ['#666666', '#444444'] : ['#0210F8', '#0088FF']}
              style={styles.roundedGradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={[styles.primaryButtonText, textStyle]}>{title}</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
      );

    default:
      return (
        <TouchableOpacity 
          onPress={onPress} 
          style={[styles.secondaryButton, style]}
          disabled={disabled}
        >
          <Text style={[styles.secondaryButtonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  gradientBorder: {
    borderRadius: 15,
    padding: 2,
  },
  gradientButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedGradientBorder: {
    borderRadius: 40,
    padding: 2,
  },
  roundedGradientButton: {
    width: '100%',
    paddingVertical: 22,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0088FF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 100,
    elevation: 100,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    letterSpacing: 1,
    fontFamily: 'Codec-Pro-Bold',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
});