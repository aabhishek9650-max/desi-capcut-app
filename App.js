import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

// Pixabay ki jagah hum direct stable links use kar rahe hain
const TEMPLATES = [
  { id: '1', title: 'Cinematic Vibes', url: 'https://v.ftcdn.net/05/52/63/14/700_F_552631405_9v9TDP2XUfS7V8C6uUvNf8ZkO6WvLp2V_ST.mp4' },
  { id: '2', title: 'Urban Edit', url: 'https://v.ftcdn.net/02/91/93/29/700_F_291932912_7vD4W5N0vR5M2p0P1p7XjL6F9oZk6V_ST.mp4' },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={TEMPLATES}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / height);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Video
              source={{ uri: item.url }}
              style={styles.full}
              resizeMode="cover"
              isLooping
              shouldPlay={currentIndex === index}
            />
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Use Template</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  card: { width, height },
  full: { ...StyleSheet.absoluteFillObject },
  overlay: { position: 'absolute', bottom: 50, left: 20, right: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  btn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
    
