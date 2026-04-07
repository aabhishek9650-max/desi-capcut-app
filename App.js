import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 1. BRANDING & SETTINGS */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>CRYSTEL <Text style={{color:'#00E5FF'}}>PRO</Text></Text>
            <Text style={styles.buildText}>v1.0.3 Stable Build</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Feather name="settings" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* 2. MAIN LAUNCHER (BIG BUTTONS) */}
        <View style={styles.launchRow}>
          <TouchableOpacity style={styles.bigAction}>
            <LinearGradient colors={['#00E5FF', '#0097A7']} style={styles.actionGrad}>
              <Ionicons name="add" size={40} color="#000" />
              <Text style={styles.actionMainTxt}>New Project</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sideAction}>
            <View style={styles.aiMagicBox}>
              <MaterialCommunityIcons name="auto-fix" size={28} color="#00E5FF" />
              <Text style={styles.sideTxt}>AI Magic</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 3. DRAFTS / RECENT PROJECTS (The 'Desktop' Feel) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.draftScroll}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.draftCard}>
              <View style={styles.draftThumb}>
                <Ionicons name="play-circle" size={24} color="rgba(255,255,255,0.5)" />
              </View>
              <Text style={styles.draftName}>Project_040{item}</Text>
              <Text style={styles.draftDate}>07/04/2026</Text>
            </View>
          ))}
        </ScrollView>

        {/* 4. POPULAR TOOLS WITH TABS */}
        <View style={styles.toolHeader}>
          <Text style={styles.sectionTitle}>Popular tools</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.activeTab}><Text style={styles.activeTabText}>General</Text></TouchableOpacity>
            <TouchableOpacity style={styles.inactiveTab}><Text style={styles.inactiveTabText}>Marketing</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.toolsGrid}>
          {[
            {n: 'Remove BG', i: 'person-remove-outline'}, {n: 'AutoCut', i: 'flash-outline'},
            {n: 'Retouch', i: 'face-recognition-outline'}, {n: 'Auto Captions', i: 'closed-captioning-outline'},
            {n: 'AI Script', i: 'document-text-outline'}, {n: 'Teleprompter', i: 'tv-outline'},
            {n: 'Image to Video', i: 'image-outline'}, {n: 'Vocal Isolate', i: 'mic-outline'},
            {n: 'Desktop Edit', i: 'laptop-outline'}, {n: 'Smart Ads', i: 'megaphone-outline'},
            {n: 'Velocity', i: 'speedometer-outline'}, {n: 'Enhance', i: 'sparkles-outline'}
          ].map((tool, index) => (
            <TouchableOpacity key={index} style={styles.toolItem}>
              <View style={styles.toolIconBox}>
                <Ionicons name={tool.i} size={24} color="#fff" />
                {index === 8 && <View style={styles.proBadge}><Text style={styles.proText}>Pro</Text></View>}
              </View>
              <Text style={styles.toolLabel}>{tool.n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 5. COMMUNITY BANNER */}
        <TouchableOpacity style={styles.banner}>
          <LinearGradient colors={['#1A1A1A', '#080808']} style={styles.bannerGrad}>
            <Ionicons name="rocket" size={24} color="#00E5FF" />
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={styles.bannerMain}>Become a Creator</Text>
              <Text style={styles.bannerSub}>Get verified badge & share templates</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#444" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={{height: 100}} /> 
      </ScrollView>

      {/* BOTTOM NAV BAR */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}><Ionicons name="cut" size={24} color="#00E5FF" /><Text style={[styles.navText, {color:'#00E5FF'}]}>Edit</Text></View>
        <View style={styles.navItem}><MaterialCommunityIcons name="layers-outline" size={24} color="#888" /><Text style={styles.navText}>Templates</Text></View>
        <View style={styles.navItem}><Ionicons name="flask-outline" size={24} color="#888" /><Text style={styles.navText}>AI Lab</Text></View>
        <View style={styles.navItem}><Ionicons name="person-outline" size={24} color="#888" /><Text style={styles.navText}>Me</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  brandTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', letterSpacing: 1 },
  buildText: { color: '#444', fontSize: 10, fontWeight: 'bold', marginTop: -2 },
  settingsBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },

  launchRow: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', marginBottom: 25 },
  bigAction: { width: '64%', height: 160, borderRadius: 25, overflow: 'hidden' },
  actionGrad: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actionMainTxt: { color: '#000', fontWeight: 'bold', fontSize: 18, marginTop: 8 },
  sideAction: { width: '32%' },
  aiMagicBox: { flex: 1, backgroundColor: '#111', borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  sideTxt: { color: '#fff', fontSize: 12, marginTop: 8, fontWeight: '500' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#00E5FF', fontSize: 12 },
  
  draftScroll: { paddingLeft: 20, marginBottom: 30 },
  draftCard: { width: 120, marginRight: 15 },
  draftThumb: { width: 120, height: 120, backgroundColor: '#111', borderRadius: 20, marginBottom: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  draftName: { color: '#fff', fontSize: 11, fontWeight: '500' },
  draftDate: { color: '#444', fontSize: 9 },

  toolHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginBottom: 20 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#111', borderRadius: 20, padding: 4 },
  activeTab: { backgroundColor: '#222', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  activeTabText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  inactiveTab: { paddingHorizontal: 12, paddingVertical: 6 },
  inactiveTabText: { color: '#666', fontSize: 11 },

  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  toolItem: { width: '25%', alignItems: 'center', marginBottom: 20 },
  toolIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  toolLabel: { color: '#888', fontSize: 10, textAlign: 'center' },
  proBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#00E5FF', paddingHorizontal: 4, borderRadius: 4 },
  proText: { color: '#000', fontSize: 8, fontWeight: 'bold' },

  banner: { marginHorizontal: 20, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#222' },
  bannerGrad: { padding: 18, flexDirection: 'row', alignItems: 'center' },
  bannerMain: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  bannerSub: { color: '#666', fontSize: 10, marginTop: 2 },

  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: 'rgba(0,0,0,0.95)', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderColor: '#111', paddingBottom: 10 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, marginTop: 5, color: '#888' }
});
