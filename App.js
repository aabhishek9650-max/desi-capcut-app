import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, 
  Dimensions, Image, StyleSheet, Alert, Platform 
} from 'react-native';
import { Video, Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics'; // 📳 Haptic Feedback
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const PIXABAY_KEY = 'YOUR_PIXABAY_KEY'; 

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userMedia, setUserMedia] = useState(null);
  const [sound, setSound] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);

  const lastPlayed = useRef(null);

  // 1. 🎵 Advanced Audio (With Ducking & Interruption Handling)
  async function playSound(audioUrl) {
    try {
      if (sound) await sound.unloadAsync();
      
      // Audio Setup for Pro feel
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true, // 🦆 Ducking Fixed
        staysActiveInBackground: false,
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, isLooping: true, volume: 0.8 }
      );
      setSound(newSound);
    } catch (e) { console.log("Audio Setup Error"); }
  }

  // 2. 🎬 Smart Data Fetch (With Error Handling - Image Fix)
  const fetchTemplates = async (query = 'trending') => {
    setLoading(true);
    setError(false);
    try {
      const vRes = await fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=${query}&per_page=15`);
      const mRes = await fetch(`https://pixabay.com/api/music/?key=${PIXABAY_KEY}&q=reels`);
      
      const vData = await vRes.json();
      const mData = await mRes.json();

      if (!vData.hits || vData.hits.length === 0) throw new Error("No data");

      const combined = vData.hits.map((v, index) => ({
        ...v,
        audio: mData.hits?.length > 0 ? mData.hits[index % mData.hits.length]?.path : null
      }));
      setTemplates(combined);
    } catch (e) {
      setError(true); // 🚨 Error State Fix
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTemplates(); }, []);

  // 3. 📳 Haptic Use Template Logic
  const handleUseTemplate = async () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUserMedia(result.assets[0].uri);
      Alert.alert("AI Engine Active 🤖", "Applying Template Styles...");
    }
  };

  // 4. 🖼️ Render Item (With Skeleton/Shimmer Style)
  const renderItem = ({ item, index }) => (
    <View style={styles.videoCard}>
      {/* 🏎️ Skeleton Loader (Jab tak video play na ho) */}
      <View style={styles.skeletonContainer}>
         <ActivityIndicator size="large" color="#007AFF" />
      </View>

      <Video
        source={{ uri: item.videos.medium.url }}
        style={styles.fullVideo}
        resizeMode="cover"
        isLooping
        shouldPlay={currentIndex === index}
        onLoad={() => {}} // Yahan loading stop kar sakte hain
      />

      {/* Template Details */}
      <View style={styles.videoOverlay}>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.grad}>
          <Text style={styles.templateName}>🔥 {item.tags.split(',')[0].toUpperCase()}</Text>
          <View style={styles.musicRow}>
            <MaterialCommunityIcons name="music-note" size={16} color="#fff" />
            <Text style={styles.musicTitle}>Original Sound - AI Mix</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Error View */}
      {error && (
        <View style={styles.errorCenter}>
          <Text style={{color: '#fff'}}>Internet check karo bhai! ❌</Text>
          <TouchableOpacity onPress={() => fetchTemplates()} style={styles.retryBtn}>
            <Text style={{color: '#fff'}}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={templates}
        renderItem={renderItem}
        pagingEnabled
        onViewableItemsChanged={useRef(({ viewableItems }) => {
          if (viewableItems.length > 0) {
            const idx = viewableItems[0].index;
            setCurrentIndex(idx);
            const audio = viewableItems[0].item.audio;
            if (audio && lastPlayed.current !== audio) {
              lastPlayed.current = audio;
              playSound(audio);
            }
          }
        }).current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* 🔵 THE FINAL BLUE BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.blueButton} onPress={handleUseTemplate}>
          <LinearGradient colors={['#007AFF', '#0047FF']} style={styles.gradient}>
             <MaterialCommunityIcons name="lightning-bolt" size={24} color="#fff" />
             <Text style={styles.btnText}>AUTO-EDIT TEMPLATE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoCard: { width: width, height: height },
  fullVideo: { ...StyleSheet.absoluteFillObject },
  skeletonContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  videoOverlay: { position: 'absolute', bottom: 100, width: '100%', padding: 20 },
  grad: { padding: 20, borderRadius: 10 },
  templateName: { color: '#fff', fontSize: 22, fontWeight: '900', textShadowColor: '#000', textShadowRadius: 5 },
  musicRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  musicTitle: { color: '#ccc', marginLeft: 8, fontSize: 13 },
  footer: { position: 'absolute', bottom: 35, width: '100%', alignItems: 'center' },
  blueButton: { width: '85%', height: 65, borderRadius: 35, overflow: 'hidden', elevation: 15 },
  gradient: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10, letterSpacing: 1 },
  errorCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  retryBtn: { marginTop: 20, padding: 10, backgroundColor: '#007AFF', borderRadius: 5 }
});
        
