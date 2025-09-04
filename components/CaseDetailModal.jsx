import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { ChevronUp, ChevronDown } from 'lucide-react-native';
import Button from '@/components/ui/Button';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CaseDetailModal({ visible, onClose, caseData }) {
  if (!caseData) return null;

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
          {/* Main Cover */}
          <View style={styles.coverContainer}>
            <Image
              source={{ uri: caseData.image }}
              style={styles.coverImage}
            />
            <View style={styles.coverOverlay}>
              <Text style={styles.coverTitle}>{caseData.title}</Text>
            </View>
          </View>

          {/* Case Title */}
          <View style={styles.caseTitleContainer}>
            <Text style={styles.caseTitle}>КЕЙС 100KLAB</Text>
          </View>

          {/* Description Section */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionLabel}>Описание</Text>
            <Text style={styles.descriptionText}>
              100K LAB — это продюсерский центр digital-агентств. Мы берём сильные команды, масштабируем их до 6-7 знаков в месяц через упаковку, кейсы, продуктовую математику и автогенерацию входящих заявок.
            </Text>
          </View>

          {/* Additional Info */}
          <View style={styles.additionalInfoSection}>
            <Text style={styles.additionalInfoText}>
              БЫЛО РАЗРАБОТАНО ЧТО ТО АВПЮЯДЛУВ ВІДДЛАОВІВ А АОВЛА А ВЫДАРОВДВА ВІДДЛАРЫ АВЫОДЛРА
            </Text>
          </View>

          {/* Additional Images */}
          <View style={styles.additionalImagesSection}>
            {/* First Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.additionalImage}
              />
            </View>

            {/* Second Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.additionalImage}
              />
            </View>

            {/* Third Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.additionalImage}
              />
            </View>

            {/* Fourth Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.additionalImage}
              />
            </View>

            {/* Fifth Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.additionalImage}
              />
            </View>
          </View>

          {/* Close Button */}
          <View style={styles.closeButtonContainer}>
            <Button 
              title="ЗАКРЫТЬ" 
              onPress={onClose}
              variant="primary"
            />
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
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
  coverContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    position: 'relative',
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  caseTitleContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  caseTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 15,
  },
  descriptionText: {
    color: '#CCCCCC',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    lineHeight: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  additionalInfoSection: {
    marginBottom: 30,
  },
  additionalInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
    lineHeight: 20,
    textAlign: 'left',
  },
  additionalImagesSection: {
    gap: 20,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    height: 250,
  },
  additionalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageNavigation: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  bottomSpacing: {
    height: 20,
  },
  closeButtonContainer: {
    paddingHorizontal: 0,
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
  },
});