import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Button from '@/components/ui/Button';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let EDUCATION_COMPLETED_LESSONS = [];
let EDUCATION_CURRENT_LESSON = 1;

// Данные уроков
const LESSONS = [
  {
    id: 1,
    title: 'Урок 1',
    subtitle: 'Основы продаж',
    isUnlocked: true,
    backgroundImage: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Урок 2',
    subtitle: 'Работа с клиентами',
    isUnlocked: false,
    backgroundImage: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Урок 3',
    subtitle: 'Продвинутые техники',
    isUnlocked: false,
    backgroundImage: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Урок 4',
    subtitle: 'Масштабирование',
    isUnlocked: false,
    backgroundImage: 'https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function EducationScreen() {
  const [lessons] = useState(LESSONS);

  const handleBack = () => {
    router.back();
  };

  const handleWatchLesson = (lessonId) => {
    // Обновляем глобальные переменные
    EDUCATION_CURRENT_LESSON = lessonId;
    
    // TODO: Здесь будет логика открытия урока
    // Данные доступны в переменных:
    // - EDUCATION_CURRENT_LESSON
    // - EDUCATION_COMPLETED_LESSONS
    
    console.log(`Открываем урок ${lessonId}`);
  };

  const handleLockedLesson = () => {
    // TODO: Показать сообщение о том, что урок заблокирован
    console.log('Урок заблокирован');
  };

  const renderLesson = (lesson, index) => {
    if (lesson.isUnlocked) {
      return (
        <View key={lesson.id} style={styles.lessonContainer}>
          <ImageBackground
            source={{ uri: lesson.backgroundImage }}
            style={styles.lessonBackground}
            imageStyle={styles.lessonBackgroundImage}
          >
            <View style={styles.lessonOverlay}>
              <View style={styles.lessonContent}>
                <View style={styles.lessonFooter}>
                  <View style={styles.lessonTextContainer}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.watchButton}
                    onPress={() => handleWatchLesson(lesson.id)}
                  >
                    <LinearGradient
                      colors={['#0066FF', '#0088FF']}
                      style={styles.watchButtonGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.watchButtonText}>Смотреть</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }

    return (
      <TouchableOpacity 
        key={lesson.id} 
        style={styles.lessonContainer}
        onPress={handleLockedLesson}
      >
        <ImageBackground
          source={{ uri: lesson.backgroundImage }}
          style={styles.lessonBackground}
          imageStyle={styles.lessonBackgroundImage}
        >
          <BlurView intensity={20} style={styles.lockedLessonBlur}>
            <View style={styles.lockedLessonOverlay}>
              <View style={styles.lockIconContainer}>
                <Lock size={40} color="#FF4444" />
              </View>
              
              <Text style={styles.lockedTitle}>ЗАБЛОКИРОВАНО</Text>
              <Text style={styles.lockedSubtitle}>
                Для того чтобы открыть новый{'\n'}урок, посмотрите предыдущий
              </Text>
            </View>
          </BlurView>
        </ImageBackground>
      </TouchableOpacity>
    );
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
          <View style={styles.titleWrapper}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>ПРОФИЛЬ</Text>
            </View>
          </View>

          {/* Education Title */}
          <View style={styles.educationTitleContainer}>
            <Text style={styles.educationTitle}>РЕФЕРАЛЬНАЯ СИСТЕМА</Text>
          </View>

          {/* Lessons */}
          <View style={styles.lessonsContainer}>
            {lessons.map((lesson, index) => renderLesson(lesson, index))}
          </View>

          {/* Close Button */}
          <View style={styles.closeButtonContainer}>
            <Button 
              title="ЗАКРЫТЬ" 
              onPress={handleBack}
              variant="primary"
            />
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
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
  educationTitleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  educationTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  lessonsContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  lessonContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  lessonBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  lessonBackgroundImage: {
    borderRadius: 20,
  },
  lessonOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 24,
    justifyContent: 'space-between',
  },
  lessonContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 4,
  },
  lessonSubtitle: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: 'Codec-Pro-News',
  },
  watchButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  watchButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  watchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  lockedLessonBlur: {
    flex: 1,
  },
  lockedLessonOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 40,
  },
  lockIconContainer: {
    marginBottom: 20,
  },
  lockedTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  lockedSubtitle: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    textAlign: 'center',
    lineHeight: 22,
  },
  closeButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 70,
  },
});