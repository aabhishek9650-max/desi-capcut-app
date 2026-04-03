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
  ActivityIndicator 
} from 'react-native';
import { Video, Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const PIXABAY_KEY = '47209701-f187a536979203e87834bc677'; 

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [error, setError] = useState(false);
  const lastPlayed = useRef(null);

  async function playSound(audioUrl) {
    try {
      if (sound) await sound.unloadAsync();
      await Audio.setAudioModeAsync({ 
        shouldDuckAndroid: true, 
        playsInSilentModeIOS: true 
      });
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl }, 
        { shouldPlay: true, isLooping: true }
      );
      setSound(newSound);
    } catch (e) { console.log("Sound Error"); }
  }

  const loadData = async () => {
    setLoading(true);
    setError(false);
    try {
      const vRes = await fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_KEY}&q=trending&per_page=15`);
      const mRes = await fetch(`https://pixabay.com/api/music/?key=${PIXABAY_KEY}&q=reels`);
      const vData = await vRes.json();
      const mData = await mRes.json();

      if (vData.hits) {
        const combined = vData.hits.map((v, i) => ({
          ...v,
          audio: mData.hits ? mData.hits[i % mData.hits.length]?.path : null
        }));
        setTemplates(combined);
      }
    } catch (e) { setError(true); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleUse = async () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    let res = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true, 
      aspect: [9, 16] 
    });
    if (!res.canceled) Alert.alert("AI Magic ✨", "Editing your video...");
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={templates}
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
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Video
              source={{ uri: item.videos.medium.url }}
              style={styles.full}
              resizeMode="cover"
              isLooping
              shouldPlay={currentIndex === index}
            />
            <View style={styles.overlay}>
              <Text style={styles.tag}>🔥 TEMPLATE #{index + 1}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.blueBtn} onPress={handleUse}>
          <LinearGradient colors={['#007AFF', '#0047FF']} style={styles.grad}>
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
  center: { justifyContent: 'center', alignItems: 'center' },
  card: { width: width, height: height },
  full: { ...StyleSheet.absoluteFillObject },
  overlay: { position: 'absolute', bottom: 140, left: 20 },
  tag: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  footer: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
  blueBtn: { width: '85%', height: 65, borderRadius: 35, overflow: 'hidden' },
  grad: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }
});
          
