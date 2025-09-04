import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Modal,
  FlatList,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming
} from 'react-native-reanimated';

// Глобальные переменные для интеграции с бекендом
let PERSONAL_INFO_NAME = '';
let PERSONAL_INFO_DESCRIPTION = '';
let PERSONAL_INFO_SPECIALIZATION = '';
let PERSONAL_INFO_BIRTH_DATE = '';
let PERSONAL_INFO_COUNTRY = '';
let PERSONAL_INFO_WORK_ACCOUNT = '';
let PERSONAL_INFO_WEBSITE = '';
let PERSONAL_INFO_AVATAR_URI = '';
let PERSONAL_INFO_AVATAR_FILE = null; // Для веб-версии (File объект)
let PERSONAL_INFO_AVATAR_BASE64 = ''; // Для мобильной версии

const COUNTRIES = [
  { label: 'Ukraine', value: 'ukraine' },
  { label: 'Russia', value: 'russia' },
  { label: 'Belarus', value: 'belarus' },
  { label: 'Kazakhstan', value: 'kazakhstan' },
  { label: 'Poland', value: 'poland' },
  { label: 'Germany', value: 'germany' },
  { label: 'USA', value: 'usa' },
  { label: 'Canada', value: 'canada' },
];

export default function PersonalInfoScreen() {
  const [name, setName] = useState('Artem Astah');
  const [description, setDescription] = useState('Курю бамбук и делаю дизайн');
  const [specialization, setSpecialization] = useState('Дизайнер');
  const [birthDate, setBirthDate] = useState('13/05/2009');
  const [country, setCountry] = useState('ukraine');
  const [workAccount, setWorkAccount] = useState('@yapidor');
  const [website, setWebsite] = useState('www.pidor.com');
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [avatarUri, setAvatarUri] = useState('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400');

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Обновляем глобальные переменные
    PERSONAL_INFO_NAME = name;
    PERSONAL_INFO_DESCRIPTION = description;
    PERSONAL_INFO_SPECIALIZATION = specialization;
    PERSONAL_INFO_BIRTH_DATE = birthDate;
    PERSONAL_INFO_COUNTRY = country;
    PERSONAL_INFO_WORK_ACCOUNT = workAccount;
    PERSONAL_INFO_WEBSITE = website;
    PERSONAL_INFO_AVATAR_URI = avatarUri;
    
    // TODO: Здесь будет отправка данных на сервер
    // Данные доступны в переменных:
    // - PERSONAL_INFO_AVATAR_URI (путь к изображению)
    // - PERSONAL_INFO_AVATAR_FILE (File объект для веба)
    // - PERSONAL_INFO_AVATAR_BASE64 (base64 для мобильных)
    
    // Пример отправки:
    // const formData = new FormData();
    // formData.append('name', PERSONAL_INFO_NAME);
    // formData.append('avatar', PERSONAL_INFO_AVATAR_FILE || PERSONAL_INFO_AVATAR_BASE64);
    // fetch('/api/profile', { method: 'POST', body: formData });
    
    // Переход назад
    router.back();
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry.value);
    setShowCountryModal(false);
  };

  const handleAvatarPress = async () => {
    if (Platform.OS === 'web') {
      // Веб версия - используем HTML input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          // Сохраняем File объект для отправки на сервер
          PERSONAL_INFO_AVATAR_FILE = file;
          
          const reader = new FileReader();
          reader.onload = (e) => {
            setAvatarUri(e.target.result);
            PERSONAL_INFO_AVATAR_BASE64 = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Мобильная версия - используем expo-image-picker
      const ImagePicker = await import('expo-image-picker');
      
      try {
        // Запрашиваем разрешение на доступ к медиатеке
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          return;
        }

        // Показываем выбор галерея/камера
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions?.Images || 'Images',
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
          base64: true, // Получаем base64 для отправки на сервер
        });

        if (!result.canceled && result.assets[0]) {
          setAvatarUri(result.assets[0].uri);
          // Сохраняем base64 для отправки на сервер
          if (result.assets[0].base64) {
            PERSONAL_INFO_AVATAR_BASE64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
          }
        }
      } catch (error) {
        console.log('Ошибка при выборе аватара:', error);
      }
    }
  };

  const getCountryLabel = () => {
    const selectedCountry = COUNTRIES.find(c => c.value === country);
    return selectedCountry ? selectedCountry.label : 'Выберите страну';
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://alfacta.online/100k/main-bg.png' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          {/* Title Container - по центру */}
          <View style={styles.titleWrapper}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ПРОФИЛЬ</Text>
            </View>
          </View>

          {/* Profile Avatar */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.avatar} onPress={handleAvatarPress}>
              <Image
                source={{ uri: avatarUri }}
                style={styles.avatarImage}
              />
              <View style={styles.avatarOverlay}>
                <Text style={styles.avatarOverlayText}>Изменить</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Page Title */}
          <Text style={styles.pageTitle}>Личная Информация</Text>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Имя и Фамилия */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Имя и Фамилия</Text>
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Введите имя и фамилию"
                placeholderTextColor="#666666"
              />
            </View>

            {/* Описание */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Описание</Text>
              <TextInput
                style={styles.textInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Расскажите о себе"
                placeholderTextColor="#666666"
              />
            </View>

            {/* Специализация */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Специализация</Text>
              <TextInput
                style={styles.textInput}
                value={specialization}
                onChangeText={setSpecialization}
                placeholder="Ваша специализация"
                placeholderTextColor="#666666"
              />
            </View>

            {/* Дата рождения */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Дата рождения</Text>
              <TextInput
                style={styles.textInput}
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="ДД/ММ/ГГГГ"
                placeholderTextColor="#666666"
              />
            </View>

            {/* Страна проживания */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Страна проживания</Text>
              <TouchableOpacity 
                style={styles.selectInput}
                onPress={() => setShowCountryModal(true)}
              >
                <Text style={styles.selectInputText}>{getCountryLabel()}</Text>
                <ChevronDown size={20} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Основной рабочий аккаунт */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Основной рабочий аккаунт</Text>
              <TextInput
                style={styles.textInput}
                value={workAccount}
                onChangeText={setWorkAccount}
                placeholder="@username"
                placeholderTextColor="#666666"
              />
            </View>

            {/* Сайт */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Сайт</Text>
              <TextInput
                style={styles.textInput}
                value={website}
                onChangeText={setWebsite}
                placeholder="www.example.com"
                placeholderTextColor="#666666"
              />
            </View>
          </View>

          {/* Кнопка Сохранить */}
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>СОХРАНИТЬ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Country Selection Modal */}
        <Modal
          visible={showCountryModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowCountryModal(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            onPress={() => setShowCountryModal(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Выберите страну</Text>
              <FlatList
                data={COUNTRIES}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleCountrySelect(item)}
                  >
                    <Text style={styles.modalItemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
    </View>
         </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#666666',
    padding: 8,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 92,
    resizeMode: 'cover',
  },
  avatarOverlay: {
    position: 'absolute',
    bottom: 7,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    paddingHorizontal: 24,
    gap: 0,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: '#787878',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 8,
    marginLeft: 0,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 18,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: '#131313',
    fontFamily: 'Codec-Pro-News',
  },
  selectInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 18,
    backgroundColor: '#131313',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectInputText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    flex: 1,
  },
  saveButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: '#0066FF',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
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
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
  },
});