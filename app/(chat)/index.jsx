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
  FlatList
} from 'react-native';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Глобальные переменные для интеграции с бекендом
let CHAT_LIST = [];
let CHAT_SEARCH_QUERY = '';

// Моковые данные чатов
const MOCK_CHATS = [
  {
    id: 1,
    name: 'Danny Hopkins',
    email: 'dannylove@gmail.com',
    lastMessage: 'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
    time: '08:43',
    unreadCount: 9,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'Danny Hopkins',
    email: 'dannylove@gmail.com',
    lastMessage: 'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
    time: '08:43',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'Danny Hopkins',
    email: 'dannylove@gmail.com',
    lastMessage: 'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
    time: '08:43',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 4,
    name: 'Danny Hopkins',
    email: 'dannylove@gmail.com',
    lastMessage: 'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
    time: '08:43',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 5,
    name: 'Danny Hopkins',
    email: 'dannylove@gmail.com',
    lastMessage: 'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
    time: '08:43',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 6,
    name: 'Danny Hopkins',
    email: 'dannylove@gmail.com',
    lastMessage: 'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
    time: '08:43',
    unreadCount: 0,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const TABS = [
  { id: 'all', title: 'Все', active: false },
  { id: 'chats', title: 'Чаты', active: true },
  { id: 'groups', title: 'Группы', active: false }
];

export default function ChatListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [chats] = useState(MOCK_CHATS);

  const handleChatPress = (chatId) => {
    router.push(`/(chat)/conversation/${chatId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    CHAT_SEARCH_QUERY = query;
    // TODO: Здесь будет логика поиска чатов
  };

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
    // TODO: Здесь будет логика фильтрации чатов по типу
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => handleChatPress(item.id)}
    >
      <View style={styles.chatAvatar}>
        <Image source={{ uri: item.avatar }} style={styles.chatAvatarImage} />
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        
        <View style={styles.chatFooter}>
          <Text style={styles.chatEmail}>{item.email}</Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}+</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>100K CHAT</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={['#0066FF', '#0088FF']}
            style={styles.searchGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.searchInputContainer}>
              <Search size={20} color="#FFFFFF" />
              <TextInput
                style={styles.searchInput}
                placeholder="Поиск"
                placeholderTextColor="#FFFFFF80"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
          </LinearGradient>
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

        {/* Chat List */}
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatListContent}
        />
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchGradient: {
    borderRadius: 25,
    padding: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066FF',
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  chatListContent: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131313',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  chatAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
  },
  chatAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
  },
  chatTime: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-News',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatEmail: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-News',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-Bold',
  },
});