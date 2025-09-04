import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import { Shield, Mail, Phone } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Button from '@/components/ui/Button';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming
} from 'react-native-reanimated';

// Глобальные переменные для интеграции с бекендом
let SECURITY_PASSWORD = '';
let SECURITY_EMAIL = '';
let SECURITY_PHONE = '';

export default function SecurityModal({ visible, onClose }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('YanacLene@gmail.com');
  const [phone, setPhone] = useState('+48690142974');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const confirmButtonOpacity = useSharedValue(1);

  const animatedConfirmButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: confirmButtonOpacity.value,
    };
  });
  const handleConfirm = () => {
    // Обновляем глобальные переменные
    SECURITY_PASSWORD = password;
    SECURITY_EMAIL = email;
    SECURITY_PHONE = phone;
    
    // TODO: Здесь будет отправка данных на сервер
    // Данные доступны в переменных: SECURITY_PASSWORD, SECURITY_EMAIL, SECURITY_PHONE
    
    onClose();
  };

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError('Заполните все поля');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Пароли не совпадают');
      return;
    }
    setPasswordError('');
    setPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(false);
    confirmButtonOpacity.value = withTiming(1, { duration: 300 });
  };

  const handleEmailChange = () => {
    if (!newEmail) {
      setEmailError('Введите новый email');
      return;
    }
    setEmailError('');
    setEmail(newEmail);
    setNewEmail('');
    setShowEmailModal(false);
    confirmButtonOpacity.value = withTiming(1, { duration: 300 });
  };

  const handlePhoneChange = () => {
    if (!newPhone) {
      setPhoneError('Введите новый номер телефона');
      return;
    }
    setPhoneError('');
    setPhone(newPhone);
    setNewPhone('');
    setShowPhoneModal(false);
    confirmButtonOpacity.value = withTiming(1, { duration: 300 });
  };

  const openPasswordModal = () => {
    setShowPasswordModal(true);
    confirmButtonOpacity.value = withTiming(0, { duration: 300 });
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
    confirmButtonOpacity.value = withTiming(0, { duration: 300 });
  };

  const openPhoneModal = () => {
    setShowPhoneModal(true);
    confirmButtonOpacity.value = withTiming(0, { duration: 300 });
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    confirmButtonOpacity.value = withTiming(1, { duration: 300 });
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    confirmButtonOpacity.value = withTiming(1, { duration: 300 });
  };

  const closePhoneModal = () => {
    setShowPhoneModal(false);
    confirmButtonOpacity.value = withTiming(1, { duration: 300 });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.handleBar} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Security Section */}
          <View style={styles.securityContainer}>
            <View style={styles.securityTitleContainer}>
              <Text style={styles.securityTitle}>БЕЗОПАСНОСТЬ</Text>
            </View>
          </View>

          {/* Security Fields */}
          <View style={styles.fieldsContainer}>
            {/* Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Пароль</Text>
              <View style={styles.fieldRow}>
                <View style={styles.fieldValue}>
                  <Text style={styles.fieldValueText}>******************</Text>
                </View>
                <TouchableOpacity 
                  style={styles.changeButton}
                  onPress={openPasswordModal}
                >
                  <Text style={styles.changeButtonText}>Изменить</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Почта</Text>
              <View style={styles.fieldRow}>
                <View style={styles.fieldValue}>
                  <Text style={styles.fieldValueText}>{email}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.changeButton}
                  onPress={openEmailModal}
                >
                  <Text style={styles.changeButtonText}>Изменить</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Phone Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Номер телефона</Text>
              <View style={styles.fieldRow}>
                <View style={styles.fieldValue}>
                  <Text style={styles.fieldValueText}>{phone}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.changeButton}
                  onPress={openPhoneModal}
                >
                  <Text style={styles.changeButtonText}>Изменить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.bottomSpacing} />

          {/* Confirm Button - Inside ScrollView for mobile */}
          <Animated.View style={[styles.confirmButtonInScroll, animatedConfirmButtonStyle]}>
            <Button 
              title="ПОДТВЕРДИТЬ" 
              onPress={handleConfirm}
              variant="primary"
            />
          </Animated.View>

          <View style={styles.extraBottomSpacing} />
        </ScrollView>

        {/* Password Change Modal */}
        <Modal
          visible={showPasswordModal}
          transparent={true}
          animationType="fade"
          onRequestClose={closePasswordModal}
        >
          <BlurView intensity={20} style={styles.blurOverlay}>
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={closePasswordModal}
            >
              <TouchableOpacity 
                style={styles.modalContent}
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.modalIconContainer}>
                  <Shield size={32} color="#FFFFFF" />
                </View>
                
                <Text style={styles.modalTitle}>Изменить пароль</Text>
                
                <View style={styles.modalFieldContainer}>
                  <Text style={styles.modalFieldLabel}>Нынешний пароль</Text>
                  <TextInput
                    style={[styles.modalInput, passwordError && styles.modalInputError]}
                    placeholder="chtopochop333"
                    placeholderTextColor="#666666"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                  />
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>
                
                <View style={styles.modalFieldContainer}>
                  <Text style={styles.modalFieldLabel}>Новый пароль</Text>
                  <TextInput
                    style={[styles.modalInput, passwordError && styles.modalInputError]}
                    placeholder="chtopochop123"
                    placeholderTextColor="#666666"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
                
                <Button 
                  title="ПОДТВЕРДИТЬ" 
                  onPress={handlePasswordChange}
                  variant="primary"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </BlurView>
        </Modal>

        {/* Email Change Modal */}
        <Modal
          visible={showEmailModal}
          transparent={true}
          animationType="fade"
          onRequestClose={closeEmailModal}
        >
          <BlurView intensity={20} style={styles.blurOverlay}>
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={closeEmailModal}
            >
              <TouchableOpacity 
                style={styles.modalContent}
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.modalIconContainer}>
                  <Mail size={32} color="#FFFFFF" />
                </View>
                
                <Text style={styles.modalTitle}>Изменить почту</Text>
                
                <View style={styles.modalFieldContainer}>
                  <Text style={styles.modalFieldLabel}>Новая почта</Text>
                  <TextInput
                    style={[styles.modalInput, emailError && styles.modalInputError]}
                    placeholder="chtopochop333@gmail.com"
                    placeholderTextColor="#666666"
                    value={newEmail}
                    onChangeText={setNewEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>
                
                <View style={styles.modalFieldContainer}>
                  <Text style={styles.modalFieldLabel}>Код</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="123456"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                  />
                </View>
                
                <Button 
                  title="ПОДТВЕРДИТЬ" 
                  onPress={handleEmailChange}
                  variant="primary"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </BlurView>
        </Modal>

        {/* Phone Change Modal */}
        <Modal
          visible={showPhoneModal}
          transparent={true}
          animationType="fade"
          onRequestClose={closePhoneModal}
        >
          <BlurView intensity={20} style={styles.blurOverlay}>
            <TouchableOpacity 
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={closePhoneModal}
            >
              <TouchableOpacity 
                style={styles.modalContent}
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.modalIconContainer}>
                  <Phone size={32} color="#FFFFFF" />
                </View>
                
                <Text style={styles.modalTitle}>Изменить номер тел.</Text>
                
                <View style={styles.modalFieldContainer}>
                  <Text style={styles.modalFieldLabel}>Новый номер тел.</Text>
                  <TextInput
                    style={[styles.modalInput, phoneError && styles.modalInputError]}
                    placeholder="+43248473287"
                    placeholderTextColor="#666666"
                    value={newPhone}
                    onChangeText={setNewPhone}
                    keyboardType="phone-pad"
                  />
                  {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                </View>
                
                <View style={styles.modalFieldContainer}>
                  <Text style={styles.modalFieldLabel}>Код</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="123456"
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                  />
                </View>
                
                <Button 
                  title="ПОДТВЕРДИТЬ" 
                  onPress={handlePhoneChange}
                  variant="primary"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </BlurView>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  securityContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  securityTitleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  securityTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  fieldsContainer: {
    gap: 30,
  },
  fieldContainer: {
    gap: 15,
  },
  fieldLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    backgroundColor: '#131313',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  fieldValue: {
    flex: 1,
  },
  fieldValueText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
  },
  changeButton: {
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
  confirmButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: '#070707',
  },
  confirmButtonInScroll: {
    paddingHorizontal: 0,
    paddingTop: 20,
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 20,
  },
  extraBottomSpacing: {
    height: 40,
  },
  blurOverlay: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#0F0F0F',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  modalFieldContainer: {
    marginBottom: 24,
  },
  modalFieldLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: '#1A1A1A',
    fontFamily: 'Codec-Pro-News',
  },
  modalInputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
    marginTop: 5,
  },
});