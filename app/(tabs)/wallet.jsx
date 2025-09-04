import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>КОШЕЛЕК</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.subtitle}>В разработке...</Text>
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    color: '#787878',
    fontSize: 16,
    fontFamily: 'Codec-Pro-News',
  },
});