import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // 1. Gallery access ke liye import

export default function App() {
  const [isPro, setIsPro] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 2. Asli Gallery kholne ka function
  const openVideoPicker = async () => {
    // Permission maango
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert("Permission Required", "Bhai, gallery access chahiye video select karne ke liye!");
      return;
    }

    // Gallery kholo
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Sirf video dikhega
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedVideo(result.assets[0].uri);
      Alert.alert("Success", "Video select ho gayi! Ab hum ispar editing features add karenge.");
    }
  };

  const showFeature = (name) => {
    Alert.alert("Desi Capcut", `${name} feature par kaam chal raha hai...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Desi Capcut</Text>
        <TouchableOpacity style={styles.proButton} onPress={() => setIsPro(true)}>
          <Text style={styles.proText}>{isPro ? "PRO ACTIVE" : "GET PRO"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            {selectedVideo ? "Video Ready to Edit" : "New Project"}
          </Text>
          {/* 3. Button par function connect kar diya */}
          <TouchableOpacity style={styles.startButton} onPress={openVideoPicker}>
            <Text style={styles.buttonText}>
              {selectedVideo ? "Change Video" : "+ Create Video"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={() => showFeature('Auto Cut')}>
            <Text style={styles.cardIcon}>✂️</Text>
            <Text style={styles.cardText}>Auto Cut</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => showFeature('Templates')}>
            <Text style={styles.cardIcon}>🎬</Text>
            <Text style={styles.cardText}>Templates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => showFeature('Background')}>
            <Text style={styles.cardIcon}>🖼️</Text>
            <Text style={styles.cardText}>BG Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => showFeature('Filters')}>
            <Text style={styles.cardIcon}>✨</Text>
            <Text style={styles.cardText}>Filters</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.nav}>
        <Text style={styles.navItem}>Edit</Text>
        <Text style={styles.navItem}>Template</Text>
        <Text style={styles.navItem}>Inbox</Text>
        <Text style={styles.navItem}>Me</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, marginTop: 30 },
  logo: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  proButton: { backgroundColor: '#FFD700', padding: 8, borderRadius: 5 },
  proText: { fontWeight: 'bold', fontSize: 12 },
  content: { flex: 1 },
  banner: { height: 200, backgroundColor: '#1a1a1a', margin: 15, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  bannerTitle: { color: '#fff', fontSize: 18, marginBottom: 15 },
  startButton: { backgroundColor: '#fff', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25 },
  buttonText: { fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, justifyContent: 'space-around' },
  card: { width: '45%', backgroundColor: '#1a1a1a', padding: 20, marginVertical: 10, borderRadius: 12, alignItems: 'center' },
  cardIcon: { fontSize: 30, marginBottom: 10 },
  cardText: { color: '#fff', fontSize: 14 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, borderTopWidth: 0.5, borderColor: '#333' },
  navItem: { color: '#fff' }
});
  
