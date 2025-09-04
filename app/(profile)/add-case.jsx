import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import Button from '@/components/ui/Button';

// Глобальные переменные для интеграции с бекендом
let NEW_CASE_COVER_IMAGE = '';
let NEW_CASE_TITLE = '';
let NEW_CASE_NAME = '';
let NEW_CASE_DESCRIPTION = '';
let NEW_CASE_ADDITIONAL_IMAGES = [];

export default function AddCaseScreen() {
  const [coverImage, setCoverImage] = useState('');
  const [title, setTitle] = useState('БАННЕРА');
  const [name, setName] = useState('Artem Astah');
  const [description, setDescription] = useState('100K LAB — это продюсерский центр digital-агентств. Мы берём сильные команды, масштабируем их до 6-7 знаков в месяц через упаковку, кейсы, продуктовую математику и автогенерацию входящих заявок.');
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleBack = () => {
    router.back();
  };

  const handlePublish = () => {
    // Обновляем глобальные переменные
    NEW_CASE_COVER_IMAGE = coverImage;
    NEW_CASE_TITLE = title;
    NEW_CASE_NAME = name;
    NEW_CASE_DESCRIPTION = description;
    NEW_CASE_ADDITIONAL_IMAGES = additionalImages;
    
    // TODO: Здесь будет отправка данных на сервер
    // Данные доступны в переменных:
    // - NEW_CASE_COVER_IMAGE
    // - NEW_CASE_TITLE
    // - NEW_CASE_NAME
    // - NEW_CASE_DESCRIPTION
    // - NEW_CASE_ADDITIONAL_IMAGES
    
    router.back();
  };

  const handleSelectCoverImage = async () => {
    if (Platform.OS === 'web') {
      // Веб версия - используем HTML input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setCoverImage(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Мобильная версия - используем expo-image-picker
      try {
        const ImagePicker = await import('expo-image-picker');
        
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions?.Images || 'Images',
          allowsEditing: true,
          aspect: [16, 9],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          setCoverImage(result.assets[0].uri);
        }
      } catch (error) {
        console.log('Ошибка при выборе обложки:', error);
      }
    }
  };

  const handleAddAdditionalImage = async () => {
    if (Platform.OS === 'web') {
      // Веб версия - используем HTML input
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setAdditionalImages(prev => [...prev, e.target.result]);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Мобильная версия - используем expo-image-picker
      try {
        const ImagePicker = await import('expo-image-picker');
        
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions?.Images || 'Images',
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          setAdditionalImages(prev => [...prev, result.assets[0].uri]);
        }
      } catch (error) {
        console.log('Ошибка при добавлении изображения:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.titleWrapper}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>ПРОФИЛЬ</Text>
          </View>
        </View>

        {/* Add Case Section */}
        <View style={styles.addCaseContainer}>
          <Text style={styles.addCaseTitle}>ДОБАВИТЬ КЕЙС</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Cover Image Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Обложка</Text>
            <TouchableOpacity 
              style={styles.coverImageContainer}
              onPress={handleSelectCoverImage}
            >
              {coverImage ? (
                <Image source={{ uri: coverImage }} style={styles.coverImage} />
              ) : (
                <View style={styles.coverImagePlaceholder}>
                  <Plus size={40} color="#666666" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Title Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Название</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Введите название"
              placeholderTextColor="#666666"
            />
          </View>

          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Название</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Введите имя"
              placeholderTextColor="#666666"
            />
          </View>

          {/* Description Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Описание</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Введите описание"
              placeholderTextColor="#666666"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Additional Images Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Добавить изображение</Text>
            <View style={styles.additionalImagesContainer}>
              {additionalImages.map((image, index) => (
                <View key={index} style={styles.additionalImageItem}>
                  <Image source={{ uri: image }} style={styles.additionalImage} />
                </View>
              ))}
              <TouchableOpacity 
                style={styles.addImageButton}
                onPress={handleAddAdditionalImage}
              >
                <Plus size={40} color="#666666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Publish Button */}
        <View style={styles.publishButtonContainer}>
          <Button 
            title="ОПУБЛИКОВАТЬ" 
            onPress={handlePublish}
            variant="primary"
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
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
  addCaseContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  addCaseTitle: {
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
  formContainer: {
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 15,
  },
  coverImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#333333',
    borderStyle: 'dashed',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverImagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  coverBrand: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
    marginBottom: 10,
  },
  coverTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: '#131313',
    fontFamily: 'Codec-Pro-News',
  },
  textArea: {
    height: 120,
    paddingTop: 15,
  },
  additionalImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  additionalImageItem: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
  },
  additionalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#333333',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});