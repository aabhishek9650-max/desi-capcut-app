import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const API_KEY = 'YOUR_PIXABAY_API_KEY'; // <-- Apni Key Yahan Zaroor Daalein

export default function App() {
  const [video, setVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Templates Fetch karne ka Logic
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=nature+background&per_page=10`);
      const data = await response.json();
      setTemplates(data.hits);
    } catch (error) {
      console.error("Template Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'templates') fetchTemplates();
  }, [activeTab]);

  // 2. Video Picker Logic
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setVideo(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#E91E63', '#9C27B0']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.header}>
        <Text style={styles.logoText}>DESI CAPCUT PRO</Text>
      </LinearGradient>

      <View style={{ flex: 1 }}>
        {activeTab === 'edit' ? (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {video ? (
              <View style={styles.videoWrapper}>
                <Video source={{ uri: video }} style={styles.fullVideo} useNativeControls resizeMode="contain" isLooping shouldPlay />
                <View style={styles.toolGrid}>
                   <TouchableOpacity style={styles.toolBtn}><MaterialCommunityIcons name="content-cut" size={24} color="#fff" /><Text style={styles.toolText}>Trim</Text></TouchableOpacity>
                   <TouchableOpacity style={styles.toolBtn}><MaterialCommunityIcons name="music" size={24} color="#fff" /><Text style={styles.toolText}>Music</Text></TouchableOpacity>
                   <TouchableOpacity style={styles.toolBtn}><MaterialCommunityIcons name="auto-fix" size={24} color="#fff" /><Text style={styles.toolText}>Filter</Text></TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.resetBtn} onPress={() => setVideo(null)}><Text style={styles.resetBtnText}>Discard Project</Text></TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadCard} onPress={pickVideo}>
                <MaterialCommunityIcons name="video-plus" size={60} color="#E91E63" />
                <Text style={styles.cardTitle}>New Project</Text>
                <Text style={styles.cardSub}>Import video to start editing</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          <View style={styles.templateContainer}>
            <Text style={styles.sectionTitle}>Trending Templates</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#E91E63" style={{marginTop: 50}} />
            ) : (
              <FlatList
                data={templates}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.tempItem} onPress={() => setVideo(item.videos.medium.url)}>
                    <Image source={{ uri: `https://i.vimeocdn.com/video/${item.picture_id}_295x166.jpg` }} style={styles.tempImage} />
                    <View style={styles.tempOverlay}>
                      <MaterialCommunityIcons name="lightning-bolt" size={16} color="#FFD700" />
                      <Text style={styles.tempText}>Apply</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('edit')}>
          <MaterialCommunityIcons name="movie-edit" size={28} color={activeTab === 'edit' ? '#E91E63' : '#888'} />
          <Text style={[styles.navText, {color: activeTab === 'edit' ? '#E91E63' : '#888'}]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('templates')}>
          <MaterialCommunityIcons name="fire" size={28} color={activeTab === 'templates' ? '#E91E63' : '#888'} />
          <Text style={[styles.navText, {color: activeTab === 'templates' ? '#E91E63' : '#888'}]}>Templates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 50, paddingBottom: 15, alignItems: 'center' },
  logoText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  scrollContainer: { padding: 20, alignItems: 'center' },
  uploadCard: { width: '100%', height: 250, backgroundColor: '#121212', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#333' },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  cardSub: { color: '#666', fontSize: 12 },
  videoWrapper: { width: '100%', alignItems: 'center' },
  fullVideo: { width: width - 40, height: 350, borderRadius: 15 },
  toolGrid: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20, backgroundColor: '#1a1a1a', padding: 15, borderRadius: 15 },
  toolBtn: { alignItems: 'center' },
  toolText: { color: '#fff', fontSize: 10, marginTop: 5 },
  resetBtn: { marginTop: 20, padding: 10 },
  resetBtnText: { color: '#E91E63', fontWeight: 'bold' },
  templateContainer: { flex: 1, padding: 10 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  tempItem: { flex: 1, margin: 5, height: 200, borderRadius: 10, overflow: 'hidden', backgroundColor: '#111' },
  tempImage: { width: '100%', height: '100%' },
  tempOverlay: { position: 'absolute', bottom: 10, left: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 5, borderRadius: 5 },
  tempText: { color: '#fff', fontSize: 10, marginLeft: 3 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#121212', height: 70, borderTopWidth: 1, borderTopColor: '#222' },
  navTab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 10, marginTop: 4 }
});
          
