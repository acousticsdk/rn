import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Star, Clock } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get('window');

// Глобальные переменные для интеграции с бекендом
let CLIENT_USER_NAME = 'Anna';
let CLIENT_ACTIVE_PROJECTS = 2;
let CLIENT_COMPLETED_PROJECTS = 5;
let CLIENT_TOTAL_SPENT = 15000;

// Моковые данные активных проектов
const ACTIVE_PROJECTS = [
  {
    id: 1,
    title: 'Дизайн лендинга',
    master: 'Artem Astah',
    progress: 75,
    deadline: '2 дня',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    title: 'SMM продвижение',
    master: 'Maria Kozlova',
    progress: 45,
    deadline: '5 дней',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export default function ClientHomepage() {
  const [userName] = useState(CLIENT_USER_NAME);
  const [activeProjects] = useState(CLIENT_ACTIVE_PROJECTS);
  const [completedProjects] = useState(CLIENT_COMPLETED_PROJECTS);
  const [totalSpent] = useState(CLIENT_TOTAL_SPENT);

  const handleFindMaster = () => {
    // TODO: Логика поиска мастера
    console.log('Найти мастера');
  };

  const handleProjectPress = (projectId) => {
    // TODO: Открыть детали проекта
    console.log(`Открыть проект ${projectId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>100KLAB</Text>
          </View>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                style={styles.avatar}
              />
            </View>

            {/* Greeting */}
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Добро пожаловать, {userName}!</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Ваши проекты:</Text>
          
          <View style={styles.statsRow}>
            {/* Active Projects */}
            <View style={styles.statCard}>
              <LinearGradient
                colors={['#0066FF', '#4A9EFF']}
                style={styles.statGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.statNumber}>{activeProjects} активных</Text>
              </LinearGradient>
            </View>

            {/* Completed/Spent Stats */}
            <View style={styles.rightStatsContainer}>
              <View style={styles.completedCard}>
                <Text style={styles.completedLabel}>Завершено:</Text>
                <Text style={styles.completedValue}>{completedProjects} проектов</Text>
              </View>
              
              <View style={styles.spentCard}>
                <LinearGradient
                  colors={['#10B981', '#059669']}
                  style={styles.spentGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.spentLabel}>Потрачено:</Text>
                  <Text style={styles.spentValue}>€ {totalSpent}</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>

        {/* Active Projects List */}
        <View style={styles.projectsSection}>
          <Text style={styles.projectsTitle}>Активные проекты</Text>
          
          {ACTIVE_PROJECTS.map((project) => (
            <TouchableOpacity 
              key={project.id}
              style={styles.projectCard}
              onPress={() => handleProjectPress(project.id)}
            >
              <View style={styles.projectHeader}>
                <View style={styles.projectInfo}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectMaster}>Мастер: {project.master}</Text>
                </View>
                <Image source={{ uri: project.avatar }} style={styles.projectAvatar} />
              </View>
              
              <View style={styles.projectProgress}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${project.progress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{project.progress}%</Text>
              </View>
              
              <View style={styles.projectFooter}>
                <View style={styles.deadlineContainer}>
                  <Clock size={16} color="#666666" />
                  <Text style={styles.deadlineText}>Осталось: {project.deadline}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Find Master Button */}
        <View style={styles.findMasterContainer}>
          <TouchableOpacity style={styles.findMasterButton} onPress={handleFindMaster}>
            <LinearGradient
              colors={['#10B981', '#059669']}
              style={styles.findMasterGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Search size={24} color="#FFFFFF" />
              <Text style={styles.findMasterText}>НАЙТИ МАСТЕРА</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  welcomeCard: {
    marginHorizontal: 24,
    marginBottom: 30,
    borderRadius: 30,
    overflow: 'hidden',
    height: 300,
  },
  cardGradient: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  greetingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 20,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  statsTitle: {
    color: '#787878',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
  },
  statCard: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  statGradient: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    textAlign: 'center',
  },
  rightStatsContainer: {
    flex: 1,
    gap: 10,
  },
  completedCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedLabel: {
    color: '#787878',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
  },
  completedValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-Bold',
  },
  spentCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  spentGradient: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spentLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
  },
  spentValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-Bold',
  },
  projectsSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  projectsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Codec-Pro-Bold',
    marginBottom: 4,
  },
  projectMaster: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'Codec-Pro-News',
  },
  projectAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  projectProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Codec-Pro-Bold',
    minWidth: 35,
    textAlign: 'right',
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deadlineText: {
    color: '#666666',
    fontSize: 12,
    fontFamily: 'Codec-Pro-News',
  },
  findMasterContainer: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  findMasterButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  findMasterGradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  findMasterText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Codec-Pro-Bold',
    letterSpacing: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});