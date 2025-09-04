import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { Minus, Plus } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import CaseDetailModal from '@/components/CaseDetailModal';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let PORTFOLIO_CASES = [];

// Моковые данные кейсов
const MOCK_CASES = [
  {
    id: 1,
    title: 'БАННЕРА',
    subtitle: 'ОБЛОЖКИ',
    description: 'для рилс',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    canDelete: true
  },
  {
    id: 2,
    title: 'БАННЕРА',
    subtitle: 'ОБЛОЖКИ',
    description: 'для рилс',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
    canDelete: true
  },
  {
    id: 3,
    title: 'БАННЕРА',
    subtitle: 'ОБЛОЖКИ',
    description: 'для рилс',
    image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400',
    canDelete: true
  },
  {
    id: 4,
    title: 'БАННЕРА',
    subtitle: 'ОБЛОЖКИ',
    description: 'для рилс',
    image: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=400',
    canDelete: true
  },
  {
    id: 5,
    title: 'БАННЕРА',
    subtitle: 'ОБЛОЖКИ',
    description: 'для рилс',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=400',
    canDelete: true
  },
  {
    id: 6,
    title: 'БАННЕРА',
    subtitle: 'ОБЛОЖКИ',
    description: 'для рилс',
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
    canDelete: true
  },
  {
    id: 7,
    title: 'БАННЕРА',
    subtitle: 'ОБЛОЖКИ',
    description: 'для рилс',
    image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=400',
    canDelete: true
  }
];

export default function PortfolioScreen() {
  const [cases, setCases] = useState(MOCK_CASES);
  const [selectedCase, setSelectedCase] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteCase = (caseId) => {
    setCases(prevCases => prevCases.filter(c => c.id !== caseId));
    // Обновляем глобальную переменную
    PORTFOLIO_CASES = cases.filter(c => c.id !== caseId);
  };

  const handleAddCase = async () => {
    router.push('/(profile)/add-case');
  };

  const handleCasePress = (caseItem) => {
    setSelectedCase(caseItem);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCase(null);
  };

  const handleConfirm = () => {
    // Обновляем глобальную переменную
    PORTFOLIO_CASES = cases;
    
    // TODO: Здесь будет отправка данных на сервер
    // Данные доступны в переменной: PORTFOLIO_CASES
    
    router.back();
  };

  const renderCaseItem = (caseItem, index) => {
    const isLastRow = index >= cases.length - (cases.length % 2 === 0 ? 2 : 1);

    return (
      <TouchableOpacity 
        key={caseItem.id} 
        style={[
          styles.caseItem,
          isLastRow && styles.caseItemLastRow
        ]}
        onPress={() => handleCasePress(caseItem)}
      >
        <Image
          source={{ uri: caseItem.image }}
          style={styles.caseImage}
        />
        <View style={styles.caseOverlay}>
          <View style={styles.caseContent}>
            <Text style={styles.caseTitle}>{caseItem.title}</Text>
            <Text style={styles.caseSubtitle}>{caseItem.subtitle}</Text>
            <Text style={styles.caseDescription}>{caseItem.description}</Text>
          </View>
          {caseItem.canDelete && (
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => handleDeleteCase(caseItem.id)}
            >
              <Minus size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderAddButton = () => {
    return (
      <TouchableOpacity 
        key="add-button"
        style={[styles.caseItem, styles.addCaseItem]}
        onPress={handleAddCase}
      >
        <View style={styles.addCaseContent}>
          <Plus size={40} color="#666666" />
        </View>
      </TouchableOpacity>
    );
  };

  const renderGrid = () => {
    const items = [...cases];
    const rows = [];
    
    for (let i = 0; i < items.length; i += 3) {      
      rows.push(
        <View key={i} style={styles.caseRow}>
          {items[i] && renderCaseItem(items[i], i)}
          {items[i + 1] && renderCaseItem(items[i + 1], i + 1)}
          {items[i + 2] && renderCaseItem(items[i + 2], i + 2)}
        </View>
      );
    }
    
    // Добавляем кнопку "+" в последний ряд или создаем новый ряд
    const remainingSlotsInLastRow = cases.length % 3;
    const lastRowHasSpace = remainingSlotsInLastRow !== 0;
    
    if (lastRowHasSpace) {
      // Добавляем кнопку "+" в последний ряд
      const lastRowIndex = rows.length - 1;
      const startIndex = Math.floor(cases.length / 3) * 3;
      
      rows[lastRowIndex] = (
        <View key={startIndex} style={styles.caseRow}>
          {cases[startIndex] && renderCaseItem(cases[startIndex], startIndex)}
          {cases[startIndex + 1] && renderCaseItem(cases[startIndex + 1], startIndex + 1)}
          {cases[startIndex + 2] && renderCaseItem(cases[startIndex + 2], startIndex + 2)}
          {remainingSlotsInLastRow === 1 && renderAddButton()}
          {remainingSlotsInLastRow === 2 && renderAddButton()}
        </View>
      );
    } else {
      // Создаем новый ряд
      rows.push(
        <View key={cases.length} style={styles.caseRow}>
          {renderAddButton()}
        </View>
      );
    }
    
    return rows;
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

          {/* Profile Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.avatarImage}
              />
            </View>
          </View>

          {/* Page Title */}
          <Text style={styles.pageTitle}>Портфолио/Кейсы</Text>

          {/* Cases Section */}
          <View style={styles.casesContainer}>
            <View style={styles.casesHeader}>
              <Text style={styles.casesTitle}>КЕЙСЫ</Text>
              <Text style={styles.casesCount}>{cases.length}/30 КЕЙСОВ</Text>
            </View>

            {/* Cases Grid */}
            <View style={styles.casesGrid}>
              {renderGrid()}
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

        {/* Case Detail Modal */}
        <CaseDetailModal
          visible={modalVisible}
          onClose={handleCloseModal}
          caseData={selectedCase}
        />
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
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 92,
    resizeMode: 'cover',
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  casesContainer: {
    paddingHorizontal: 24,
  },
  casesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  casesTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  casesCount: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
  casesGrid: {
    gap: 16,
  },
  caseRow: {
    flexDirection: 'row',
    gap: 12,
  },
  caseItem: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  caseItemLastRow: {
    marginBottom: 0,
  },
  caseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  caseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    padding: 12,
  },
  caseContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  caseTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 2,
  },
  caseSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 4,
  },
  caseDescription: {
    color: '#CCCCCC',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCaseItem: {
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#333333',
    borderStyle: 'dashed',
  },
  addCaseContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});