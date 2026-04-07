import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [inEditor, setInEditor] = useState(false);

  // --- EDITOR SCREEN INTERFACE ---
  if (inEditor) {
    return (
      <SafeAreaView style={styles.editorContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => setInEditor(false)}><Ionicons name="chevron-back" size={28} color="#fff" /></TouchableOpacity>
          <View style={styles.resPicker}><Text style={styles.resText}>1080P v</Text></View>
          <TouchableOpacity style={styles.exportBtn}><Text style={styles.exportText}>EXPORT</Text></TouchableOpacity>
        </View>

        <View style={styles.previewArea}>
          <View style={styles.placeholderVideo}>
            <Ionicons name="play-circle" size={80} color="rgba(255,255,255,0.2)" />
          </View>
        </View>

        {/* MIDDLE CONTROL BAR (Play/Pause & Professional Tools) */}
        <View style={styles.midBar}>
          <Text style={styles.timer}>00:00:00</Text>
          <TouchableOpacity style={styles.mainPlayBtn}>
            <Ionicons name="play" size={20} color="#000" />
          </TouchableOpacity>
          <View style={styles.midIcons}>
             <TouchableOpacity style={styles.keyIcon}><MaterialCommunityIcons name="key-variant" size={20} color="#00E5FF" /><Text style={styles.keyTxt}>KEY</Text></TouchableOpacity>
             <Ionicons name="arrow-undo" size={20} color="#fff" style={{marginLeft: 15}} />
             <Ionicons name="arrow-redo" size={20} color="#fff" style={{marginLeft: 15}} />
          </View>
        </View>

        {/* MULTI-LAYER TIMELINE */}
        <View style={styles.timelineArea}>
          <View style={styles.playhead} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: width/2}}>
            <View style={styles.trackStack}>
              <View style={[styles.track, {width: 600, backgroundColor: '#00E5FF'}]}><Text style={styles.trackText}>Video Track 1</Text></View>
              <View style={[styles.track, {width: 400, backgroundColor: '#FF00E5', marginTop: 5}]}><Text style={styles.trackText}>Audio: Phonk_Beat.mp3</Text></View>
              <View style={[styles.track, {width: 200, backgroundColor: '#E5FF00', marginTop: 5}]}><Text style={styles.trackText}>Text: Welcome</Text></View>
            </View>
          </ScrollView>
        </View>

        {/* CAPCUT FULL FEATURE TOOLBAR (Scrollable) */}
        <View style={styles.bottomToolbar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              {n:'Edit', i:'cut-outline'}, {n:'Audio', i:'musical-notes-outline'}, {n:'Text', i:'text-outline'},
              {n:'Overlay', i:'copy-outline'}, {n:'Effects', i:'sparkles-outline'}, {n:'Filters', i:'color-filter-outline'},
              {n:'Format', i:'expand-outline'}, {n:'Canvas', i:'browsers-outline'}, {n:'Adjust', i:'options-outline'},
              {n:'Stickers', i:'happy-outline'}, {n:'Auto Captions', i:'chatbox-ellipses-outline'}, {n:'Remove BG', i:'person-remove-outline'},
              {n:'Style', i:'shirt-outline'}, {n:'Mask', i:'aperture-outline'}, {n:'Chromakey', i:'color-palette-outline'}
            ].map((tool, i) => (
              <TouchableOpacity key={i} style={styles.toolItem}>
                <Ionicons name={tool.i} size={24} color="#fff" />
                <Text style={styles.toolLabel}>{tool.n}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // --- HOME SCREEN INTERFACE ---
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.homeHeader}>
        <Text style={styles.brand}>CRYSTEL <Text style={{color: '#00E5FF'}}>PRO</Text></Text>
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Action Cards */}
        <View style={styles.heroRow}>
          <TouchableOpacity style={styles.newProjectCard} onPress={() => setInEditor(true)}>
            <LinearGradient colors={['#00E5FF', '#00838F']} style={styles.gradCard}>
              <Ionicons name="add-circle" size={45} color="#000" />
              <Text style={styles.cardBigTitle}>New Project</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.aiCard}>
             <MaterialCommunityIcons name="auto-fix" size={40} color="#00E5FF" />
             <Text style={styles.aiCardTitle}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* BECOME A CREATOR (PREMIUM BANNER) */}
        <TouchableOpacity style={styles.creatorBanner}>
          <LinearGradient colors={['#1C1C1E', '#0D0D0D']} style={styles.bannerInner}>
            <View style={styles.rocketIcon}><Ionicons name="rocket" size={26} color="#00E5FF" /></View>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text style={styles.bannerHead}>Become a Creator</Text>
              <Text style={styles.bannerSub}>Get verified badge & share templates</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </LinearGradient>
        </TouchableOpacity>

        {/* TEMPLATES SECTION */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hot Templates</Text>
          <Text style={styles.viewAll}>See All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 20}}>
          {[1,2,3,4].map(i => (
            <View key={i} style={styles.tempBox}>
               <View style={styles.tempThumb} />
               <Text style={styles.tempTag}>Trending</Text>
            </View>
          ))}
        </ScrollView>

        {/* ADVANCED AI TOOLS GRID */}
        <Text style={styles.sectionTitle}>AI Lab (v20.5.7)</Text>
        <View style={styles.aiGrid}>
          {['Auto Reframe', 'AI Scripts', 'Vocal Isolate', 'Image Enhancer', 'Text to Video', 'Body Retouch'].map((tool, i) => (
            <View key={i} style={styles.gridItem}>
              <View style={styles.gridIcon}><Ionicons name="flash" size={18} color="#00E5FF" /></View>
              <Text style={styles.gridLabel}>{tool}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FOOTER TAB BAR */}
      <View style={styles.footerTab}>
        <TouchableOpacity style={styles.tab}><Ionicons name="home" size={24} color="#00E5FF" /><Text style={[styles.tabText, {color: '#00E5FF'}]}>Edit</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Ionicons name="layers-outline" size={24} color="#8E8E93" /><Text style={styles.tabText}>Templates</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Ionicons name="mail-outline" size={24} color="#8E8E93" /><Text style={styles.tabText}>Inbox</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Ionicons name="person-outline" size={24} color="#8E8E93" /><Text style={styles.tabText}>Me</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Editor Styles
  editorContainer: { flex: 1, backgroundColor: '#000' },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  resPicker: { backgroundColor: '#1A1A1A', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 5 },
  resText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  exportBtn: { backgroundColor: '#00E5FF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8 },
  exportText: { color: '#000', fontWeight: 'bold' },
  previewArea: { height: height * 0.38, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' },
  midBar: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  mainPlayBtn: { backgroundColor: '#00E5FF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  keyIcon: { alignItems: 'center' },
  keyTxt: { color: '#00E5FF', fontSize: 8, fontWeight: 'bold' },
  timer: { color: '#8E8E93', fontSize: 12 },
  timelineArea: { height: 160, backgroundColor: '#111', justifyContent: 'center' },
  playhead: { position: 'absolute', left: width/2, height: '100%', width: 2, backgroundColor: '#fff', zIndex: 10 },
  trackStack: { paddingVertical: 10 },
  track: { height: 40, borderRadius: 4, justifyContent: 'center', paddingLeft: 10 },
  trackText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  bottomToolbar: { position: 'absolute', bottom: 0, height: 90, backgroundColor: '#000', borderTopWidth: 1, borderColor: '#222' },
  toolItem: { alignItems: 'center', width: 75, justifyContent: 'center', height: '100%' },
  toolLabel: { color: '#8E8E93', fontSize: 10, marginTop: 5 },

  // Home Styles
  homeContainer: { flex: 1, backgroundColor: '#000' },
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  brand: { fontSize: 24, fontWeight: '900', color: '#fff' },
  heroRow: { flexDirection: 'row', padding: 20, justifyContent: 'space-between' },
  newProjectCard: { width: '60%', height: 160, borderRadius: 25, overflow: 'hidden' },
  gradCard: { flex: 1, justifyContent: 'center', padding: 20 },
  cardBigTitle: { color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  aiCard: { width: '35%', height: 160, backgroundColor: '#1C1C1E', borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  aiCardTitle: { color: '#00E5FF', fontWeight: 'bold', marginTop: 10 },
  creatorBanner: { marginHorizontal: 20, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#222' },
  bannerInner: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  rocketIcon: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center' },
  bannerHead: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bannerSub: { color: '#666', fontSize: 11 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 20 },
  viewAll: { color: '#00E5FF', fontSize: 12 },
  tempBox: { width: 120, height: 180, backgroundColor: '#1C1C1E', marginRight: 15, borderRadius: 15, overflow: 'hidden' },
  tempTag: { position: 'absolute', bottom: 10, left: 10, color: '#fff', fontSize: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 4, borderRadius: 4 },
  aiGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 15, justifyContent: 'space-between' },
  gridItem: { width: '30%', backgroundColor: '#0D0D0D', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 15 },
  gridIcon: { marginBottom: 8 },
  gridLabel: { color: '#8E8E93', fontSize: 10, textAlign: 'center' },
  footerTab: { flexDirection: 'row', height: 80, backgroundColor: '#050505', borderTopWidth: 1, borderColor: '#1A1A1A', justifyContent: 'space-around', alignItems: 'center' },
  tabText: { color: '#8E8E93', fontSize: 10, marginTop: 4 }
});
