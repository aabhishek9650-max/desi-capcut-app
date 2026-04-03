import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet, 
  Alert, 
  Platform, 
  ActivityIndicator // 👈 FIX: Ye import hona bahut zaroori hai
} from 'react-native';
import { Video, Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// 🔑 Apni Pixabay Key yahan dalo (Bina space ke)
const PIXABAY_KEY = '47209701-f187a536979203e87834bc677'; 

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [error, setError] = useState(false);

  const lastPlayed = useRef(null);

  // 🎵 Audio Function (Fixed Ducking)
  async function playSound(audioUrl) {
    try {
      if (sound) await sound.unloadAsync();
      await Audio.setAudioModeAsync({ 
        shouldDuckAndroid: true, 
        playsInSilentModeIOS: true,
        staysActiveInBackground: false
      });
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl }, 
        { shouldPlay: true, isLooping: true, volume: 1.0 }
      );
      setSound(newSound);
    } catch (e) { console.log("Audio Error"); }
  }

  // 🎬 Data Fetch Function
  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const vRes = await fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=trending&per_page=15`);
      const mRes = await fetch(`https://pixabay.com/api/music/?key=${PIXABAY_KEY}&q=reels`);
      const vData = await vRes.json();
      const mData = await mRes.json();

      if (!vData.hits || vData.hits.length === 0) throw new Error("No data");

      const combined = vData.hits.map((v, i) => ({
        ...v,
        audio: mData.hits && mData.hits.length > 0 ? mData.hits[i % mData.hits.length].path : null
      }));
      setTemplates(combined);
    } catch (e) { 
        setError(true);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  // 🔵 Blue Button Function
  const handleUse = async () => {
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    
    let res = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true, 
      aspect: [9, 16],
      quality: 1
    });

    if (!res.canceled) {
      Alert.alert("AI Magic ✨", "Applying Template Styles to your media!");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      {/* Background Loader */}
      <View style={styles.loaderBg}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>

      <Video
        source={{ uri: item.videos.medium.url }}
        style={styles.full}
        resizeMode="cover"
        isLooping
        shouldPlay={currentIndex === index}
      />
      
      <View style={styles.overlay}>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.grad}>
            <Text style={styles.tag}>🔥 AI TEMPLATE #{index + 1}</Text>
            <View style={styles.musicInfo}>
                <MaterialCommunityIcons name="music" size={16} color="#fff" />
                <Text style={styles.musicText}>Original Audio - Desi Capcut</Text>
            </View>
        </LinearGradient>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.center}>
          <Text style={{color: '#fff', marginBottom: 20}}>Internet or API Key Issue! ❌</Text>
          <TouchableOpacity onPress={loadData} style={styles.retryBtn}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>RETRY</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={{color: '#fff', marginTop: 10}}>Fetching Magic... ✨</Text>
        </View>
      ) : (
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
          initialNumToRender={2}
          windowSize={3}
        />
      )}

      {/* 🔵 FINAL BLUE BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.blueBtn} onPress={handleUse}>
          <LinearGradient colors={['#007AFF', '#0047FF']} style={styles.btnGrad}>
            <MaterialCommunityIcons name="lightning-bolt" size={26} color="#fff" />
            <Text style={styles.btnText}>USE TEMPLATE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  card: { width: width, height: height },
  full: { ...StyleSheet.absoluteFillObject },
  loaderBg: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', zIndex: -1 },
  overlay: { position: 'absolute', bottom: 130, width: '100%', paddingHorizontal: 20 },
  grad: { padding: 15, borderRadius: 10 },
  tag: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  musicInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  musicText: { color: '#ccc', marginLeft: 6, fontSize: 13 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  retryBtn: { padding: 15, backgroundColor: '#007AFF', borderRadius: 30, width: 150, alignItems: 'center' },
  footer: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
  blueBtn: { width: '85%', height: 65, borderRadius: 35, overflow: 'hidden', elevation: 10 },
  btnGrad: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10, letterSpacing: 1 }
});
          
