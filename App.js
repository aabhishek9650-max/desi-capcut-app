import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [video, setVideo] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'], // SDK 51 format
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#0f0f0f', '#232526']} style={styles.header}>
        <Text style={styles.logoText}>DESI CAPCUT</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {video ? (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              isLooping
              style={styles.videoPlayer}
            />
            <TouchableOpacity style={styles.actionButton} onPress={() => setVideo(null)}>
              <Text style={styles.buttonText}>Remove Video</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadBox} onPress={pickVideo}>
            <MaterialCommunityIcons name="video-plus" size={80} color="#E91E63" />
            <Text style={styles.uploadText}>Tap to Upload Video</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="movie-edit" size={28} color="#E91E63" />
          <Text style={styles.navText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="trending-up" size={28} color="#fff" />
          <Text style={styles.navText}>Trends</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 50, paddingBottom: 20, alignItems: 'center' },
  logoText: { color: '#E91E63', fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  content: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  uploadBox: { width: '100%', height: 300, borderStyle: 'dashed', borderWidth: 2, borderColor: '#333', borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  uploadText: { color: '#888', marginTop: 15, fontSize: 16 },
  videoContainer: { width: '100%', alignItems: 'center' },
  videoPlayer: { width: '100%', height: 400, borderRadius: 15 },
  actionButton: { marginTop: 20, backgroundColor: '#E91E63', padding: 15, borderRadius: 30, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#111', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#222' },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { color: '#fff', fontSize: 12, marginTop: 4 }
});
                
