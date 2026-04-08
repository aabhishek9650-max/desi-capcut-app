import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoMain}>CRYSTEL <Text style={styles.logoSub}>PRO</Text></Text>
          <Text style={styles.versionTag}>v1.0.3 Stable Build</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings-sharp" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* --- TOP ACTION CARDS --- */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.newProjectCard}>
            <Ionicons name="add" size={45} color="black" />
            <Text style={styles.newProjectTitle}>New Project</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aiMagicCard}>
            <MaterialCommunityIcons name="auto-fix" size={32} color="#00E5FF" />
            <Text style={styles.aiMagicTitle}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* --- RECENT PROJECTS --- */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.projectScroll}>
          {[1, 2, 3].map((i) => (
            <View key={i} style={styles.projectCard}>
              <View style={styles.thumbPlaceholder}>
                <Ionicons name="play-sharp" size={30} color="rgba(255,255,255,0.3)" />
              </View>
              <Text style={styles.pName}>Project_040{i}</Text>
              <Text style={styles.pDate}>07/04/2026</Text>
            </View>
          ))}
        </ScrollView>

        {/* --- POPULAR TOOLS --- */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Popular tools</Text>
          <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabActive}><Text style={styles.tabTextActive}>General</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tabInactive}><Text style={styles.tabTextInactive}>Marketing</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.toolsGrid}>
          {[
            { n: 'Remove BG', i: 'account-off-outline' },
            { n: 'AutoCut', i: 'lightning-bolt-outline' },
            { n: 'Retouch', i: 'beaker-outline' },
            { n: 'Auto Captions', i: 'account-voice' },
            { n: 'AI Script', i: 'file-document-edit-outline' },
            { n: 'Teleprompter', i: 'monitor-shimmer' },
            { n: 'Image to Video', i: 'image-multiple-outline' },
            { n: 'Vocal Isolate', i: 'microphone-minus-outline' },
            { n: 'Desktop Edit', i: 'laptop', pro: true },
            { n: 'Smart Ads', i: 'megaphone-outline' },
            { n: 'Velocity', i: 'speedometer-outline' },
            { n: 'Enhance', i: 'auto-fix' },
          ].map((tool, idx) => (
            <TouchableOpacity key={idx} style={styles.toolBtn}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name={tool.i} size={28} color="white" />
                {tool.pro && <View style={styles.proBadge}><Text style={styles.proText}>Pro</Text></View>}
              </View>
              <Text style={styles.toolLabel}>{tool.n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- BANNER --- */}
        <TouchableOpacity style={styles.banner}>
          <View style={styles.bannerLeft}>
            <MaterialCommunityIcons name="rocket-launch" size={30} color="#00E5FF" />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.bannerTitle}>Become a Creator</Text>
              <Text style={styles.bannerSub}>Get verified badge & share templates</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </TouchableOpacity>

      </ScrollView>

      {/* --- BOTTOM NAVIGATION --- */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="content-cut" size={26} color="#00E5FF" />
          <Text style={[styles.navLabel, { color: '#00E5FF' }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="layers-outline" size={26} color="#888" />
          <Text style={styles.navLabel}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="flask-outline" size={26} color="#888" />
          <Text style={styles.navLabel}>AI Lab</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={26} color="#888" />
          <Text style={styles.navLabel}>Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 10 },
  logoMain: { color: '#FFF', fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  logoSub: { color: '#00E5FF' },
  versionTag: { color: '#444', fontSize: 12, fontWeight: '600' },
  actionRow: { flexDirection: 'row', paddingHorizontal: 15, height: 180, marginBottom: 20 },
  newProjectCard: { flex: 1.8, backgroundColor: '#00E5FF', borderRadius: 30, justifyContent: 'center', alignItems: 'center', margin: 5 },
  newProjectTitle: { color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  aiMagicCard: { flex: 1, backgroundColor: '#121212', borderRadius: 30, justifyContent: 'center', alignItems: 'center', margin: 5 },
  aiMagicTitle: { color: '#FFF', fontSize: 14, marginTop: 10, fontWeight: '600' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginVertical: 15 },
  sectionTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  seeAll: { color: '#00E5FF', fontWeight: '600' },
  projectScroll: { paddingLeft: 20 },
  projectCard: { marginRight: 15 },
  thumbPlaceholder: { width: 150, height: 150, backgroundColor: '#121212', borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  pName: { color: '#FFF', marginTop: 10, fontWeight: 'bold', fontSize: 14 },
  pDate: { color: '#444', fontSize: 12 },
  tabBar: { flexDirection: 'row', backgroundColor: '#121212', borderRadius: 25, padding: 4 },
  tabActive: { backgroundColor: '#222', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  tabTextActive: { color: '#FFF', fontWeight: 'bold' },
  tabTextInactive: { color: '#444', paddingHorizontal: 10 },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  toolBtn: { width: '25%', alignItems: 'center', marginBottom: 25 },
  iconCircle: { width: 65, height: 65, backgroundColor: '#121212', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  toolLabel: { color: '#777', fontSize: 11, marginTop: 8, textAlign: 'center' },
  proBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#00E5FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  proText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  banner: { backgroundColor: '#0A0A0A', marginHorizontal: 20, padding: 22, borderRadius: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#111' },
  bannerLeft: { flexDirection: 'row', alignItems: 'center' },
  bannerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  bannerSub: { color: '#444', fontSize: 12, marginTop: 2 },
  navBar: { position: 'absolute', bottom: 0, width: '100%', height: 90, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#111', paddingTop: 10 },
  navItem: { alignItems: 'center' },
  navLabel: { fontSize: 12, marginTop: 5, fontWeight: '600' }
});
    
