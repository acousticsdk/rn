import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Alert,
  ImageBackground,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification';
import { useNotification } from '@/hooks/useNotification';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
// Обновляются при отправке формы логина
let LOGIN_EMAIL = '';
let LOGIN_PASSWORD = '';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  const handleLogin = () => {
    // Обновляем глобальные значения
    LOGIN_EMAIL = email;
    LOGIN_PASSWORD = password;
    
    // TODO: Здесь пишем логику отправки данных на сервер
    // Данные доступны в переменных: LOGIN_EMAIL, LOGIN_PASSWORD
    
    if (!email || !password) {
      showError('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    showSuccess('Успешно', `Вход выполнен для ${email}`);
    // router.replace('/(tabs)'); // Переход на главный экран после логина
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleRegistration = () => {
    router.push('/(auth)/register');
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://alfacta.online/100k/main-bg.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Notification
        visible={notification.visible}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onHide={hideNotification}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Заголовок ЛОГИН */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>ЛОГИН</Text>
          </View>

          {/* Форма */}
          <View style={styles.form}>
            {/* Поле Email */}
            <TextInput
              style={styles.input}
              placeholder="ПОЧТА"
              placeholderTextColor="#666666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Поле Password */}
            <TextInput
              style={styles.input}
              placeholder="PASSWORD"
              placeholderTextColor="#666666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Кнопка НАЧАТЬ */}
            <View style={styles.buttonContainer}>
              <Button 
                title="НАЧАТЬ" 
                onPress={handleLogin}
                variant="primary"
              />
            </View>

            {/* Нижние ссылки */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={handleForgotPassword} style={styles.linkButtonLeft}>
                <Text style={styles.linkText}>ЗАБЫЛ ПАРОЛЬ</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleRegistration} style={styles.linkButtonRight}>
                <Text style={styles.linkText}>РЕГИСТРАЦИЯ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#070707',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginBottom: 80,
    backgroundColor: '#000000',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  form: {
    width: screenWidth,
    paddingHorizontal: 30,
  },
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
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  linkButtonLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  linkButtonRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  linkText: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
});