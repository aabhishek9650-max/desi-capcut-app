import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [videoUri, setVideoUri] = useState(null);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
    }
  };

  // --- EDITOR SCREEN (1000x PRO LOOK) ---
  if (videoUri) {
    return (
      <SafeAreaView style={styles.editorContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setVideoUri(null)}>
            <Ionicons name="close-outline" size={32} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.proLogo}>CRYSTEL <Text style={{color:'#00E5FF'}}>EDIT</Text></Text>
          <TouchableOpacity style={styles.exportBtnSmall}>
            <Text style={styles.exportTextSmall}>EXPORT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previewArea}>
          <Video
            source={{ uri: videoUri }}
            style={styles.fullVideo}
            resizeMode="contain"
            shouldPlay
            isLooping
            useNativeControls={false}
          />
        </View>

        <View style={styles.timelineSection}>
          <View style={styles.timelineTrack}>
            <LinearGradient colors={['#1C1C1E', '#2C2C2E']} style={styles.trackContent}>
               <Ionicons name="film-outline" size={20} color="#555" />
               <Text style={{color:'#555', fontSize:10, marginLeft:10}}>Video Layer 1</Text>
            </LinearGradient>
            <View style={styles.playheadLine} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolBar}>
            {[
              {n: 'Trim', i: 'cut-outline'},
              {n: 'Audio', i: 'musical-note-outline'},
              {n: 'Text', i: 'text-outline'},
              {n: 'Filter', i: 'color-filter-outline'},
              {n: 'Adjust', i: 'options-outline'},
              {n: 'Speed', i: 'speedometer-outline'}
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.toolIconBtn}>
                <Ionicons name={item.i} size={24} color="#fff" />
                <Text style={styles.toolLabelText}>{item.n}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // --- HOME SCREEN (ULTRA MINIMALIST) ---
  return (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#000', '#121212', '#000']} style={styles.fullBackground}>
        
        <View style={styles.homeHeader}>
          <Text style={styles.mainTitle}>CRYSTEL <Text style={{color:'#00E5FF'}}>PRO</Text></Text>
          <Text style={styles.subTagline}>Ak Development Tech</Text>
        </View>

        <View style={styles.centerAction}>
          <TouchableOpacity onPress={pickVideo} activeOpacity={0.8}>
            <LinearGradient colors={['#00E5FF', '#00838F']} style={styles.heroCard}>
              <View style={styles.iconCircle}>
                <Ionicons name="add" size={50} color="#000" />
              </View>
              <Text style={styles.heroBtnText}>New Project</Text>
              <Text style={styles.heroSubText}>Tap to import from gallery</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.homeFooter}>
           <TouchableOpacity style={styles.footerIcon}><Ionicons name="home" size={26} color="#00E5FF" /></TouchableOpacity>
           <TouchableOpacity style={styles.footerIcon}><Ionicons name="person-outline" size={26} color="#8E8E93" /></TouchableOpacity>
        </View>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  // Home Styles
  homeContainer: { flex: 1, backgroundColor: '#000' },
  fullBackground: { flex: 1, justifyContent: 'space-between', paddingVertical: 50 },
  homeHeader: { alignItems: 'center' },
  mainTitle: { fontSize: 32, fontWeight: '900', color: '#fff', letterSpacing: 2 },
  subTagline: { color: '#8E8E93', fontSize: 12, marginTop: 5, letterSpacing: 1 },
  centerAction: { alignItems: 'center', paddingHorizontal: 30 },
  heroCard: { width: width * 0.8, height: width * 0.9, borderRadius: 40, justifyContent: 'center', alignItems: 'center', elevation: 20, shadowColor: '#00E5FF', shadowOpacity: 0.5, shadowRadius: 20 },
  iconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  heroBtnText: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  heroSubText: { color: 'rgba(0,0,0,0.6)', fontSize: 13, marginTop: 5 },
  homeFooter: { flexDirection: 'row', justifyContent: 'center', gap: 60 },

  // Editor Styles
  editorContainer: { flex: 1, backgroundColor: '#000' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#222' },
  proLogo: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  exportBtnSmall: { backgroundColor: '#00E5FF', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 8 },
  exportTextSmall: { color: '#000', fontWeight: '900', fontSize: 12 },
  previewArea: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  fullVideo: { width: '100%', height: '100%' },
  timelineSection: { height: height * 0.35, backgroundColor: '#121212', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 },
  timelineTrack: { height: 80, width: '100%', backgroundColor: '#1C1C1E', borderRadius: 15, marginTop: 10, justifyContent: 'center', overflow: 'hidden' },
  trackContent: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 },
  playheadLine: { position: 'absolute', left: '50%', height: '100%', width: 2, backgroundColor: '#00E5FF', zIndex: 10 },
  toolBar: { marginTop: 40 },
  toolIconBtn: { alignItems: 'center', marginRight: 35 },
  toolLabelText: { color: '#8E8E93', fontSize: 10, marginTop: 8 }
});
    
