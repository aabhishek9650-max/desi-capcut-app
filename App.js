import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function DesktopEditor() {
  return (
    <SafeAreaView style={styles.container}>
      {/* --- TOP BAR: Desktop Export Logic --- */}
      <View style={styles.topBar}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>Crystel_Project_01</Text>
          <Text style={styles.projectMeta}>4K | 60 FPS | ProRes</Text>
        </View>
        <TouchableOpacity style={styles.exportBtn}>
          <Text style={styles.exportText}>EXPORT</Text>
          <Ionicons name="share-outline" size={16} color="#000" />
        </TouchableOpacity>
      </View>

      {/* --- PREVIEW PANEL --- */}
      <View style={styles.previewPanel}>
        <View style={styles.viewer}>
          <View style={styles.safeAreaGuide} />
          <Text style={styles.watermark}>CRYSTEL ENGINE v1.0.3</Text>
        </View>
      </View>

      {/* --- DESKTOP CONTROL STRIP --- */}
      <View style={styles.controlStrip}>
        <View style={styles.leftTools}>
          <Ionicons name="mic-outline" size={20} color="#fff" />
          <Ionicons name="videocam-outline" size={20} color="#fff" style={{marginLeft: 15}} />
        </View>
        
        {/* Central Play/Pause Button (As Requested) */}
        <TouchableOpacity style={styles.playCircle}>
          <Ionicons name="play" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.rightTools}>
          <TouchableOpacity style={styles.keyframeBtn}>
            <MaterialCommunityIcons name="key-variant" size={18} color="#00E5FF" />
            <Text style={styles.keyLabel}>KEY</Text>
          </TouchableOpacity>
          <Ionicons name="arrow-undo-outline" size={20} color="#fff" style={{marginLeft: 15}} />
        </View>
      </View>

      {/* --- MULTI-LAYER DESKTOP TIMELINE --- */}
      <View style={styles.timelineContainer}>
        <View style={styles.playhead} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.trackStack}>
            {/* Layer 1: Text/Overlay */}
            <View style={[styles.track, {width: 300, backgroundColor: '#E5FF00'}]}>
              <Text style={styles.trackTxt}>TEXT_TITLE</Text>
            </View>
            {/* Layer 2: Main Video */}
            <LinearGradient colors={['#333', '#00E5FF', '#333']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.mainTrack}>
              <Text style={styles.trackTxt}>MAIN_CLIP_4K.mp4</Text>
            </LinearGradient>
            {/* Layer 3: Audio Waveform */}
            <View style={[styles.audioTrack, {width: 700}]}>
              <Text style={styles.audioTxt}>♫ Cinematic_Score_Bass.wav</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* --- DESKTOP TOOL DOCK --- */}
      <View style={styles.toolDock}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Edit', 'Audio', 'Text', 'Overlay', 'Effects', 'Curves', 'HSL', 'Mask', 'Chroma', 'Speed'].map((item, i) => (
            <TouchableOpacity key={i} style={styles.dockItem}>
              <View style={styles.iconBox}><Feather name="box" size={18} color="#fff" /></View>
              <Text style={styles.dockLabel}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  topBar: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 },
  projectName: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  projectMeta: { color: '#444', fontSize: 9 },
  exportBtn: { backgroundColor: '#00E5FF', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5, alignItems: 'center' },
  exportText: { color: '#000', fontSize: 11, fontWeight: 'bold', marginRight: 5 },
  
  previewPanel: { height: '35%', backgroundColor: '#050505', justifyContent: 'center', alignItems: 'center' },
  viewer: { width: '90%', height: '85%', backgroundColor: '#111', borderWidth: 1, borderColor: '#222', justifyContent: 'center', alignItems: 'center' },
  watermark: { color: '#222', fontSize: 10, fontWeight: 'bold' },
  safeAreaGuide: { position: 'absolute', width: '90%', height: '90%', borderStyle: 'dashed', borderWidth: 0.5, borderColor: '#333' },

  controlStrip: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  playCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#00E5FF', justifyContent: 'center', alignItems: 'center', elevation: 10 },
  keyframeBtn: { alignItems: 'center' },
  keyLabel: { color: '#00E5FF', fontSize: 8, fontWeight: 'bold' },

  timelineContainer: { height: 200, backgroundColor: '#080808', borderTopWidth: 1, borderColor: '#111' },
  playhead: { position: 'absolute', left: width/2, height: '100%', width: 2, backgroundColor: '#fff', zIndex: 10 },
  trackStack: { paddingLeft: width/2, paddingVertical: 15 },
  track: { height: 35, borderRadius: 4, marginBottom: 8, justifyContent: 'center', paddingLeft: 10 },
  mainTrack: { width: 800, height: 45, borderRadius: 4, marginBottom: 8, justifyContent: 'center', paddingLeft: 10 },
  audioTrack: { height: 30, backgroundColor: '#1C1C1E', borderRadius: 4, borderLeftWidth: 3, borderLeftColor: '#00E5FF', justifyContent: 'center', paddingLeft: 10 },
  trackTxt: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  audioTxt: { color: '#8E8E93', fontSize: 9 },

  toolDock: { height: 80, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#111' },
  dockItem: { width: 65, alignItems: 'center', justifyContent: 'center' },
  iconBox: { width: 40, height: 40, backgroundColor: '#111', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  dockLabel: { color: '#8E8E93', fontSize: 10 }
});
    
