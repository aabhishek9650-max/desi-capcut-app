import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [view, setView] = useState('home'); 

  // --- 1. PRO EDITOR SCREEN (WITH ALL DESKTOP FEATURES) ---
  if (view === 'editor') {
    return (
      <SafeAreaView style={styles.editorContainer}>
        <StatusBar barStyle="light-content" />
        
        {/* Top Header: 4K & Export */}
        <View style={styles.editHeader}>
          <TouchableOpacity onPress={() => setView('home')}><Ionicons name="close" size={28} color="#fff" /></TouchableOpacity>
          <View style={styles.resContainer}>
            <Text style={styles.resText}>4K / 60FPS <Ionicons name="chevron-down" size={12} color="#fff" /></Text>
          </View>
          <TouchableOpacity style={styles.exportBtn}><Text style={styles.exportText}>EXPORT</Text></TouchableOpacity>
        </View>

        {/* Preview Engine */}
        <View style={styles.previewContainer}>
          <View style={styles.videoWindow}>
             <Text style={styles.engineWatermark}>CRYSTEL ENGINE v1.0.3</Text>
             <View style={styles.safeAreaLine} />
          </View>
        </View>

        {/* Desktop Control Bar (Center Play Button) */}
        <View style={styles.controlBar}>
          <View style={styles.timeInfo}><Text style={styles.timeBold}>00:00</Text><Text style={styles.timeDim}> / 00:15</Text></View>
          
          <TouchableOpacity style={styles.masterPlay}>
            <Ionicons name="play" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.editFastTools}>
             <TouchableOpacity style={styles.keyframeAction}>
                <MaterialCommunityIcons name="key-variant" size={20} color="#00E5FF" />
                <Text style={styles.keyLabel}>KEY</Text>
             </TouchableOpacity>
             <Ionicons name="arrow-undo" size={22} color="#fff" style={{marginLeft: 15}} />
             <Ionicons name="arrow-redo" size={22} color="#fff" style={{marginLeft: 15}} />
          </View>
        </View>

        {/* Desktop Multi-Layer Timeline */}
        <View style={styles.timelineZone}>
          <View style={styles.playheadLine} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: width/2}}>
            <View style={styles.layerStack}>
              <View style={[styles.layer, {width: 200, backgroundColor: '#E5FF00'}]}><Text style={styles.layerLabel}>Text Overlay</Text></View>
              <LinearGradient colors={['#333', '#00E5FF', '#333']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.mainVideoLayer}>
                <Text style={styles.layerLabelBold}>MAIN_CLIP_4K_60FPS.mp4</Text>
              </LinearGradient>
              <View style={[styles.layer, {width: 500, backgroundColor: '#1A1A1A', borderLeftWidth: 3, borderLeftColor: '#00E5FF'}]}>
                <Text style={styles.layerLabelDim}>♫ Background_Phonk.wav</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ALL FEATURES TOOLBAR (CapCut v20.5.7 Level) */}
        <View style={styles.featureToolbar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              {n:'Edit', i:'cut-outline'}, {n:'Audio', i:'musical-notes-outline'}, {n:'Text', i:'text-outline'},
              {n:'Overlay', i:'copy-outline'}, {n:'Effects', i:'sparkles-outline'}, {n:'Filters', i:'color-filter-outline'},
              {n:'Adjust', i:'options-outline'}, {n:'Remove BG', i:'person-remove-outline'}, {n:'HSL', i:'aperture-outline'},
              {n:'Curves', i:'trending-up-outline'}, {n:'Velocity', i:'speedometer-outline'}, {n:'Mask', i:'grid-outline'},
              {n:'Chroma', i:'color-palette-outline'}, {n:'Stabilize', i:'videocam-outline'}, {n:'Noise', i:'volume-mute-outline'}
            ].map((tool, idx) => (
              <TouchableOpacity key={idx} style={styles.toolUnit}>
                <Ionicons name={tool.i} size={22} color="#fff" />
                <Text style={styles.toolName}>{tool.n}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // --- 2. HOME SCREEN (FULL AI LAB & CREATOR MODE) ---
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.homeHeader}>
        <View>
          <Text style={styles.brandTitle}>CRYSTEL <Text style={{color:'#00E5FF'}}>PRO</Text></Text>
          <Text style={styles.verText}>v1.0.3 Stable Build</Text>
        </View>
        <Feather name="settings" size={24} color="#fff" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainActionRow}>
          <TouchableOpacity style={styles.newProjBtn} onPress={() => setView('editor')}>
            <LinearGradient colors={['#00E5FF', '#0097A7']} style={styles.gradFull}>
              <Ionicons name="add-circle" size={45} color="#000" />
              <Text style={styles.btnMainTxt}>New Project</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <View style={styles.quickCol}>
            <TouchableOpacity style={styles.qCard}><MaterialCommunityIcons name="auto-fix" size={26} color="#00E5FF" /><Text style={styles.qTxt}>AutoCut</Text></TouchableOpacity>
            <TouchableOpacity style={styles.qCard}><Ionicons name="images-outline" size={26} color="#00E5FF" /><Text style={styles.qTxt}>Edit Photo</Text></TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.creatorPortal}>
          <LinearGradient colors={['#1A1A1A', '#000']} style={styles.portalGrad}>
             <View style={styles.rocketCircle}><Ionicons name="rocket" size={22} color="#00E5FF" /></View>
             <View style={{flex: 1, marginLeft: 15}}>
                <Text style={styles.portalTitle}>Become a Creator</Text>
                <Text style={styles.portalSub}>Join the elite Crystel community</Text>
             </View>
             <Ionicons name="chevron-forward" size={18} color="#444" />
          </LinearGradient>
        </TouchableOpacity>

        {/* ALL AI FEATURES GRID */}
        <Text style={styles.sectionHead}>Advanced AI Lab</Text>
        <View style={styles.aiGrid}>
          {['AI Remove BG', 'Image Enhance', 'Auto Captions', 'AI Script', 'Teleprompter', 'Image to Video', 'Body Retouch', 'Vocal Isolate', 'Auto Reframe'].map((tool, i) => (
            <View key={i} style={styles.aiBox}>
              <View style={styles.aiIconCircle}><Ionicons name="flash" size={20} color="#00E5FF" /></View>
              <Text style={styles.aiLabel}>{tool}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <View style={styles.tab}><Ionicons name="cut" size={24} color="#00E5FF" /><Text style={styles.tabTextActive}>Edit</Text></View>
        <View style={styles.tab}><Ionicons name="layers-outline" size={24} color="#888" /><Text style={styles.tabText}>Templates</Text></View>
        <View style={styles.tab}><Ionicons name="person-outline" size={24} color="#888" /><Text style={styles.tabText}>Me</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // General
  homeContainer: { flex: 1, backgroundColor: '#000' },
  editorContainer: { flex: 1, backgroundColor: '#000' },
  
  // Home Screen
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  brandTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  verText: { color: '#444', fontSize: 10, fontWeight: 'bold', marginTop: -5 },
  mainActionRow: { flexDirection: 'row', padding: 20, justifyContent: 'space-between' },
  newProjBtn: { width: '64%', height: 170, borderRadius: 30, overflow: 'hidden' },
  gradFull: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnMainTxt: { color: '#000', fontWeight: 'bold', fontSize: 20, marginTop: 10 },
  quickCol: { width: '32%', justifyContent: 'space-between' },
  qCard: { backgroundColor: '#111', height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  qTxt: { color: '#fff', fontSize: 10, marginTop: 5 },
  creatorPortal: { marginHorizontal: 20, borderRadius: 22, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
  portalGrad: { padding: 18, flexDirection: 'row', alignItems: 'center' },
  rocketCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  portalTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  portalSub: { color: '#666', fontSize: 11 },
  sectionHead: { color: '#fff', fontSize: 18, fontWeight: 'bold', margin: 20 },
  aiGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  aiBox: { width: '33.3%', alignItems: 'center', marginBottom: 25 },
  aiIconCircle: { width: 55, height: 55, borderRadius: 18, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  aiLabel: { color: '#888', fontSize: 10, marginTop: 8, textAlign: 'center' },
  bottomBar: { height: 85, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderColor: '#111' },
  tab: { alignItems: 'center' },
  tabText: { color: '#888', fontSize: 10, marginTop: 4 },
  tabTextActive: { color: '#00E5FF', fontSize: 10, marginTop: 4 },

  // Editor Screen
  editHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  resContainer: { backgroundColor: '#111', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  resText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  exportBtn: { backgroundColor: '#00E5FF', paddingHorizontal: 18, paddingVertical: 8, borderRadius: 10 },
  exportText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  previewContainer: { height: height * 0.4, backgroundColor: '#050505', justifyContent: 'center', alignItems: 'center' },
  videoWindow: { width: '90%', height: '85%', backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 0.5, borderColor: '#333' },
  engineWatermark: { color: '#222', fontSize: 10, fontWeight: 'bold' },
  controlBar: { height: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  masterPlay: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#00E5FF', justifyContent: 'center', alignItems: 'center', elevation: 10 },
  timeInfo: { width: 90 },
  timeBold: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  timeDim: { color: '#555', fontSize: 12 },
  editFastTools: { flexDirection: 'row', alignItems: 'center', width: 90, justifyContent: 'flex-end' },
  keyframeAction: { alignItems: 'center' },
  keyLabel: { color: '#00E5FF', fontSize: 8, fontWeight: 'bold' },
  timelineZone: { height: 180, backgroundColor: '#080808' },
  playheadLine: { position: 'absolute', left: width/2, height: '100%', width: 2, backgroundColor: '#fff', zIndex: 10 },
  layerStack: { paddingVertical: 20 },
  layer: { height: 35, borderRadius: 6, justifyContent: 'center', paddingLeft: 10, marginBottom: 8 },
  mainVideoLayer: { width: 800, height: 50, borderRadius: 6, justifyContent: 'center', paddingLeft: 15, marginBottom: 8 },
  layerLabel: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  layerLabelBold: { color: '#000', fontSize: 11, fontWeight: '900' },
  layerLabelDim: { color: '#888', fontSize: 10 },
  featureToolbar: { height: 90, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#111' },
  toolUnit: { width: 75, alignItems: 'center', justifyContent: 'center' },
  toolName: { color: '#888', fontSize: 10, marginTop: 6 }
});
      
