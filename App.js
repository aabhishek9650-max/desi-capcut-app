import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [timeline, setTimeline] = useState([]);
  const [activeTab, setActiveTab] = useState('Edit');

  // --- ARMY ORDER: 10 Video Limit Logic ---
  const handleToolAction = (toolName, isPro) => {
    if (isPro) {
      Alert.alert("CRYSTEL PRO", "Ye feature Premium hai. Access ke liye Pro plan upgrade karein.");
      return;
    }

    if (toolName === "1 Tap Reel" || toolName === "Auto Edit") {
      if (timeline.length >= 10) {
        Alert.alert("Limit Reached!", "General, aap ek saath sirf 10 videos process kar sakte hain.");
      } else {
        Alert.alert("AI Engine", `${toolName} shuru ho raha hai... Processing your videos.`);
        // Fake adding to timeline for simulation
        setTimeline([...timeline, { id: Date.now() }]);
      }
    } else {
      Alert.alert("Crystel Pro", `${toolName} feature active ho gaya hai.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoMain}>CRYSTEL <Text style={styles.logoSub}>PRO</Text></Text>
          <Text style={styles.versionTag}>v1.0.3 Stable Build</Text>
        </View>
        <TouchableOpacity onPress={() => Alert.alert("Settings", "Configuration updates coming soon.")}>
          <Ionicons name="settings-sharp" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* ACTION CARDS */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.newProjectCard} onPress={() => handleToolAction("New Project", false)}>
            <Ionicons name="add" size={45} color="black" />
            <Text style={styles.newProjectTitle}>New Project</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aiMagicCard} onPress={() => handleToolAction("AI Lab", true)}>
            <MaterialCommunityIcons name="auto-fix" size={32} color="#00E5FF" />
            <Text style={styles.aiMagicTitle}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* POPULAR TOOLS */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Popular tools</Text>
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
            { n: 'Vocal Isolate', i: 'microphone-variant' },
            { n: 'Desktop Edit', i: 'laptop', pro: true }, 
            { n: 'Smart Ads', i: 'bullhorn-outline' },
            { n: 'Velocity', i: 'speedometer' },
            { n: 'Enhance', i: 'auto-fix' },
          ].map((tool, idx) => (
            <TouchableOpacity key={idx} style={styles.toolBtn} onPress={() => handleToolAction(tool.n, tool.pro)}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name={tool.i} size={28} color="white" />
                {tool.pro && <View style={styles.proBadge}><Text style={styles.proText}>Pro</Text></View>}
              </View>
              <Text style={styles.toolLabel}>{tool.n}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MOST POPULAR TOOLS */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Most popular tools</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mostPopularScroll}>
          {[
            { n: '1 Tap Reel', i: 'play-box-outline', d: 'Fast AI Generator' },
            { n: 'Auto Color', i: 'palette-outline', d: 'AI Grading' },
            { n: 'Edit Score', i: 'star-circle-outline', d: 'AI Analysis' },
            { n: 'Text to Audio', i: 'waveform', d: 'AI Voiceover' },
            { n: 'Auto Edit', i: 'robot-outline', d: 'Smart Cutting' },
            { n: 'Text to Video', i: 'movie-filter-outline', d: 'AI Scenes' },
          ].map((tool, idx) => (
            <TouchableOpacity key={idx} style={styles.mostPopularCard} onPress={() => handleToolAction(tool.n, false)}>
              <View style={styles.mpIconBox}>
                <MaterialCommunityIcons name={tool.i} size={30} color="#00E5FF" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.mpTitle}>{tool.n}</Text>
                <Text style={styles.mpDesc}>{tool.d}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </ScrollView>

      {/* BOTTOM NAVIGATION (FULLY ACTIVE) */}
      <View style={styles.navBar}>
        {[
          { name: 'Edit', icon: 'content-cut' },
          { name: 'Templates', icon: 'layers-outline' },
          { name: 'AI Lab', icon: 'flask-outline' },
          { name: 'Me', icon: 'person-outline' },
        ].map((item) => (
          <TouchableOpacity 
            key={item.name} 
            style={styles.navItem} 
            onPress={() => {
              setActiveTab(item.name);
              if(item.name === 'AI Lab') handleToolAction("AI Lab", true);
            }}
          >
            <MaterialCommunityIcons 
              name={item.icon} 
              size={26} 
              color={activeTab === item.name ? "#00E5FF" : "#888"} 
            />
            <Text style={[styles.navLabel, { color: activeTab === item.name ? "#00E5FF" : "#888" }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
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
  actionRow: { flexDirection: 'row', paddingHorizontal: 15, height: 160, marginBottom: 20 },
  newProjectCard: { flex: 1.8, backgroundColor: '#00E5FF', borderRadius: 30, justifyContent: 'center', alignItems: 'center', margin: 5 },
  newProjectTitle: { color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  aiMagicCard: { flex: 1, backgroundColor: '#121212', borderRadius: 30, justifyContent: 'center', alignItems: 'center', margin: 5 },
  aiMagicTitle: { color: '#FFF', fontSize: 14, marginTop: 10, fontWeight: '600' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginVertical: 15 },
  sectionTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  toolBtn: { width: '25%', alignItems: 'center', marginBottom: 25 },
  iconCircle: { width: 65, height: 65, backgroundColor: '#121212', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  toolLabel: { color: '#777', fontSize: 11, marginTop: 8, textAlign: 'center' },
  proBadge: { position: 'absolute', top: -5, right: -5, backgroundColor: '#00E5FF', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  proText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  mostPopularScroll: { paddingLeft: 20, marginBottom: 20 },
  mostPopularCard: { backgroundColor: '#121212', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 25, marginRight: 15, width: 210, borderWidth: 1, borderColor: '#1A1A1A' },
  mpIconBox: { width: 50, height: 50, backgroundColor: '#000', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  mpTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  mpDesc: { color: '#555', fontSize: 10, marginTop: 2 },
  navBar: { position: 'absolute', bottom: 0, width: '100%', height: 90, backgroundColor: '#000', flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#111', paddingTop: 10 },
  navItem: { alignItems: 'center', flex: 1 },
  navLabel: { fontSize: 12, marginTop: 5, fontWeight: '600' }
});
    
