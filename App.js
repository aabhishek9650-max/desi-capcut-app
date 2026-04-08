import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CrystelProElite() {
  const [engineStatus] = useState('Stable');

  const triggerAction = (name) => {
    Alert.alert("SYSTEM ACTIVE", `${name} engine is warming up...`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER: Minimal & Sharp */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>CRYSTEL <Text style={styles.pro}>PRO</Text></Text>
          <View style={styles.engineRow}>
            <View style={styles.enginePulse} />
            <Text style={styles.engineText}>Engine: {engineStatus} | v1.0.4</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.crownBtn}>
          <MaterialCommunityIcons name="crown" size={20} color="#00E5FF" />
          <Text style={styles.crownText}>ELITE</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        
        {/* HERO SECTION: The Core Power */}
        <View style={styles.heroContainer}>
          <TouchableOpacity style={styles.mainAction} onPress={() => triggerAction("Editor")}>
            <View style={styles.iconCircle}>
              <Ionicons name="add" size={40} color="#000" />
            </View>
            <Text style={styles.actionTitle}>New Project</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideAction} onPress={() => triggerAction("AI Magic")}>
            <MaterialCommunityIcons name="auto-fix" size={32} color="#00E5FF" />
            <Text style={styles.sideTitle}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* MOST POPULAR: Horizontal Flow */}
        <Text style={styles.sectionLabel}>Top Performance Tools</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizScroll}>
          {['1 Tap Reel', 'Auto Color', 'Smart Trim', 'Voice ISO'].map((item, i) => (
            <TouchableOpacity key={i} style={styles.toolCard} onPress={() => triggerAction(item)}>
              <MaterialCommunityIcons name="flash-outline" size={24} color="#00E5FF" />
              <Text style={styles.toolCardText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TOOLKIT: Professional Grid */}
        <Text style={styles.sectionLabel}>Professional Toolkit</Text>
        <View style={styles.grid}>
          {[
            {n: 'Remove BG', i: 'layers-outline'},
            {n: 'AutoCut', i: 'content-cut'},
            {n: 'Enhance', i: 'shimmer'},
            {n: 'Captions', i: 'format-text-variant-outline'},
            {n: 'Velocity', i: 'speedometer'},
            {n: 'Retouch', i: 'face-recognition'}
          ].map((tool, idx) => (
            <TouchableOpacity key={idx} style={styles.gridItem} onPress={() => triggerAction(tool.n)}>
              <View style={styles.gridIconBox}>
                <MaterialCommunityIcons name={tool.i} size={26} color="#FFF" />
              </View>
              <Text style={styles.gridText}>{tool.n}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* NAV BAR: Sleek & Dark */}
      <View style={styles.bottomNav}>
        <MaterialCommunityIcons name="movie-edit" size={28} color="#00E5FF" />
        <MaterialCommunityIcons name="view-dashboard-outline" size={28} color="#444" />
        <MaterialCommunityIcons name="flask-outline" size={28} color="#444" />
        <MaterialCommunityIcons name="account-outline" size={28} color="#444" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: '#FFF', fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  pro: { color: '#00E5FF' },
  engineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  enginePulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#00FF00', marginRight: 6 },
  engineText: { color: '#555', fontSize: 10, fontWeight: 'bold' },
  crownBtn: { flexDirection: 'row', backgroundColor: '#111', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  crownText: { color: '#00E5FF', fontSize: 10, fontWeight: '900', marginLeft: 5 },
  heroContainer: { flexDirection: 'row', padding: 15, height: 180 },
  mainAction: { flex: 1.5, backgroundColor: '#00E5FF', borderRadius: 30, margin: 5, justifyContent: 'center', alignItems: 'center' },
  iconCircle: { backgroundColor: 'rgba(255,255,255,0.3)', padding: 10, borderRadius: 20 },
  actionTitle: { color: '#000', fontWeight: '900', fontSize: 18, marginTop: 10 },
  sideAction: { flex: 1, backgroundColor: '#111', borderRadius: 30, margin: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  sideTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14, marginTop: 8 },
  sectionLabel: { color: '#FFF', fontSize: 16, fontWeight: '700', marginLeft: 25, marginTop: 25, marginBottom: 15 },
  horizScroll: { paddingLeft: 20 },
  toolCard: { backgroundColor: '#0A0A0A', padding: 20, borderRadius: 25, marginRight: 15, width: 130, borderWidth: 1, borderColor: '#151515' },
  toolCardText: { color: '#FFF', fontSize: 12, fontWeight: 'bold', marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15 },
  gridItem: { width: '33.3%', alignItems: 'center', marginBottom: 20 },
  gridIconBox: { width: 65, height: 65, backgroundColor: '#0F0F0F', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  gridText: { color: '#666', fontSize: 11, marginTop: 8, fontWeight: '600' },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderColor: '#111' }
});
    
