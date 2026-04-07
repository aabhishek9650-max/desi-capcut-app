import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, StatusBar, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function CrystelPro() {
  const [currentView, setCurrentView] = useState('home'); 
  const [isClipSelected, setIsClipSelected] = useState(false);

  // --- EDITOR COMPONENT ---
  const EditorView = () => (
    <SafeAreaView style={styles.editorContainer}>
      <StatusBar barStyle="light-content" />
      {/* Top Header */}
      <View style={styles.editHeader}>
        <TouchableOpacity onPress={() => setCurrentView('home')}><Ionicons name="chevron-back" size={26} color="#fff" /></TouchableOpacity>
        <View style={styles.resContainer}>
          <Text style={styles.resText}>1080P</Text>
          <Ionicons name="arrow-up-circle" size={20} color="#00E5FF" style={{marginLeft: 10}} />
        </View>
        <TouchableOpacity style={styles.exportIcon}><Feather name="share" size={20} color="#fff" /></TouchableOpacity>
      </View>

      {/* Preview Area */}
      <View style={styles.previewContainer}>
        <View style={styles.canvas}>
          <Text style={styles.canvasDraft}>Draft Preview</Text>
        </View>
      </View>

      {/* Control Bar */}
      <View style={styles.editorControls}>
        <Text style={styles.timestamp}>00:00 / 00:04</Text>
        <TouchableOpacity style={styles.mainPlayBtn}><Ionicons name="play" size={24} color="#000" /></TouchableOpacity>
        <View style={styles.actionIcons}>
          <Ionicons name="arrow-undo" size={22} color="#fff" style={{marginRight: 15}} />
          <Ionicons name="expand" size={22} color="#fff" />
        </View>
      </View>

      {/* Multi-Track Timeline */}
      <View style={styles.timelineBox}>
        <View style={styles.playheadLine} />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: width/2}}>
          <View style={styles.tracks}>
            {/* Video Track */}
            <TouchableOpacity 
              activeOpacity={0.9} 
              onPress={() => setIsClipSelected(!isClipSelected)}
              style={[styles.videoClip, isClipSelected && styles.selectedClip]}
            >
              {isClipSelected && <View style={styles.leftHandle} />}
              <Text style={styles.clipLabel}>Main_Video.mp4</Text>
              {isClipSelected && <View style={styles.rightHandle} />}
            </TouchableOpacity>

            {/* Audio Track */}
            <View style={styles.audioTrack}>
              <View style={styles.audioWave} />
              <Text style={styles.audioLabel}>Add audio</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Contextual Bottom Menu (CapCut Selection Style) */}
      <View style={styles.bottomToolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isClipSelected ? (
            // Selection Tools
            ['Split', 'Speed', 'Animation', 'Style', 'Delete', 'Volume', 'Edit', 'Filters'].map((item, i) => (
              <TouchableOpacity key={i} style={styles.toolItem}>
                <MaterialCommunityIcons name="vector-selection" size={22} color="#fff" />
                <Text style={styles.toolText}>{item}</Text>
              </TouchableOpacity>
            ))
          ) : (
            // Main Tools
            ['Edit', 'Audio', 'Text', 'Overlay', 'Effects', 'Ratio', 'Filters', 'Adjust'].map((item, i) => (
              <TouchableOpacity key={i} style={styles.toolItem}>
                <Ionicons name="cube-outline" size={22} color="#fff" />
                <Text style={styles.toolText}>{item}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  // --- HOME COMPONENT ---
  const HomeView = () => (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeLogo}>CRYSTEL <Text style={{color: '#00E5FF'}}>PRO</Text></Text>
        <Feather name="settings" size={24} color="#fff" />
      </View>
      
      <ScrollView>
        <View style={styles.mainActionRow}>
          <TouchableOpacity style={styles.newProjectCard} onPress={() => setCurrentView('editor')}>
            <Ionicons name="add" size={40} color="#000" />
            <Text style={styles.cardTitle}>New project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoEditCard}>
            <Ionicons name="image" size={30} color="#00E5FF" />
            <Text style={styles.cardTitleSmall}>Edit photo</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Tools Grid (As per your Screenshot) */}
        <Text style={styles.sectionHeading}>Popular tools</Text>
        <View style={styles.toolsGrid}>
          {['AutoCut', 'Retouch', 'AI Enhance', 'Auto Captions', 'Teleprompter', 'AI Image'].map((t, i) => (
            <View key={i} style={styles.gridBox}>
              <View style={styles.iconCircle}><Ionicons name="flash" size={22} color="#fff" /></View>
              <Text style={styles.gridLabel}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  return currentView === 'home' ? <HomeView /> : <EditorView />;
}

const styles = StyleSheet.create({
  // General
  editorContainer: { flex: 1, backgroundColor: '#000' },
  homeContainer: { flex: 1, backgroundColor: '#000' },

  // Home Styles
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  homeLogo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  mainActionRow: { flexDirection: 'row', padding: 15, justifyContent: 'space-between' },
  newProjectCard: { width: '64%', height: 160, backgroundColor: '#00E5FF', borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  photoEditCard: { width: '32%', height: 160, backgroundColor: '#1A1A1A', borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontWeight: 'bold', fontSize: 18, marginTop: 10 },
  cardTitleSmall: { color: '#fff', fontSize: 12, marginTop: 10 },
  sectionHeading: { color: '#fff', fontSize: 18, fontWeight: 'bold', margin: 20 },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  gridBox: { width: '33.3%', alignItems: 'center', marginBottom: 20 },
  iconCircle: { width: 50, height: 50, backgroundColor: '#111', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  gridLabel: { color: '#888', fontSize: 11, marginTop: 5 },

  // Editor Styles
  editHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  resContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', padding: 6, borderRadius: 20 },
  resText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  previewContainer: { height: height * 0.38, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  canvas: { width: '90%', height: '80%', backgroundColor: '#0A0A0A', borderStyle: 'dashed', borderWidth: 1, borderColor: '#333', justifyContent: 'center', alignItems: 'center' },
  canvasDraft: { color: '#222', fontWeight: 'bold' },
  editorControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 60 },
  timestamp: { color: '#888', fontSize: 12 },
  mainPlayBtn: { width: 44, height: 44, backgroundColor: '#fff', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  actionIcons: { flexDirection: 'row' },
  timelineBox: { height: 220, backgroundColor: '#080808', borderTopWidth: 1, borderColor: '#1A1A1A' },
  playheadLine: { position: 'absolute', left: width/2, height: '100%', width: 2, backgroundColor: '#fff', zIndex: 10 },
  tracks: { paddingVertical: 30 },
  videoClip: { width: 300, height: 60, backgroundColor: '#2C2C2E', borderRadius: 4, justifyContent: 'center', paddingLeft: 15 },
  selectedClip: { borderColor: '#fff', borderWidth: 2 },
  leftHandle: { position: 'absolute', left: -5, width: 10, height: 40, backgroundColor: '#fff', borderRadius: 2, top: 10 },
  rightHandle: { position: 'absolute', right: -5, width: 10, height: 40, backgroundColor: '#fff', borderRadius: 2, top: 10 },
  clipLabel: { color: '#fff', fontSize: 10 },
  audioTrack: { marginTop: 20, width: 250, height: 35, backgroundColor: '#1C1C1E', borderRadius: 4, borderStyle: 'dashed', borderWidth: 1, borderColor: '#333', justifyContent: 'center', paddingLeft: 10 },
  audioLabel: { color: '#555', fontSize: 10 },
  bottomToolbar: { height: 90, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#111' },
  toolItem: { width: 75, alignItems: 'center', justifyContent: 'center' },
  toolText: { color: '#fff', fontSize: 10, marginTop: 5 }
});
    
