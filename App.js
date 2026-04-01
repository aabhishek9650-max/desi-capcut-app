import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
      alert('Video Selected! Future features coming soon.');
    }
  };

  const FeatureCard = ({ icon, title, color }) => (
    <TouchableOpacity style={styles.card}>
      <MaterialCommunityIcons name={icon} size={32} color={color} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Desi <Text style={{color: '#00df9a'}}>Capcut</Text></Text>
        <TouchableOpacity style={styles.proBadge}>
          <Text style={styles.proText}>PRO ACTIVE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Project Section */}
        <TouchableOpacity style={styles.mainAction} onPress={pickVideo}>
          <View style={styles.plusIconBg}>
            <MaterialCommunityIcons name="plus" size={40} color="#000" />
          </View>
          <Text style={styles.mainActionTitle}>New Project</Text>
          <Text style={styles.mainActionSub}>Start creating magic</Text>
        </TouchableOpacity>

        {/* Quick Actions Grid */}
        <View style={styles.grid}>
          <FeatureCard icon="auto-fix" title="Auto Cut" color="#ff4d4d" />
          <FeatureCard icon="layers-outline" title="Templates" color="#4da6ff" />
          <FeatureCard icon="image-remove-background" title="BG Remove" color="#ffcc00" />
          <FeatureCard icon="filter-variant" title="Filters" color="#00df9a" />
        </View>
      </ScrollView>

      {/* Bottom Navigation (Mockup) */}
      <View style={styles.bottomNav}>
        <MaterialCommunityIcons name="movie-edit" size={24} color="#00df9a" />
        <MaterialCommunityIcons name="Animation" size={24} color="#777" />
        <MaterialCommunityIcons name="bell-outline" size={24} color="#777" />
        <MaterialCommunityIcons name="account-outline" size={24} color="#777" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  proBadge: {
    backgroundColor: '#00df9a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  proText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  mainAction: {
    backgroundColor: '#1e1e1e',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  plusIconBg: {
    backgroundColor: '#00df9a',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  mainActionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainActionSub: {
    color: '#777',
    fontSize: 14,
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1e1e1e',
    width: '48%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#222',
    backgroundColor: '#0f0f0f',
  },
});
        
