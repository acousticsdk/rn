import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ImageBackground
} from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification';
import { useNotification } from '@/hooks/useNotification';

// Глобальные переменные для интеграции с бекендом
let SECURITY_PASSWORD = '';
let SECURITY_EMAIL = '';
let SECURITY_PHONE = '';

export default function SecurityScreen() {
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
  
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    // Обновляем глобальные переменные
    SECURITY_PASSWORD = password;
    SECURITY_EMAIL = email;
    SECURITY_PHONE = phone;
    
    // TODO: Здесь будет отправка данных на сервер
    // Данные доступны в переменных: SECURITY_PASSWORD, SECURITY_EMAIL, SECURITY_PHONE
    
    showSuccess('Успешно', 'Настройки безопасности сохранены');
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const handlePasswordChange = () => {
    if (!newPassword || !confirmPassword) {
      showError('Ошибка', 'Заполните все поля');
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('Ошибка', 'Пароли не совпадают');
      return;
    }
    setPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(false);
    showSuccess('Успешно', 'Пароль изменен');
  };

  const handleEmailChange = () => {
    if (!newEmail) {
      showError('Ошибка', 'Введите новый email');
      return;
    }
    setEmail(newEmail);
    setNewEmail('');
    setShowEmailModal(false);
    showSuccess('Успешно', 'Email изменен');
  };

  const handlePhoneChange = () => {
    if (!newPhone) {
      showError('Ошибка', 'Введите новый номер телефона');
      return;
    }
    setPhone(newPhone);
    setNewPhone('');
    setShowPhoneModal(false);
    showSuccess('Успешно', 'Номер телефона изменен');
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
      
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.titleWrapper}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ПРОФИЛЬ</Text>
            </View>
          </View>

          {/* Security Section */}
          <View style={styles.securityContainer}>
            <Text style={styles.securityTitle}>БЕЗОПАСНОСТЬ</Text>
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
                  onPress={() => setShowPasswordModal(true)}
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
                  onPress={() => setShowEmailModal(true)}
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
                  onPress={() => setShowPhoneModal(true)}
                >
                  <Text style={styles.changeButtonText}>Изменить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <View style={styles.confirmButtonContainer}>
            <Button 
              title="ПОДТВЕРДИТЬ" 
              onPress={handleConfirm}
              variant="primary"
            />
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Password Change Modal */}
        <Modal
          visible={showPasswordModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPasswordModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Изменить пароль</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Новый пароль"
                placeholderTextColor="#666666"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              
              <TextInput
                style={styles.modalInput}
                placeholder="Подтвердить пароль"
                placeholderTextColor="#666666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalCancelButton}
                  onPress={() => setShowPasswordModal(false)}
                >
                  <Text style={styles.modalCancelText}>Отмена</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalConfirmButton}
                  onPress={handlePasswordChange}
                >
                  <Text style={styles.modalConfirmText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Email Change Modal */}
        <Modal
          visible={showEmailModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowEmailModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Изменить email</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Новый email"
                placeholderTextColor="#666666"
                value={newEmail}
                onChangeText={setNewEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalCancelButton}
                  onPress={() => setShowEmailModal(false)}
                >
                  <Text style={styles.modalCancelText}>Отмена</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalConfirmButton}
                  onPress={handleEmailChange}
                >
                  <Text style={styles.modalConfirmText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Phone Change Modal */}
        <Modal
          visible={showPhoneModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPhoneModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Изменить номер телефона</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Новый номер телефона"
                placeholderTextColor="#666666"
                value={newPhone}
                onChangeText={setNewPhone}
                keyboardType="phone-pad"
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalCancelButton}
                  onPress={() => setShowPhoneModal(false)}
                >
                  <Text style={styles.modalCancelText}>Отмена</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.modalConfirmButton}
                  onPress={handlePhoneChange}
                >
                  <Text style={styles.modalConfirmText}>Сохранить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
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
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 70,
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
    paddingHorizontal: 24,
  },
  securityTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  fieldsContainer: {
    paddingHorizontal: 24,
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
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: '#131313',
    fontFamily: 'Codec-Pro-News',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#0066FF',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
});