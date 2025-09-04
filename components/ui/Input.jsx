import { TextInput, StyleSheet } from 'react-native';

export default function Input({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  style,
  ...props 
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#666666"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginBottom: 20,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: '#131313',
    fontFamily: 'Codec-Pro-News',
  },
});