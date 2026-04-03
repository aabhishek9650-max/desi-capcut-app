import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList, Dimensions, ActivityIndicator, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ✅ TERI ASLI KEY YAHAN FIT KAR DI HAI
const API_KEY = '53126233-c5f7989653068455566493ac1'; 

export default function App() {
  const [video, setVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Templates ya Music Fetch karne ka function
  const fetchData = async (type = 'videos', query = 'nature') => {
    setLoading(true);
    try {
      const endpoint = type === 'videos' ? 'videos' : 'videos'; // Pixabay music/audio access specific hota hai, abhi hum templates fetch kar rahe hain
      const response = await fetch(`https://pixabay.com/api/${endpoint}/?key=${API_KEY}&q=${query}&per_page=15`);
      const data = await response.json();
      setDataList(data.hits);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'templates') fetchData('videos', 'trending');
    if (activeTab === 'music') fetchData('videos', 'lofi'); 
  }, [activeTab]);

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
                <TouchableOpacity style={styles.resetBtn} onPress={() => setVideo(null)}><Text style={styles.resetBtnText}>New Project</Text></TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadCard} onPress={pickVideo}>
                <MaterialCommunityIcons name="video-plus" size={60} color="#E91E63" />
                <Text style={styles.cardTitle}>Start Creating</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>{activeTab === 'templates' ? 'Video Templates' : 'Background Music'}</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#E91E63" />
            ) : (
              <FlatList
                data={dataList}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.itemCard} onPress={() => setVideo(item.videos.medium.url)}>
                    <Image source={{ uri: `https://i.vimeocdn.com/video/${item.picture_id}_295x166.jpg` }} style={styles.itemImg} />
                    <Text style={styles.itemLabel}>Apply</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
      </View>

      {/* Modern Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('edit')}>
          <MaterialCommunityIcons name="movie-edit" size={26} color={activeTab === 'edit' ? '#E91E63' : '#888'} />
          <Text style={[styles.navText, {color: activeTab === 'edit' ? '#E91E63' : '#888'}]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('templates')}>
          <MaterialCommunityIcons name="fire" size={26} color={activeTab === 'templates' ? '#E91E63' : '#888'} />
          <Text style={[styles.navText, {color: activeTab === 'templates' ? '#E91E63' : '#888'}]}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => setActiveTab('music')}>
          <MaterialCommunityIcons name="music-note" size={26} color={activeTab === 'music' ? '#E91E63' : '#888'} />
          <Text style={[styles.navText, {color: activeTab === 'music' ? '#E91E63' : '#888'}]}>Music</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 50, paddingBottom: 15, alignItems: 'center' },
  logoText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  scrollContainer: { padding: 20, alignItems: 'center' },
  uploadCard: { width: '100%', height: 250, backgroundColor: '#121212', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#444' },
  cardTitle: { color: '#fff', marginTop: 10 },
  videoWrapper: { width: '100%', alignItems: 'center' },
  fullVideo: { width: width - 40, height: 400, borderRadius: 15 },
  resetBtn: { marginTop: 20, padding: 10 },
  resetBtnText: { color: '#E91E63' },
  listContainer: { flex: 1, padding: 10 },
  sectionTitle: { color: '#fff', fontSize: 18, marginBottom: 15 },
  itemCard: { flex: 1, margin: 5, height: 150, borderRadius: 10, overflow: 'hidden', backgroundColor: '#111' },
  itemImg: { width: '100%', height: '100%' },
  itemLabel: { position: 'absolute', bottom: 5, right: 5, color: '#fff', backgroundColor: '#E91E63', padding: 3, fontSize: 10, borderRadius: 4 },
  bottomNav: { flexDirection: 'row', backgroundColor: '#121212', height: 75, borderTopWidth: 1, borderTopColor: '#222' },
  navTab: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 10, marginTop: 4 }
});
                                                                              
