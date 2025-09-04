import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Camera, Send, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let CHAT_MESSAGES = [];
let CHAT_NEW_MESSAGE = '';
let CHAT_CONVERSATION_ID = '';

// Моковые данные сообщений
const MOCK_MESSAGES = [
  {
    id: 1,
    text: 'I commented on Figma, I want to add some fancy icons. Do you have any icon set?',
    time: '10:43',
    isOwn: false,
    type: 'text'
  },
  {
    id: 2,
    text: 'Хелло мабой, плиз транслейт ин раша, аим донт спик инглиш мабой',
    time: '10:43',
    isOwn: true,
    type: 'text'
  },
  {
    id: 3,
    text: 'Chto ty govorish?',
    time: '11:21',
    isOwn: false,
    type: 'text'
  },
  {
    id: 4,
    text: 'Хочешь курнуть?',
    time: '12:43',
    isOwn: true,
    type: 'text'
  },
  {
    id: 5,
    text: 'I don\'t ponimat tebya',
    time: '12:43',
    isOwn: false,
    type: 'text'
  },
  {
    id: 6,
    text: 'I am almost finish. Please give me your email, I will ZIP them and send you as son as im finish.',
    time: '12:43',
    isOwn: true,
    type: 'text'
  },
  {
    id: 7,
    text: '',
    time: '11:21',
    isOwn: true,
    type: 'image',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export default function ConversationScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    CHAT_CONVERSATION_ID = id;
    CHAT_MESSAGES = messages;
  }, [id, messages]);

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    CHAT_NEW_MESSAGE = newMessage;
    CHAT_MESSAGES = [...messages, message];
    
    // TODO: Отправка сообщения на сервер
    
    setNewMessage('');
    
    // Прокручиваем к последнему сообщению
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleCameraPress = async () => {
    if (Platform.OS === 'web') {
      // Веб версия - выбор файла
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageMessage = {
              id: Date.now(),
              text: '',
              time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
              isOwn: true,
              type: 'image',
              image: e.target.result
            };
            setMessages(prev => [...prev, imageMessage]);
            CHAT_MESSAGES = [...messages, imageMessage];
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Мобильная версия - камера/галерея
      try {
        const ImagePicker = await import('expo-image-picker');
        
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions?.Images || 'Images',
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
          const imageMessage = {
            id: Date.now(),
            text: '',
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
            type: 'image',
            image: result.assets[0].uri
          };
          setMessages(prev => [...prev, imageMessage]);
          CHAT_MESSAGES = [...messages, imageMessage];
        }
      } catch (error) {
        console.log('Ошибка при выборе изображения:', error);
      }
    }
  };

  const renderMessage = ({ item }) => {
    if (item.type === 'image') {
      return (
        <View style={[
          styles.messageContainer,
          item.isOwn ? styles.ownMessageContainer : styles.otherMessageContainer
        ]}>
          <View style={[
            styles.imageMessage,
            item.isOwn ? styles.ownImageMessage : styles.otherImageMessage
          ]}>
            <Image source={{ uri: item.image }} style={styles.messageImage} />
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[
        styles.messageContainer,
        item.isOwn ? styles.ownMessageContainer : styles.otherMessageContainer
      ]}>
        <View style={[
          styles.messageBubble,
          item.isOwn ? styles.ownMessage : styles.otherMessage
        ]}>
          <Text style={[
            styles.messageText,
            item.isOwn ? styles.ownMessageText : styles.otherMessageText
          ]}>
            {item.text}
          </Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.conversationHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Danny Hopkins</Text>
          </View>
          
          <View style={styles.headerSpacer} />
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
            <Camera size={24} color="#666666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.messageInput}
            placeholder="Message"
            placeholderTextColor="#666666"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <LinearGradient
              colors={newMessage.trim() ? ['#0066FF', '#0088FF'] : ['#333333', '#333333']}
              style={styles.sendButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Send size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#000000',
  },
  headerSpacer: {
    width: 40,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  messagesContent: {
    paddingVertical: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  ownMessageContainer: {
    alignItems: 'flex-end',
  },
  otherMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  ownMessage: {
    backgroundColor: '#0066FF',
    borderBottomRightRadius: 8,
  },
  otherMessage: {
    backgroundColor: '#333333',
    borderBottomLeftRadius: 8,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    lineHeight: 22,
    marginBottom: 4,
  },
  ownMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
    color: '#FFFFFF80',
    alignSelf: 'flex-end',
  },
  imageMessage: {
    maxWidth: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  ownImageMessage: {
    borderBottomRightRadius: 8,
  },
  otherImageMessage: {
    borderBottomLeftRadius: 8,
  },
  messageImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#070707',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    gap: 12,
  },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});