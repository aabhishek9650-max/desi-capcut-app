import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function App() {
  const [currentTab, setCurrentTab] = useState('Edit');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- BRAND HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>CRYSTEL <Text style={styles.logoPro}>PRO</Text></Text>
          <Text style={styles.versionTag}>v1.0.3 Stable</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <Feather name="settings" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* --- MAIN LAUNCHER --- */}
        <View style={styles.heroSection}>
          <TouchableOpacity style={styles.newProjectCard}>
            <LinearGradient colors={['#00E5FF', '#0097A7']} style={styles.cardGrad}>
              <View style={styles.iconCircle}>
                <Ionicons name="add" size={35} color="#000" />
              </View>
              <Text style={styles.cardTitle}>New Project</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aiMagicCard}>
            <MaterialCommunityIcons name="auto-fix" size={32} color="#00E5FF" />
            <Text style={styles.aiMagicTitle}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* --- CREATOR PORTAL --- */}
        <TouchableOpacity style={styles.creatorBanner}>
          <LinearGradient colors={['#1C1C1E', '#080808']} style={styles.bannerInner}>
            <View style={styles.rocketIcon}>
              <Ionicons name="rocket" size={24} color="#00E5FF" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.bannerHead}>Become a Creator</Text>
              <Text style={styles.bannerSub}>Get verified & share your templates</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#444" />
          </LinearGradient>
        </TouchableOpacity>

        {/* --- PROFESSIONAL TOOLSET (CapCut Power, Crystel Branding) --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Advanced Tools</Text>
          <View style={styles.tabSwitch}>
             <Text style={[styles.tabItem, {color: '#fff'}]}>Editor</Text>
             <Text style={styles.tabItem}>AI Lab</Text>
          </View>
        </View>

        <View style={styles.toolsGrid}>
          {[
            {label: 'AutoCut', icon: 'flash', type: 'Ionicons'},
            {label: 'Retouch', icon: 'face-recognition', type: 'MaterialCommunityIcons'},
            {label: 'Remove BG', icon: 'person-remove', type: 'Ionicons'},
            {label: 'Enhance', icon: 'sparkles', type: 'Ionicons'},
            {label: 'Captions', icon: 'closed-caption', type: 'MaterialCommunityIcons'},
            {label: 'Speed Curve', icon: 'speedometer', type: 'Ionicons'},
            {label: 'Masking', icon: 'aperture', type: 'Ionicons'},
            {label: 'Chroma Key', icon: 'color-palette', type: 'Ionicons'},
            {label: 'Vocal Isolate', icon: 'mic-off', type: 'Ionicons'}
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.toolBox}>
              <View style={styles.toolIconBg}>
                {item.type === 'Ionicons' ? 
                  <Ionicons name={item.icon} size={22} color="#fff" /> : 
                  <MaterialCommunityIcons name={item.icon} size={22} color="#fff" />
                }
              </View>
              <Text style={styles.toolLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- TEMPLATE SECTION --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Crystel Templates</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 20 }}>
          {[1, 2, 3].map(i => (
            <View key={i} style={styles.tempPlaceholder}>
               <View style={styles.tempBadge}><Text style={styles.tempBadgeText}>HOT</Text></View>
            </View>
          ))}
        </ScrollView>

      </ScrollView>

      {/* --- PRO NAVIGATION --- */}
      <View style={styles.bottomNav}>
        {[
          {n: 'Edit', i: 'cut-outline', ai: 'cut'},
          {n: 'Templates', i: 'copy-outline', ai: 'copy'},
          {n: 'Projects', i: 'folder-open-outline', ai: 'folder-open'},
          {n: 'Profile', i: 'person-outline', ai: 'person'}
        ].map((t, idx) => (
          <TouchableOpacity key={idx} onPress={() => setCurrentTab(t.n)} style={styles.navBtn}>
            <Ionicons name={currentTab === t.n ? t.ai : t.i} size={24} color={currentTab === t.n ? '#00E5FF' : '#8E8E93'} />
            <Text style={[styles.navLabel, {color: currentTab === t.n ? '#00E5FF' : '#8E8E93'}]}>{t.n}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  logoText: { fontSize: 22, fontWeight: '900', color: '#fff', letterSpacing: 1 },
  logoPro: { color: '#00E5FF' },
  versionTag: { color: '#444', fontSize: 10, fontWeight: 'bold', marginTop: -2 },
  heroSection: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginBottom: 25 },
  newProjectCard: { width: '64%', height: 170, borderRadius: 28, overflow: 'hidden' },
  cardGrad: { flex: 1, justifyContent: 'center', padding: 25 },
  iconCircle: { width: 55, height: 55, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  aiMagicCard: { width: '32%', height: 170, backgroundColor: '#111', borderRadius: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  aiMagicTitle: { color: '#00E5FF', fontWeight: 'bold', fontSize: 14, marginTop: 10 },
  creatorBanner: { marginHorizontal: 20, borderRadius: 22, overflow: 'hidden', marginBottom: 30 },
  bannerInner: { padding: 18, flexDirection: 'row', alignItems: 'center' },
  rocketIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: '#1C1C1E', justifyContent: 'center', alignItems: 'center' },
  bannerHead: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bannerSub: { color: '#666', fontSize: 11, marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionLabel: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tabSwitch: { flexDirection: 'row', backgroundColor: '#111', borderRadius: 15, padding: 4 },
  tabItem: { color: '#555', fontSize: 11, paddingHorizontal: 12, paddingVertical: 4, fontWeight: 'bold' },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  toolBox: { width: '33.33%', alignItems: 'center', marginBottom: 20 },
  toolIconBg: { width: 54, height: 54, borderRadius: 18, backgroundColor: '#0A0A0A', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1A1A1A' },
  toolLabel: { color: '#888', fontSize: 10, marginTop: 8, fontWeight: '500' },
  tempPlaceholder: { width: 130, height: 190, backgroundColor: '#111', marginRight: 15, borderRadius: 18 },
  tempBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: '#00E5FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  tempBadgeText: { color: '#000', fontSize: 8, fontWeight: 'bold' },
  seeAll: { color: '#00E5FF', fontSize: 13 },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 85, backgroundColor: '#000', flexDirection: 'row', borderTopWidth: 1, borderColor: '#111' },
  navBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navLabel: { fontSize: 10, marginTop: 4, fontWeight: '600' }
});
          
