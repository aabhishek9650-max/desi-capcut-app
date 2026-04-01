import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, ScrollView, 
  Image, StatusBar, Dimensions 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Gradient ke liye

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('edit');

  const pickVideos = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });
    if (!result.canceled) setSelectedVideos(result.assets);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 🌈 Colorful Header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
           <Text style={[styles.logoText, {color: '#FF007A'}]}>Desi </Text>
           <Text style={[styles.logoText, {color: '#00FFE0'}]}>Capcut</Text>
        </View>
        <TouchableOpacity style={styles.iconCircle}>
          <Ionicons name="flash" size={20} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activeTab === 'edit' ? (
          <View style={{width: '100%', alignItems: 'center'}}>
            {selectedVideos.length === 0 ? (
              <TouchableOpacity onPress={pickVideos}>
                <LinearGradient
                  colors={['#8E2DE2', '#4A00E0', '#00FFE0']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.newProjectBox}
                >
                  <View style={styles.innerBox}>
                    <Ionicons name="add-circle" size={50} color="white" />
                    <Text style={styles.newProjectText}>CREATE MAGIC</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.videoGrid}>
                {selectedVideos.map((v, i) => (
                  <View key={i} style={styles.videoCard}>
                    <Image source={{ uri: v.uri }} style={styles.thumbnail} />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.cardOverlay} />
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : (
          /* ⚡ Colorful Templates */
          <View style={styles.templateSection}>
            <Text style={styles.sectionTitle}>TRENDING <Text style={{color: '#FF007A'}}>VIBES</Text></Text>
            <View style={styles.templateGrid}>
               {[1,2,3,4].map((item) => (
                 <TouchableOpacity key={item} style={styles.templateCard}>
                   <LinearGradient colors={['#333', '#111']} style={styles.tempImage}>
                     <Ionicons name="play" size={30} color="#00FFE0" />
                   </LinearGradient>
                   <Text style={styles.tempTitle}>Viral Beat {item}</Text>
                 </TouchableOpacity>
               ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 🎮 RGB Style Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setActiveTab('edit')} style={styles.navBtn}>
          <Ionicons name="cut" size={26} color={activeTab === 'edit' ? '#00FFE0' : '#444'} />
          <Text style={{color: activeTab === 'edit' ? '#00FFE0' : '#444', fontSize: 10}}>EDIT</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('templates')} style={styles.navBtn}>
          <Ionicons name="flame" size={26} color={activeTab === 'templates' ? '#FF007A' : '#444'} />
          <Text style={{color: activeTab === 'templates' ? '#FF007A' : '#444', fontSize: 10}}>TEMPLATES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn}>
          <LinearGradient colors={['#FF007A', '#8E2DE2']} style={styles.proCircle}>
            <Ionicons name="person" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', paddingTop: 45 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25, marginBottom: 20 },
  logoText: { fontSize: 26, fontWeight: '900', letterSpacing: -1, textTransform: 'uppercase' },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  
  scrollContainer: { paddingBottom: 120 },
  
  newProjectBox: { width: width * 0.85, height: 200, borderRadius: 25, padding: 3, justifyContent: 'center', alignItems: 'center', elevation: 15, shadowColor: '#00FFE0', shadowOpacity: 0.5 },
  innerBox: { width: '100%', height: '100%', backgroundColor: '#050505', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  newProjectText: { color: 'white', fontWeight: '900', fontSize: 18, marginTop: 10, letterSpacing: 2 },

  videoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 12, justifyContent: 'center' },
  videoCard: { width: (width/2)-20, height: 260, borderRadius: 20, overflow: 'hidden', backgroundColor: '#111', borderWidth: 1, borderColor: '#222' },
  thumbnail: { width: '100%', height: '100%' },
  cardOverlay: { position: 'absolute', bottom: 0, width: '100%', height: '40%' },

  templateSection: { padding: 20 },
  sectionTitle: { color: 'white', fontSize: 22, fontWeight: '900', marginBottom: 20 },
  templateGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  templateCard: { width: (width/2)-25, marginBottom: 20 },
  tempImage: { width: '100%', height: 240, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  tempTitle: { color: '#EEE', marginTop: 10, fontWeight: '600', fontSize: 14, textAlign: 'center' },

  bottomNav: { position: 'absolute', bottom: 25, left: 20, right: 20, height: 75, backgroundColor: 'rgba(20,20,20,0.95)', borderRadius: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWeight: 1, borderColor: '#333', elevation: 10 },
  navBtn: { alignItems: 'center', justifyContent: 'center' },
  proCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' }
});
  
