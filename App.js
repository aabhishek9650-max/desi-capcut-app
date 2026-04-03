import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Video, Audio } from 'expo-av'; // 👈 Audio import kiya
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const API_KEY = 'YOUR_PIXABAY_KEY';

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [sound, setSound] = useState(null); // Music state

  // 1. 🎵 Music Play karne ka function
  async function playSound(audioUrl) {
    if (sound) {
      await sound.unloadAsync(); // Purana gaana band karo
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioUrl },
      { shouldPlay: true, isLooping: true }
    );
    setSound(newSound);
  }

  // 2. 🎬 Template + Music Load logic
  const loadData = async () => {
    try {
      // Videos fetch karein
      const videoRes = await fetch(`https://pixabay.com/api/videos/?key=${API_KEY}&q=trending&per_page=10`);
      const videoData = await videoRes.json();

      // Music fetch karein (Matching beats)
      const musicRes = await fetch(`https://pixabay.com/api/music/?key=${API_KEY}&q=reels&per_page=10`);
      const musicData = await musicRes.json();

      // Dono ko merge kar do
      const combined = videoData.hits.map((v, index) => ({
        ...v,
        audio: musicData.hits[index]?.path || '' // Har video ko ek gaana mil gaya
      }));

      setTemplates(combined);
    } catch (e) { alert("Check Internet & API Key!"); }
  };

  useEffect(() => {
    loadData();
    return () => { if (sound) sound.unloadAsync(); }; // App band ho toh music bhi band
  }, []);

  // 3. 📱 Viewable items change hone par music badlo
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const currentItem = viewableItems[0].item;
      if (currentItem.audio) playSound(currentItem.audio);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={templates}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Video
              source={{ uri: item.videos.medium.url }}
              style={styles.fullVideo}
              resizeMode="cover"
              shouldPlay
              isLooping
              isMuted={true} // Video mute rakhenge kyunki music alag se baj raha hai
            />
            
            {/* Template Info Overlay */}
            <View style={styles.overlay}>
              <View style={styles.musicTag}>
                <MaterialCommunityIcons name="music" size={18} color="#007AFF" />
                <Text style={styles.musicText}>Trending Audio - Desi Capcut</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* 🔵 BLUE BUTTON */}
      <TouchableOpacity style={styles.blueButton}>
         <Text style={styles.btnText}>USE TEMPLATE WITH MUSIC</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  card: { width: width, height: height },
  fullVideo: { ...StyleSheet.absoluteFillObject },
  overlay: { position: 'absolute', bottom: 120, left: 20 },
  musicTag: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 15, alignItems: 'center' },
  musicText: { color: '#fff', marginLeft: 5, fontSize: 12, fontWeight: 'bold' },
  blueButton: { 
    position: 'absolute', bottom: 40, alignSelf: 'center', 
    backgroundColor: '#007AFF', width: '80%', height: 55, 
    borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
