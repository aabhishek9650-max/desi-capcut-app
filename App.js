import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>CRYSTEL <Text style={styles.proText}>PRO</Text></Text>
          <Text style={styles.versionText}>v1.0.3 Stable Build</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Action Buttons */}
        <View style={styles.mainActions}>
          <TouchableOpacity style={styles.newProjectCard}>
            <Ionicons name="add" size={50} color="black" />
            <Text style={styles.newProjectText}>New Project</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aiMagicCard}>
            <MaterialCommunityIcons name="magic-staff" size={32} color="#00E5FF" />
            <Text style={styles.aiMagicText}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Projects Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentList}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.projectItem}>
              <View style={styles.projectThumbnail}>
                <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.5)" />
              </View>
              <Text style={styles.projectName}>Project_040{item}</Text>
              <Text style={styles.projectDate}>07/04/2026</Text>
            </View>
          ))}
        </ScrollView>

        {/* Popular Tools Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular tools</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.activeTab}><Text style={styles.activeTabText}>General</Text></TouchableOpacity>
            <TouchableOpacity style={styles.inactiveTab}><Text style={styles.inactiveTabText}>Marketing</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.toolsGrid}>
          {[
            { name: 'Remove BG', icon: 'account-remove-outline' },
            { name: 'AutoCut', icon: 'flash-outline' },
            { name: 'Retouch', icon: 'flask-outline' },
            { name: 'Auto Captions', icon: 'closed-caption-outline' },
            { name: 'AI Script', icon: 'file-document-outline' },
            { name: 'Teleprompter', icon: 'television' },
            { name: 'Image to Video', icon: 'image-outline' },
            { name: 'Vocal Isolate', icon: 'microphone-outline' },
          ].map((tool, index) => (
            <TouchableOpacity key={index} style={styles.toolItem}>
              <View style={styles.toolIconBox}>
                <MaterialCommunityIcons name={tool.icon} size={30} color="white" />
              </View>
              <Text style={styles.toolText}>{tool.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Banner Section */}
        <TouchableOpacity style={styles.creatorBanner}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="rocket-launch" size={35} color="#00E5FF" />
            <View style={{marginLeft: 15}}>
              <Text style={styles.bannerTitle}>Become a Creator</Text>
              <Text style={styles.bannerSub}>Get verified badge & share templates</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#555" />
        </TouchableOpacity>
        
        <View style={{height: 100}} /> 
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="content-cut" size={28} color="#00E5FF" />
          <Text style={[styles.navText, {color: '#00E5FF'}]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="layers-outline" size={28} color="#888" />
          <Text style={styles.navText}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="flask-outline" size={28} color="#888" />
          <Text style={styles.navText}>AI Lab</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={28} color="#888" />
          <Text style={styles.navText}>Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  logoText: { color: 'white', fontSize: 26, fontWeight: 'bold', letterSpacing: 1 },
  proText: { color: '#00E5FF' },
  versionText: { color: '#555', fontSize: 12 },
  mainActions: { flexDirection: 'row', paddingHorizontal: 20, gap: 15, marginBottom: 30 },
  newProjectCard: { flex: 2, backgroundColor: '#00E5FF', height: 180, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  newProjectText: { color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  aiMagicCard: { flex: 1, backgroundColor: '#1A1A1A', borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  aiMagicText: { color: 'white', marginTop: 10, fontWeight: '500' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  seeAllText: { color: '#00E5FF', fontSize: 14 },
  recentList: { paddingLeft: 20, marginBottom: 30 },
  projectItem: { marginRight: 20 },
  projectThumbnail: { width: 140, height: 140, backgroundColor: '#1A1A1A', borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  projectName: { color: 'white', marginTop: 8, fontWeight: 'bold' },
  projectDate: { color: '#555', fontSize: 12 },
  tabContainer: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 20, padding: 4 },
  activeTab: { backgroundColor: '#333', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 15 },
  activeTabText: { color: 'white', fontWeight: 'bold' },
  inactiveTab: { paddingHorizontal: 15, paddingVertical: 6 },
  inactiveTabText: { color: '#555' },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  toolItem: { width: '25%', alignItems: 'center', marginBottom: 20 },
  toolIconBox: { width: 60, height: 60, backgroundColor: '#111', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  toolText: { color: '#888', fontSize: 11, marginTop: 8, textAlign: 'center' },
  creatorBanner: { backgroundColor: '#111', marginHorizontal: 20, borderRadius: 30, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  bannerSub: { color: '#555', fontSize: 12 },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 0.5, borderTopColor: '#222' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 }
});
    
