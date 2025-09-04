import { useEffect, useState, useCallback } from 'react';
import { Image, Platform, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IMAGES } from '@/config/images';

export default function ImagePreloader() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  const updateProgress = useCallback((count, total) => {
    setLoadedCount(count);
    setLoadingProgress((count / total) * 100);
  }, []);

  const completeLoading = useCallback(() => {
    setImagesLoaded(true);
    global.imagesPreloaded = true;
    global.preloadInProgress = false;
  }, []);

  useEffect(() => {
    // Проверяем, не запущен ли уже прелоад
    if (global.preloadInProgress || global.imagesPreloaded) {
      setImagesLoaded(true);
      return;
    }
    
    global.preloadInProgress = true;

    const images = Object.values(IMAGES);

    let completedCount = 0;
    const totalImages = images.length;

    const loadImage = async (imageUrl, index) => {
      try {
        if (Platform.OS !== 'web') {
          await Image.prefetch(imageUrl);
          await Image.getSize(imageUrl);
        } else {
          await new Promise((resolve, reject) => {
            const img = new window.Image();
            
            img.onload = () => {
              resolve();
            };
            
            img.onerror = (error) => {
              resolve(); // Продолжаем даже при ошибке
            };

            img.src = imageUrl;
          });
        }

        completedCount++;
        
        // Обновляем прогресс в основном потоке
        setTimeout(() => {
          updateProgress(completedCount, totalImages);
        }, 0);

        if (completedCount === totalImages) {
          setTimeout(() => {
            completeLoading();
          }, 100);
        }

      } catch (error) {
        completedCount++;
        
        setTimeout(() => {
          updateProgress(completedCount, totalImages);
        }, 0);

        if (completedCount === totalImages) {
          setTimeout(() => {
            completeLoading();
          }, 100);
        }
      }
    };

    // Загружаем все изображения параллельно
    images.forEach((image, index) => {
      loadImage(image, index);
    });

  }, [updateProgress, completeLoading]);

  // Показываем экран загрузки пока изображения не загружены
  if (!imagesLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#070707', '#0a0a0a']}
          style={styles.loadingGradient}
        >
          <Text style={styles.loadingTitle}>ЗАГРУЗКА</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${loadingProgress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {loadedCount}/6 изображений ({Math.round(loadingProgress)}%)
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
    marginBottom: 40,
  },
  progressContainer: {
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0088FF',
    borderRadius: 2,
  },
  progressText: {
    color: '#787878',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
});