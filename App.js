import React, { useState } from 'react'; // ✅ 'import' fixed (lowercase)
import { 
  StyleSheet, Text, View, Pressable, ScrollView, 
  StatusBar, Dimensions, Image, ActivityIndicator, Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');

  const pickVideos = async () => {
    if (selectedMedia.length >= 10) {
      Alert.alert("Limit Reached", "Bhai, 10 videos kaafi hain!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,
      selectionLimit: 10 - selectedMedia.length,
    });

    if (!result.canceled) {
      setLoading(true); 
      try {
        const mediaWithThumbs = await Promise.all(
          result.assets.map(async (asset) => {
            try {
              const randomTime = Math.floor(Math.random() * 3000); // ✅ Random Thumbnail
              const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri, {
                time: randomTime,
              });
              return { videoUri: asset.uri, thumbUri: uri };
            } catch (e) {
              return { videoUri: asset.uri, thumbUri: null };
            }
          })
        );

        setSelectedMedia(prevMedia => {
          const uniqueNewMedia = mediaWithThumbs.filter(
            newV => !prevMedia.some(oldV => oldV.videoUri === newV.videoUri)
          );
          return [...prevMedia, ...uniqueNewMedia].slice(0, 10);
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const removeVideo = (uri, e) => {
    e.stopPropagation(); // ✅ Propagation Fix
    Alert.alert(
      "Remove Video?", 
      "Kya aap is video ko hatana chahte hain?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", onPress: () => setSelectedMedia(selectedMedia.filter(v => v.videoUri !== uri)), style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
           <Text style={[styles.logoText, {color: '#FF007A'}]}>Desi </Text>
           <Text style={[styles.logoText, {color: '#00FFE0'}]}>Capcut</Text>
        </View>
        <Pressable style={styles.iconCircle}><Ionicons name="flash" size={20} color="#FFD700" /></Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {activeTab === 'edit' ? (
          <View style={{width: '100%', alignItems: 'center'}}>
            
            {selectedMedia.length === 0 ? (
              <Pressable 
                onPress={pickVideos} 
                disabled={loading}
                style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.96 : 1 }] }]} // ✅ Press Animation
              >
                <LinearGradient colors={['#8E2DE2', '#4A00E0', '#00FFE0']} style={styles.newProjectBox}>
                  <View style={styles.innerBox}>
                    {loading ? (
                      <View style={{alignItems: 'center'}}>
                        <ActivityIndicator color="#00FFE0" size="large" />
                        <Text style={{color: '#00FFE0', marginTop: 10, fontSize: 12}}>Processing videos...</Text> // ✅ Loading Text
                      </View>
                    ) : (
                      <>
                        <Ionicons name="add-circle" size={50} color="white" />
                        <Text style={styles.newProjectText}>CREATE MAGIC</Text>
                      </>
                    )}
                  </View>
                </LinearGradient>
              </Pressable>
            ) : (
              <View style={styles.videoGrid}>
                {selectedMedia.map((item) => (
                  <Pressable 
                    key={item.videoUri} // ✅ Better Key
                    style={({ pressed }) => [
                      styles.videoCard,
                      { transform: [{ scale: pressed ? 0.98 : 1 }] }
                    ]}
                  >
                    <Image source={{ uri: item.thumbUri || item.videoUri }} style={styles.thumbnail} />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.cardOverlay} />
                    <Pressable style={styles.deleteBtn} onPress={(e) => removeVideo(item.videoUri, e)}>
                      <Ionicons name="close-circle" size={26} color="white" />
                    </Pressable>
                  </Pressable>
                ))}
                
                {selectedMedia.length < 10 && (
                  <Pressable 
                    style={({ pressed }) => [styles.videoCard, styles.addMoreBtn, { transform: [{ scale: pressed ? 0.95 : 1 }] }]} 
                    onPress={pickVideos}
                  >
                    <Ionicons name="add" size={40} color="#333" />
                  </Pressable>
                )}
              </View>
            )}

            {selectedMedia.length === 0 && !loading && (
              <Text style={styles.emptyText}>No videos selected. Tap to start magic!</Text> // ✅ Empty State
            )}
          </View>
        ) : (
          /* ✅ Music & Template Section Base */
          <View style={styles.templateSection}>
            <Text style={styles.sectionTitle}>TRENDING MUSIC</Text>
            <Text style={styles.emptyText}>Copyright-free & Extraction features coming soon!</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <Pressable onPress={() => setActiveTab('edit')} style={styles.navBtn}>
          <Ionicons name="cut" size={24} color={activeTab === 'edit' ? '#00FFE0' : '#444'} />
          <Text style={{color: activeTab === 'edit' ? '#00FFE0' : '#444', fontSize: 10, marginTop: 4}}>EDIT</Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('templates')} style={styles.navBtn}>
          <Ionicons name="flame" size={24} color={activeTab === 'templates' ? '#FF007A' : '#444'} />
          <Text style={{color: activeTab === 'templates' ? '#FF007A' : '#444', fontSize: 10, marginTop: 4}}>TRENDS</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  logoText: { fontSize: 24, fontWeight: '900' },
  iconCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  scrollContainer: { paddingBottom: 100 },
  newProjectBox: { width: width * 0.9, height: 160, borderRadius: 20, padding: 1.5 },
  innerBox: { flex: 1, backgroundColor: '#000', borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  newProjectText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10 },
  videoGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 5, justifyContent: 'flex-start' },
  videoCard: { width: (width/2)-15, height: 220, borderRadius: 12, overflow: 'hidden', margin: 7, backgroundColor: '#111' },
  addMoreBtn: { borderStyle: 'dashed', borderWidth: 1, borderColor: '#333', justifyContent: 'center', alignItems: 'center' },
  thumbnail: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardOverlay: { position: 'absolute', bottom: 0, width: '100%', height: '40%' },
  deleteBtn: { position: 'absolute', top: 8, right: 8 },
  emptyText: { color: '#666', marginTop: 30, fontSize: 13, textAlign: 'center' },
  templateSection: { flex: 1, alignItems: 'center', padding: 20 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  bottomNav: { position: 'absolute', bottom: 30, alignSelf: 'center', width: '85%', height: 65, backgroundColor: 'rgba(15,15,15,0.95)', borderRadius: 32, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  navBtn: { alignItems: 'center' }
});
                  
