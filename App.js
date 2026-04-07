import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [videoUri, setVideoUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

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

  if (videoUri) {
    return (
      <SafeAreaView style={styles.editorContainer}>
        <StatusBar barStyle="light-content" />
        
        {/* 1. TOP NAV */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setVideoUri(null)}>
            <Ionicons name="close-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.proLogo}>CRYSTEL <Text style={{color:'#00E5FF'}}>EDIT</Text></Text>
          <TouchableOpacity style={styles.exportBtn}>
            <Text style={styles.exportText}>EXPORT</Text>
          </TouchableOpacity>
        </View>

        {/* 2. VIDEO PREVIEW (Clean) */}
        <View style={styles.previewArea}>
          <Video
            source={{ uri: videoUri }}
            style={styles.fullVideo}
            resizeMode="contain"
            shouldPlay={isPlaying}
            isLooping
          />
        </View>

        {/* 3. THE MAGIC MIDDLE BAR (Play Button Between Video & Timeline) */}
        <View style={styles.middleControlBar}>
          <View style={styles.timeTextContainer}>
             <Text style={styles.timerText}>00:00 / 00:15</Text>
          </View>

          <TouchableOpacity 
            onPress={() => setIsPlaying(!isPlaying)} 
            style={styles.centerPlayBtn}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#000" />
          </TouchableOpacity>

          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.keyBtn}>
              <MaterialCommunityIcons name="key-variant" size={18} color="#00E5FF" />
              <Text style={styles.keyLabel}>KEY</Text>
            </TouchableOpacity>
            <Ionicons name="arrow-undo-outline" size={20} color="#fff" style={{marginLeft: 15}} />
          </View>
        </View>

        {/* 4. TIMELINE AREA */}
        <View style={styles.timelineSection}>
          <View style={styles.playheadLine} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: width/2}}>
            <LinearGradient 
              colors={['#1A1A1A', '#00E5FF', '#1A1A1A']} 
              start={{x:0, y:0.5}} end={{x:1, y:0.5}} 
              style={styles.videoTrack}
            >
              <Text style={styles.trackInfo}>Video Layer 1</Text>
            </LinearGradient>
          </ScrollView>
        </View>

        {/* 5. BOTTOM TOOLS */}
        <View style={styles.footerTools}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              {n: 'Split', i: 'cut-outline'}, {n: 'Audio', i: 'musical-note-outline'},
              {n: 'Text', i: 'text-outline'}, {n: 'Filter', i: 'color-filter-outline'},
              {n: 'Effect', i: 'sparkles-outline'}, {n: 'Speed', i: 'speedometer-outline'}
            ].map((t, i) => (
              <TouchableOpacity key={i} style={styles.toolBtn}>
                <Ionicons name={t.i} size={22} color="#fff" />
                <Text style={styles.toolTxt}>{t.n}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // Basic Home Placeholder
  return (
    <View style={{flex:1, backgroundColor:'#000', justifyContent:'center', alignItems:'center'}}>
      <TouchableOpacity onPress={pickVideo} style={{backgroundColor:'#00E5FF', padding:20, borderRadius:15}}>
        <Text style={{fontWeight:'bold'}}>OPEN PROJECT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  editorContainer: { flex: 1, backgroundColor: '#000' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  proLogo: { color: '#fff', fontSize: 16, fontWeight: '900' },
  exportBtn: { backgroundColor: '#00E5FF', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 8 },
  exportText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  
  previewArea: { height: height * 0.4, backgroundColor: '#000' },
  fullVideo: { width: '100%', height: '100%' },

  // --- MIDDLE BAR STYLES ---
  middleControlBar: { 
    height: 60, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    backgroundColor: '#000'
  },
  timeTextContainer: { width: 100 },
  timerText: { color: '#8E8E93', fontSize: 10, fontWeight: '600' },
  centerPlayBtn: { 
    backgroundColor: '#00E5FF', 
    width: 38, 
    height: 38, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#00E5FF',
    shadowOpacity: 0.4,
    shadowRadius: 5
  },
  rightIcons: { flexDirection: 'row', alignItems: 'center', width: 100, justifyContent: 'flex-end' },
  keyBtn: { alignItems: 'center' },
  keyLabel: { color: '#00E5FF', fontSize: 8, fontWeight: 'bold' },

  // --- TIMELINE STYLES ---
  timelineSection: { height: 100, backgroundColor: '#111', justifyContent: 'center' },
  playheadLine: { position: 'absolute', left: width/2, height: '100%', width: 2, backgroundColor: '#fff', zIndex: 10 },
  videoTrack: { width: 800, height: 55, borderRadius: 8, justifyContent: 'center', paddingLeft: 15 },
  trackInfo: { color: '#000', fontSize: 10, fontWeight: 'bold' },

  // --- FOOTER STYLES ---
  footerTools: { height: 80, backgroundColor: '#000', borderTopWidth: 0.5, borderTopColor: '#222', paddingTop: 10 },
  toolBtn: { alignItems: 'center', marginHorizontal: 18 },
  toolTxt: { color: '#8E8E93', fontSize: 10, marginTop: 5 }
});
  
