import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState('Edit');
  const [isSyncing, setIsSyncing] = useState(false);
  const [engineLoad, setEngineLoad] = useState('Optimum');

  // --- BRAIN: Iron-Clad Logic & Performance Shield ---
  useEffect(() => {
    const shieldCheck = setInterval(() => {
      setIsSyncing(true);
      // Simulating background optimization
      setTimeout(() => {
        setIsSyncing(false);
        setEngineLoad('Peak Performance');
      }, 1500);
    }, 40000);
    return () => clearInterval(shieldCheck);
  }, []);

  const handleAction = useCallback((name, isPro) => {
    if (isPro) {
      Alert.alert("CRYSTEL ELITE", "Commander's Permission Required for Pro Access.");
      return;
    }

    if (timeline.length >= 10) {
      Alert.alert("ENGINE LIMIT", "Army protocol allows max 10 active tracks.");
      return;
    }

    // Realistic Processing Simulation
    setEngineLoad('Processing...');
    setTimeout(() => {
      setTimeline(prev => [...prev, { id: Date.now(), name }]);
      setEngineLoad('Peak Performance');
      Alert.alert("Success", `${name} mode integrated into timeline.`);
    }, 1000);
  }, [timeline]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- HUD: Performance Status --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoMain}>CRYSTEL <Text style={styles.logoSub}>PRO</Text></Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: isSyncing ? '#FFA500' : '#00FF00' }]} />
            <Text style={styles.statusText}>{isSyncing ? 'Optimizing...' : engineLoad} | v1.0.3</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shieldBtn}>
          <MaterialCommunityIcons name="shield-check" size={24} color="#00E5FF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* --- PERFORMANCE ANALYTICS (Bhai Special) --- */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}><Text style={styles.statVal}>{timeline.length}/10</Text><Text style={styles.statSub}>Tracks</Text></View>
          <View style={styles.statBox}><Text style={styles.statVal}>4.8ms</Text><Text style={styles.statSub}>Latency</Text></View>
          <View style={styles.statBox}><Text style={styles.statVal}>Active</Text><Text style={styles.statSub}>Shield</Text></View>
        </View>

        {/* --- CORE ACTIONS --- */}
        <View style={styles.heroRow}>
          <TouchableOpacity style={styles.primeAction} onPress={() => handleAction("New Project", false)}>
            <Ionicons name="add-circle" size={48} color="black" />
            <Text style={styles.primeLabel}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondAction} onPress={() => handleAction("AI Lab", true)}>
            <MaterialCommunityIcons name="auto-fix" size={28} color="#00E5FF" />
            <Text style={styles.secondLabel}>AI Lab</Text>
          </TouchableOpacity>
        </View>

        {/* --- GOD TOOLS (CHEF'S PICK) --- */}
        <Text style={styles.sectionHeader}>Most Popular</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizScroll}>
          {[
            { n: '1 Tap Reel', i: 'zap' },
            { n: 'Auto Color', i: 'palette' },
            { n: 'Edit Score', i: 'star' },
            { n: 'Text to Video', i: 'movie' },
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.glassCard} onPress={() => handleAction(item.n, false)}>
              <MaterialCommunityIcons name={item.i} size={30} color="#00E5FF" />
              <Text style={styles.cardTitle}>{item.n}</Text>
              <Text style={styles.cardSub}>AI Powered</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- TOOLKIT GRID (STABLE) --- */}
        <Text style={styles.sectionHeader}>Professional Toolkit</Text>
        <View style={styles.grid}>
          {[
            { n: 'Remove BG', i: 'layers' },
            { n: 'AutoCut', i: 'content-cut' },
            { n: 'Vocal Iso', i: 'microphone' },
            { n: 'Desktop', i: 'laptop', p: true },
            { n: 'Smart Ads', i: 'bullhorn' },
            { n: 'Velocity', i: 'speedometer' },
            { n: 'Enhance', i: 'shimmer' },
            { n: 'Captions', i: 'text' },
            { n: 'Retouch', i: 'face-recognition' },
          ].map((tool, idx) => (
            <TouchableOpacity key={idx} style={styles.gridItem} onPress={() => handleAction(tool.n, tool.p)}>
              <View style={[styles.gridIcon, tool.p && styles.proIcon]}>
                <MaterialCommunityIcons name={tool.i} size={28} color="white" />
                {tool.p && <View style={styles.proTag}><Text style={styles.proTxt}>PRO</Text></View>}
              </View>
              <Text style={styles.gridLabel}>{tool.n}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* --- ELITE NAV (GLASSMORPHISM) --- */}
      <View style={styles.footerNav}>
        {[
          { id: 'Edit', i: 'content-cut' },
          { id: 'Templates', i: 'layers-outline' },
          { id: 'AI Lab', i: 'flask-outline' },
          { id: 'Me', i: 'account-outline' },
        ].map((tab) => (
          <TouchableOpacity key={tab.id} style={styles.navItem} onPress={() => setActiveTab(tab.id)}>
            <MaterialCommunityIcons name={tab.i} size={26} color={activeTab === tab.id ? "#00E5FF" : "#444"} />
            <Text style={[styles.navText, { color: activeTab === tab.id ? "#00E5FF" : "#444" }]}>{tab.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  logoMain: { color: '#FFF', fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  logoSub: { color: '#00E5FF' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { color: '#444', fontSize: 11, fontWeight: 'bold' },
  shieldBtn: { backgroundColor: '#111', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#222' },
  statsCard: { flexDirection: 'row', backgroundColor: '#080808', marginHorizontal: 20, padding: 15, borderRadius: 20, marginBottom: 25, borderWidth: 0.5, borderColor: '#111' },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  statSub: { color: '#444', fontSize: 10 },
  heroRow: { flexDirection: 'row', paddingHorizontal: 15, height: 160, marginBottom: 25 },
  primeAction: { flex: 1.8, backgroundColor: '#00E5FF', borderRadius: 35, justifyContent: 'center', alignItems: 'center', margin: 5 },
  primeLabel: { color: '#000', fontSize: 18, fontWeight: '900', marginTop: 10 },
  secondAction: { flex: 1, backgroundColor: '#111', borderRadius: 35, justifyContent: 'center', alignItems: 'center', margin: 5, borderWidth: 1, borderColor: '#222' },
  secondLabel: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginTop: 10 },
  sectionHeader: { color: '#FFF', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 25, marginBottom: 15 },
  horizScroll: { paddingLeft: 20, marginBottom: 30 },
  glassCard: { backgroundColor: '#0A0A0A', width: 140, padding: 22, borderRadius: 30, marginRight: 15, borderWidth: 1, borderColor: '#151515', alignItems: 'center' },
  cardTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginTop: 10 },
  cardSub: { color: '#333', fontSize: 10, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15 },
  gridItem: { width: '33.3%', alignItems: 'center', marginBottom: 25 },
  gridIcon: { width: 70, height: 70, backgroundColor: '#0D0D0D', borderRadius: 22, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#181818' },
  proIcon: { borderColor: '#00E5FF44' },
  proTag: { position: 'absolute', top: -5, right: -5, backgroundColor: '#00E5FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  proTxt: { color: '#000', fontSize: 9, fontWeight: '900' },
  gridLabel: { color: '#666', fontSize: 11, marginTop: 10, fontWeight: '600' },
  footerNav: { position: 'absolute', bottom: 0, width: '100%', height: 95, backgroundColor: 'rgba(0,0,0,0.95)', flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderColor: '#111', paddingTop: 15 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 11, marginTop: 6, fontWeight: 'bold' }
});
    
