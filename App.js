import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert, Dimensions, Animated } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState('Edit');
  const [engineStatus, setEngineStatus] = useState('Ready');

  // --- BRAIN FIX: Auto-Sync & Performance Monitor ---
  useEffect(() => {
    const monitor = setInterval(() => {
      setEngineStatus('Optimizing...');
      setTimeout(() => setEngineStatus('Stable'), 2000);
    }, 45000);
    return () => clearInterval(monitor);
  }, []);

  // --- POWER FIX: Smooth Execution Engine ---
  const handleTactileAction = useCallback((name, isPro) => {
    if (isPro) {
      Alert.alert("CRYSTEL ELITE", "Bhai, ye feature Pro members ke liye hai. Upgrade karke 'World Level' editing unlock karo!");
      return;
    }

    if (timeline.length >= 10) {
      Alert.alert("MAX LIMIT REACHED", "Army rules: 10 videos max for peak performance. Purani files clear karo!");
      return;
    }

    setEngineStatus('Processing...');
    setTimeout(() => {
      setEngineStatus('Stable');
      setTimeline(prev => [...prev, { id: Date.now(), name }]);
      Alert.alert("Success", `${name} engine has been fired up!`);
    }, 800);
  }, [timeline]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- ELITE HUD (Header) --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoMain}>CRYSTEL <Text style={styles.logoSub}>PRO</Text></Text>
          <View style={styles.engineBadge}>
            <View style={[styles.pulseDot, { backgroundColor: engineStatus === 'Stable' ? '#00FF00' : '#FFA500' }]} />
            <Text style={styles.engineText}>Engine: {engineStatus} | v1.0.3</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.proMemberBtn}>
          <MaterialCommunityIcons name="crown" size={20} color="#00E5FF" />
          <Text style={styles.proMemberText}>PRO</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* --- PERFORMANCE ANALYTICS --- */}
        <View style={styles.analyticsBar}>
          <View style={styles.anaItem}>
            <Text style={styles.anaVal}>{timeline.length}/10</Text>
            <Text style={styles.anaLabel}>Files</Text>
          </View>
          <View style={styles.anaDivider} />
          <View style={styles.anaItem}>
            <Text style={styles.anaVal}>98%</Text>
            <Text style={styles.anaLabel}>AI Speed</Text>
          </View>
          <View style={styles.anaDivider} />
          <View style={styles.anaItem}>
            <Text style={styles.anaVal}>4K</Text>
            <Text style={styles.anaLabel}>Support</Text>
          </View>
        </View>

        {/* --- PRIMARY ACTIONS --- */}
        <View style={styles.heroRow}>
          <TouchableOpacity style={styles.createCard} onPress={() => handleTactileAction("New Project", false)}>
            <View style={styles.iconCircleLarge}><Ionicons name="add" size={40} color="black" /></View>
            <Text style={styles.createTitle}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.magicCard} onPress={() => handleTactileAction("AI Lab", true)}>
            <MaterialCommunityIcons name="auto-fix" size={30} color="#00E5FF" />
            <Text style={styles.magicTitle}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* --- MOST POPULAR TOOLS (CHEF'S SPECIAL DESIGN) --- */}
        <Text style={styles.sectionLabel}>Most Popular Tools</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularScroll}>
          {[
            { n: '1 Tap Reel', i: 'play-box-outline', d: 'Fast AI', icon: 'zap' },
            { n: 'Auto Color', i: 'palette-outline', d: 'Grading', icon: 'brush' },
            { n: 'Edit Score', i: 'star-circle-outline', d: 'Analysis', icon: 'trending-up' },
            { n: 'Text to Video', i: 'video-plus-outline', d: 'Creation', icon: 'cpu' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.glassCard} onPress={() => handleTactileAction(item.n, false)}>
              <MaterialCommunityIcons name={item.i} size={35} color="#00E5FF" />
              <Text style={styles.glassTitle}>{item.n}</Text>
              <Text style={styles.glassDesc}>{item.d}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- FULL TOOLKIT GRID --- */}
        <Text style={styles.sectionLabel}>Professional Toolkit</Text>
        <View style={styles.toolkitGrid}>
          {[
            { n: 'Remove BG', i: 'image-remove' },
            { n: 'AutoCut', i: 'content-cut' },
            { n: 'Vocal Iso', i: 'waveform' },
            { n: 'Desktop', i: 'laptop', pro: true },
            { n: 'Smart Ads', i: 'bullhorn' },
            { n: 'Velocity', i: 'clock-fast' },
            { n: 'Enhance', i: 'shimmer' },
            { n: 'Script AI', i: 'script-text' },
            { n: 'Captions', i: 'closed-caption' },
          ].map((tool, idx) => (
            <TouchableOpacity key={idx} style={styles.toolItem} onPress={() => handleTactileAction(tool.n, tool.pro)}>
              <View style={[styles.toolIconBox, tool.pro && styles.proBorderColor]}>
                <MaterialCommunityIcons name={tool.i} size={28} color="white" />
                {tool.pro && <View style={styles.miniBadge}><Text style={styles.miniText}>PRO</Text></View>}
              </View>
              <Text style={styles.toolName}>{tool.n}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* --- ELITE NAV BAR (GLASSMORPHISM) --- */}
      <View style={styles.bottomNav}>
        {[
          { id: 'Edit', i: 'content-cut' },
          { id: 'Templates', i: 'layers-triple-outline' },
          { id: 'AI Lab', i: 'flask-outline' },
          { id: 'Me', i: 'account-circle-outline' },
        ].map((tab) => (
          <TouchableOpacity key={tab.id} style={styles.navBtn} onPress={() => setActiveTab(tab.id)}>
            <MaterialCommunityIcons 
              name={tab.i} 
              size={28} 
              color={activeTab === tab.id ? "#00E5FF" : "#555"} 
            />
            <Text style={[styles.navText, { color: activeTab === tab.id ? "#00E5FF" : "#555" }]}>{tab.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#111' },
  logoMain: { color: '#FFF', fontSize: 26, fontWeight: '900', letterSpacing: 1.5 },
  logoSub: { color: '#00E5FF' },
  engineBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  engineText: { color: '#444', fontSize: 11, fontWeight: 'bold' },
  proMemberBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: '#00E5FF55' },
  proMemberText: { color: '#00E5FF', fontWeight: 'bold', fontSize: 12, marginLeft: 5 },
  analyticsBar: { flexDirection: 'row', backgroundColor: '#080808', margin: 20, padding: 15, borderRadius: 25, borderWidth: 1, borderColor: '#151515' },
  anaItem: { flex: 1, alignItems: 'center' },
  anaVal: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  anaLabel: { color: '#444', fontSize: 10, marginTop: 2 },
  anaDivider: { width: 1, height: '80%', backgroundColor: '#222' },
  heroRow: { flexDirection: 'row', paddingHorizontal: 15, height: 160, marginBottom: 25 },
  createCard: { flex: 1.8, backgroundColor: '#00E5FF', borderRadius: 35, justifyContent: 'center', alignItems: 'center', margin: 5, shadowColor: '#00E5FF', shadowRadius: 15, shadowOpacity: 0.4 },
  iconCircleLarge: { backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderRadius: 20 },
  createTitle: { color: '#000', fontSize: 22, fontWeight: '900', marginTop: 12 },
  magicCard: { flex: 1, backgroundColor: '#0F0F0F', borderRadius: 35, justifyContent: 'center', alignItems: 'center', margin: 5, borderWidth: 1, borderColor: '#222' },
  magicTitle: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginTop: 10 },
  sectionLabel: { color: '#FFF', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 25, marginBottom: 15 },
  popularScroll: { paddingLeft: 20, marginBottom: 30 },
  glassCard: { backgroundColor: '#0A0A0A', width: 140, padding: 25, borderRadius: 30, marginRight: 15, alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  glassTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginTop: 12 },
  glassDesc: { color: '#444', fontSize: 10, marginTop: 4 },
  toolkitGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15 },
  toolItem: { width: '33.3%', alignItems: 'center', marginBottom: 25 },
  toolIconBox: { width: 75, height: 75, backgroundColor: '#0D0D0D', borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#181818' },
  proBorderColor: { borderColor: '#00E5FF77' },
  miniBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#00E5FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  miniText: { color: '#000', fontSize: 9, fontWeight: '900' },
  toolName: { color: '#777', fontSize: 11, marginTop: 10, fontWeight: '600' },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 95, backgroundColor: 'rgba(0,0,0,0.95)', flexDirection: 'row', borderTopWidth: 1, borderColor: '#111', paddingTop: 15 },
  navBtn: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 11, marginTop: 6, fontWeight: 'bold' }
});
        
