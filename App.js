import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ScrollView, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [videoUri, setVideoUri] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

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
        
        {/* Header - Glassmorphism Look */}
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setVideoUri(null)}>
            <Ionicons name="chevron-back" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.proLogo}>CRYSTEL <Text style={{color:'#00E5FF'}}>EDIT</Text></Text>
          </View>
          <TouchableOpacity style={styles.exportBtn}>
            <Text style={styles.exportText}>EXPORT</Text>
          </TouchableOpacity>
        </View>

        {/* Video Preview Section */}
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setIsPlaying(!isPlaying)} 
          style={styles.previewArea}
        >
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            style={styles.fullVideo}
            resizeMode="contain"
            shouldPlay={isPlaying}
            isLooping
          />
          {!isPlaying && (
            <View style={styles.playOverlay}>
              <Ionicons name="play" size={60} color="rgba(0,229,255,0.8)" />
            </View>
          )}
        </TouchableOpacity>

        {/* 10000x Pro Timeline Section */}
        <View style={styles.editorBottomPanel}>
          
          {/* Action Bar (Keyframe, Undo, Redo) */}
          <View style={styles.topActions}>
             <TouchableOpacity style={styles.actionCircle}>
                <MaterialCommunityIcons name="key-variant" size={20} color="#00E5FF" />
                <Text style={styles.actionLabel}>Key</Text>
             </TouchableOpacity>
             <View style={{flexDirection:'row', gap: 20}}>
                <Ionicons name="arrow-undo-outline" size={22} color="#fff" />
                <Ionicons name="arrow-redo-outline" size={22} color="#fff" />
             </View>
          </View>

          {/* Real Scrollable Timeline */}
          <View style={styles.timelineWrapper}>
            <View style={styles.centerIndicator} />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              contentContainerStyle={{paddingHorizontal: width/2}}
            >
              <LinearGradient 
                colors={['#333', '#444', '#333']} 
                start={{x:0, y:0}} end={{x:1, y:0}}
                style={styles.videoTrack}
              >
                <Text style={styles.trackText}>Video Layer 01</Text>
              </LinearGradient>
            </ScrollView>
          </View>

          {/* Expanded Tools Menu */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mainTools}>
            {[
              {n: 'Edit', i: 'cut-outline'},
              {n: 'Audio', i: 'musical-notes-outline'},
              {n: 'Text', i: 'text-outline'},
              {n: 'Overlay', i: 'copy-outline'},
              {n: 'Effects', i: 'sparkles-outline'},
              {n: 'Filters', i: 'color-filter-outline'},
              {n: 'Adjust', i: 'options-outline'},
              {n: 'Canvas', i: 'browsers-outline'},
            ].map((tool, index) => (
              <TouchableOpacity key={index} style={styles.toolBtn}>
                <Ionicons name={tool.i} size={24} color="#fff" />
                <Text style={styles.toolTxt}>{tool.n}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // --- HOME SCREEN (ULTRA MODERN) ---
  return (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#000', '#1A1A1A']} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={styles.homeLogo}>CRYSTEL <Text style={{color:'#00E5FF'}}>PRO</Text></Text>
        <TouchableOpacity style={styles.bigHeroBtn} onPress={pickVideo}>
          <LinearGradient colors={['#00E5FF', '#0097A7']} style={styles.gradientBtn}>
            <Ionicons name="add" size={40} color="#000" />
          </LinearGradient>
          <Text style={styles.heroLabel}>New Project</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  // Editor Styles
  editorContainer: { flex: 1, backgroundColor: '#000' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#000' },
  proLogo: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  exportBtn: { backgroundColor: '#00E5FF', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 10 },
  exportText: { color: '#000', fontWeight: 'bold' },
  previewArea: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  fullVideo: { width: '100%', height: '100%' },
  playOverlay: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50, padding: 10 },

  // Timeline UI
  editorBottomPanel: { height: height * 0.42, backgroundColor: '#111', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingVertical: 15 },
  topActions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15, alignItems: 'center' },
  actionCircle: { alignItems: 'center' },
  actionLabel: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold' },
  
  timelineWrapper: { height: 100, position: 'relative', justifyContent: 'center' },
  centerIndicator: { position: 'absolute', left: width / 2, height: '100%', width: 2, backgroundColor: '#00E5FF', zIndex: 10 },
  videoTrack: { width: 600, height: 60, borderRadius: 10, justifyContent: 'center', paddingLeft: 20, borderTopWidth: 1, borderTopColor: '#555' },
  trackText: { color: '#aaa', fontSize: 12, fontWeight: '600' },

  mainTools: { marginTop: 30, paddingLeft: 20 },
  toolBtn: { alignItems: 'center', marginRight: 30 },
  toolTxt: { color: '#fff', fontSize: 11, marginTop: 8 },

  // Home Screen
  homeContainer: { flex: 1 },
  homeLogo: { fontSize: 35, fontWeight: '900', color: '#fff', marginBottom: 50 },
  bigHeroBtn: { alignItems: 'center' },
  gradientBtn: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', elevation: 20, shadowColor: '#00E5FF', shadowOpacity: 0.5, shadowRadius: 20 },
  heroLabel: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 15 }
});
  
