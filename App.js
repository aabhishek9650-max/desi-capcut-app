import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('https://pixabay.com/api/videos/?key=47209701-f187a536979203e87834bc677&q=trending&per_page=5')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.hits || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#007AFF" /></View>;

  return (
    <View style={styles.container}>
      <FlatList
        data={templates}
        pagingEnabled
        onMomentumScrollEnd={(e) => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.y / height))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Video source={{ uri: item.videos.medium.url }} style={styles.full} resizeMode="cover" isLooping shouldPlay={currentIndex === index} />
            <View style={styles.overlay}><Text style={styles.txt}>Template #{index + 1}</Text></View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  card: { width, height },
  full: { ...StyleSheet.absoluteFillObject },
  overlay: { position: 'absolute', bottom: 100, left: 20 },
  txt: { color: '#fff', fontSize: 24, fontWeight: 'bold' }
});
          
