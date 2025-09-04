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
import { ChevronDown } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification';
import { useNotification } from '@/hooks/useNotification';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
// Обновляются при отправке формы регистрации
let REGISTER_ROLE = '';
let REGISTER_NAME = '';
let REGISTER_EMAIL = '';
let REGISTER_PASSWORD = '';

const ROLES = [
  { label: 'Клиент', value: 'client' },
  { label: 'Исполнитель', value: 'master' },
  { label: 'Партнер по маркетингу', value: 'marketing_partner' }
];

export default function RegisterScreen() {
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  const dropdownHeight = useSharedValue(0);
  const dropdownOpacity = useSharedValue(0);
  const dropdownPadding = useSharedValue(0);

  const handleRegister = () => {
    // Обновляем глобальные значения
    REGISTER_ROLE = selectedRole;
    REGISTER_NAME = name;
    REGISTER_EMAIL = email;
    REGISTER_PASSWORD = password;
    
    // TODO: Здесь пишем логику отправки данных на сервер
    // Данные доступны в переменных: REGISTER_ROLE, REGISTER_NAME, REGISTER_EMAIL, REGISTER_PASSWORD
    
    if (!selectedRole || !name || !email || !password) {
      showError('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    showSuccess('Успешно', `Регистрация выполнена для ${email} как ${ROLES.find(r => r.value === selectedRole)?.label}`);
    // router.replace('/(tabs)'); // Переход на главный экран после регистрации
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleRoleSelect = (roleValue) => {
    setSelectedRole(roleValue);
    closeDropdown();
  };

  const openDropdown = () => {
    dropdownHeight.value = withTiming(140, { duration: 300 });
    dropdownOpacity.value = withTiming(1, { duration: 300 });
    dropdownPadding.value = withTiming(23, { duration: 300 });
  };

  const closeDropdown = () => {
    dropdownHeight.value = withTiming(0, { duration: 300 });
    dropdownOpacity.value = withTiming(0, { duration: 300 });
    dropdownPadding.value = withTiming(0, { duration: 300 });
  };

  const toggleDropdown = () => {
    if (dropdownHeight.value === 0) {
      openDropdown();
    } else {
      closeDropdown();
    }
  };

  const animatedDropdownStyle = useAnimatedStyle(() => {
    return {
      height: dropdownHeight.value,
      opacity: dropdownOpacity.value,
      paddingTop: dropdownPadding.value,
      paddingBottom: dropdownPadding.value,
    };
  });

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
          {/* Заголовок РЕГИСТРАЦИЯ */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>РЕГИСТРАЦИЯ</Text>
          </View>

          {/* Форма */}
          <View style={styles.form}>
            {/* Поле выбора роли */}
            <View style={styles.roleSectionContainer}>
              <TouchableOpacity style={styles.roleDropdown} onPress={toggleDropdown}>
                <Text style={styles.roleDropdownText}>
                  {selectedRole ? ROLES.find(r => r.value === selectedRole)?.label : 'РОЛЬ'}
                </Text>
                <ChevronDown size={20} color="#666666" />
              </TouchableOpacity>
              
              {/* Кнопки выбора роли */}
              <Animated.View style={[styles.roleButtonsContainer, animatedDropdownStyle]}>
                <View style={styles.roleButtonsRow}>
                  <TouchableOpacity 
                    style={[
                      styles.roleButton, 
                      styles.roleButtonHalf,
                      selectedRole === 'client' && styles.roleButtonSelected
                    ]}
                    onPress={() => handleRoleSelect('client')}
                  >
                    <Text style={[
                      styles.roleButtonText,
                      selectedRole === 'client' && styles.roleButtonTextSelected
                    ]}>
                      Клиент
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.roleButton, 
                      styles.roleButtonHalf,
                      selectedRole === 'master' && styles.roleButtonSelected
                    ]}
                    onPress={() => handleRoleSelect('master')}
                  >
                    <Text style={[
                      styles.roleButtonText,
                      selectedRole === 'master' && styles.roleButtonTextSelected
                    ]}>
                      Исполнитель
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={[
                    styles.roleButton, 
                    styles.roleButtonFull,
                    selectedRole === 'marketing_partner' && styles.roleButtonSelected
                  ]}
                  onPress={() => handleRoleSelect('marketing_partner')}
                >
                  <Text style={[
                    styles.roleButtonText,
                    selectedRole === 'marketing_partner' && styles.roleButtonTextSelected
                  ]}>
                    Партнер по маркетингу
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Поле Имя Фамилия */}
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              placeholder="ИМЯ ФАМИЛИЯ"
              placeholderTextColor="#666666"
              value={name}
              onChangeText={setName}
            />

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
                onPress={handleRegister}
                variant="primary"
              />
            </View>

            {/* Ссылка на вход */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={handleLogin} style={styles.linkButtonCenter}>
                <Text style={styles.linkText}>ВХОД</Text>
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
  roleSection: {
    marginBottom: 20,
  },
  roleDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 18,
    backgroundColor: '#131313',
    marginBottom: 15,
  },
  roleDropdownText: {
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
  },
  roleSectionContainer: {
    marginBottom: 20,
  },
  roleDropdown: {
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    backgroundColor: '#131313',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 18,
    zIndex: 10,
  },
  roleDropdownText: {
    color: '#666666',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
  },
  roleButtonsContainer: {
    borderWidth: 1,
    borderColor: '#444444',
    borderTopWidth: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#131313',
    paddingHorizontal: 25,
    gap: 15,
    overflow: 'hidden',
    marginTop: -10,
  },
  roleButtonsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  roleButton: {
    borderWidth: 1,
    borderColor: '#666666',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleButtonHalf: {
    flex: 1,
  },
  roleButtonFull: {
    width: '100%',
  },
  roleButtonSelected: {
    borderColor: '#0088FF',
    backgroundColor: '#0088FF20',
  },
  roleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
  roleButtonTextSelected: {
    color: '#0088FF',
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
    width: '100%',
    alignItems: 'center',
  },
  linkButtonCenter: {
    alignItems: 'center',
  },
  linkText: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
});