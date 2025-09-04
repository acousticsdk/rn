import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';
import { Search, Heart, Calendar, Video, Palette, Play, Zap, ChevronDown, ChevronUp, Star, MessageCircle, Camera, Code } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let MARKETPLACE_SEARCH_QUERY = '';
let MARKETPLACE_SELECTED_CATEGORY = '';
let MARKETPLACE_ACTIVE_TAB = 'top100k';

// Моковые данные пользователей
const MOCK_USERS = [
  {
    id: 1,
    name: 'Артем Асташ',
    specialization: 'Дизайнер',
    rating: 5.0,
    avatar: 'https://alfacta.online/100k/simple-ava-black.png'
  },
  {
    id: 2,
    name: 'Мария Козлова',
    specialization: 'Монтажер',
    rating: 5.0,
    avatar: 'https://alfacta.online/100k/simple-ava-black.png'
  },
  {
    id: 3,
    name: 'Дмитрий Петров',
    specialization: 'Сценарист',
    rating: 5.0,
    avatar: 'https://alfacta.online/100k/simple-ava-black.png'
  },
  {
    id: 4,
    name: 'Анна Сидорова',
    specialization: 'Съемщик',
    rating: 5.0,
    avatar: 'https://alfacta.online/100k/simple-ava-black.png'
  }
];

const CATEGORIES = [
  { id: 'scenario', title: 'Сценарий', icon: Calendar },
  { id: 'montage', title: 'Монтаж', icon: Video },
  { id: 'design', title: 'Дизайн', icon: Palette },
  { id: 'shooting', title: 'Съемка', icon: Play },
  { id: 'smm', title: 'SMM', icon: MessageCircle },
  { id: 'ads', title: 'Реклама', icon: Zap },
  { id: 'photo', title: 'Для Съемки', icon: Camera },
  { id: 'it', title: 'IT', icon: Code }
];

const TABS = [
  { id: 'top100k', title: 'ТОП 100К' },
  { id: 'online', title: 'В СЕТИ' },
  { id: 'reviews', title: 'ОТЗЫВЫ' },
  { id: 'rating', title: 'РЕЙТИНГ' }
];

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('top100k');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [top100kExpanded, setTop100kExpanded] = useState(true);
  const [ratingExpanded, setRatingExpanded] = useState(true);

  const handleSearch = (query) => {
    setSearchQuery(query);
    MARKETPLACE_SEARCH_QUERY = query;
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    MARKETPLACE_ACTIVE_TAB = tabId;
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    MARKETPLACE_SELECTED_CATEGORY = categoryId;
    setShowCategories(false);
  };

  const handleHireUser = (userId) => {
    // TODO: Логика найма пользователя
    router.push(`/(chat)/conversation/${userId}`);
  };

  const handleAITeamBuilder = () => {
    // TODO: Логика ИИ сбора команды
    console.log('ИИ сбор команды');
  };

  const renderUserCard = ({ item, index }) => {
    const isSecond = index === 1;
    
    return (
      <View style={[styles.userCard, isSecond && styles.userCardSecond]}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.userAvatar}
        />
        
        {/* Rating */}
        <View style={styles.userRating}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>

        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={20} color="#666666" />
        </TouchableOpacity>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          
          <View style={styles.userActions}>
            <View style={styles.specializationTag}>
              <Text style={styles.specializationText}>{item.specialization}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.hireButton}
              onPress={() => handleHireUser(item.id)}
            >
              <Text style={styles.hireButtonText}>Нанять</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderSection = (title, expanded, onToggle, data) => (
    <View style={styles.section}>
      <TouchableOpacity 
        style={styles.sectionHeader}
        onPress={onToggle}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        {expanded ? (
          <ChevronUp size={20} color="#FFFFFF" />
        ) : (
          <ChevronDown size={20} color="#FFFFFF" />
        )}
      </TouchableOpacity>
      
      {expanded && (
        <FlatList
          data={data}
          renderItem={renderUserCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.usersList}
          style={styles.usersListContainer}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>МАРКЕТ</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color="#666666" />
              <TextInput
                style={styles.searchInput}
                placeholder="Поиск"
                placeholderTextColor="#666666"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            <TouchableOpacity style={styles.heartIconButton}>
              <Heart size={24} color="#666666" />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.activeTab
                ]}
                onPress={() => handleTabPress(tab.id)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText
                ]}>
                  {tab.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Categories Section */}
          <View style={styles.categoriesSection}>
            <TouchableOpacity 
              style={styles.categoriesHeader}
              onPress={() => setShowCategories(!showCategories)}
            >
              <Text style={styles.categoriesTitle}>Выбрать категорию</Text>
              <ChevronDown size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {showCategories && (
              <View style={styles.categoriesContainer}>
                <View style={styles.categoriesRow}>
                  {CATEGORIES.slice(0, 4).map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={styles.categoryColumn}
                      onPress={() => handleCategorySelect(category.id)}
                    >
                      <View style={[
                        styles.categoryItem,
                        selectedCategory === category.id && styles.selectedCategory
                      ]}>
                        <category.icon 
                          size={32} 
                          color={selectedCategory === category.id ? "#0066FF" : "#FFFFFF"} 
                        />
                      </View>
                      <Text style={[
                        styles.categoryText,
                        selectedCategory === category.id && styles.selectedCategoryText
                      ]}>
                        {category.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <View style={styles.categoriesRow}>
                  {CATEGORIES.slice(4, 8).map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={styles.categoryColumn}
                      onPress={() => handleCategorySelect(category.id)}
                    >
                      <View style={[
                        styles.categoryItem,
                        selectedCategory === category.id && styles.selectedCategory
                      ]}>
                        <category.icon 
                          size={32} 
                          color={selectedCategory === category.id ? "#0066FF" : "#FFFFFF"} 
                        />
                      </View>
                      <Text style={[
                        styles.categoryText,
                        selectedCategory === category.id && styles.selectedCategoryText
                      ]}>
                        {category.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
          </View>

          {/* AI Team Builder Button */}
          <TouchableOpacity style={styles.aiButton} onPress={handleAITeamBuilder}>
            <LinearGradient
              colors={['#0066FF', '#00CCFF']}
              style={styles.aiButtonGradient}
            >
              <Zap size={20} color="#FFFFFF" />
              <Text style={styles.aiButtonText}>ИИ сбор команды</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sections */}
          {renderSection('ТОП 100К', top100kExpanded, () => setTop100kExpanded(!top100kExpanded), MOCK_USERS)}
          {renderSection('РЕЙТИНГ', ratingExpanded, () => setRatingExpanded(!ratingExpanded), MOCK_USERS)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#070707',
  },
  container: {
    flex: 1,
    backgroundColor: '#070707',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#000000',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Benzin-Bold',
    letterSpacing: 2,
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
  },
  heartIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeTab: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  tabText: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  categoriesTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  categoryColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  categoryItem: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  selectedCategory: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 102, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  aiButton: {
    marginHorizontal: 24,
    marginBottom: 30,
    borderRadius: 25,
    overflow: 'hidden',
  },
  aiButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  aiButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  usersListContainer: {
    paddingLeft: 24,
  },
  usersList: {
    paddingRight: 24,
    gap: 16,
  },
  userCard: {
    width: 200,
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  userCardSecond: {
    marginRight: -50, // Частично скрываем вторую карточку
  },
  userAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  userRating: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-Bold',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 8,
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specializationTag: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  specializationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-Bold',
  },
  hireButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  hireButtonText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Codec-Pro-Bold',
  },
});