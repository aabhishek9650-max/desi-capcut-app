import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>CRYSTEL PRO</Text>
          <Text style={styles.brandSubtitle}>Ak Development Tech</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person-circle-outline" size={35} color="#00E5FF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        
        {/* Main Action Cards */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.mainCard}>
            <LinearGradient colors={['#00E5FF', '#0097A7']} style={styles.cardGradient}>
              <MaterialCommunityIcons name="video-plus" size={40} color="#fff" />
              <Text style={styles.cardText}>New Project</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainCard}>
            <LinearGradient colors={['#2C2C2E', '#1C1C1E']} style={styles.cardGradientBorder}>
              <MaterialCommunityIcons name="auto-fix" size={40} color="#00E5FF" />
              <Text style={[styles.cardText, {color: '#00E5FF'}]}>AI Magic</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Tools Section (Instead of Star Badge) */}
        <Text style={styles.sectionTitle}>Smart Tools</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsRow}>
          {['Remove BG', 'Auto Cut', 'Filters', 'Retouch'].map((tool, index) => (
            <TouchableOpacity key={index} style={styles.toolItem}>
              <View style={styles.toolIconCircle}>
                <Ionicons name="flash-outline" size={20} color="#00E5FF" />
              </View>
              <Text style={styles.toolText}>{tool}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Templates</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.templateGrid}>
          <View style={styles.templatePlaceholder} />
          <View style={styles.templatePlaceholder} />
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#00E5FF" />
          <Text style={[styles.navText, {color: '#00E5FF'}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="layers-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#8E8E93" />
          <Text style={styles.navText}>Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  brandTitle: { fontSize: 26, fontWeight: '900', color: '#fff', letterSpacing: 1 },
  brandSubtitle: { fontSize: 12, color: '#00E5FF', fontWeight: '600' },
  scrollBody: { paddingBottom: 100 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10
  },
  mainCard: { width: '47%', height: 160, borderRadius: 25, overflow: 'hidden' },
  cardGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cardGradientBorder: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#3A3A3C' 
  },
  cardText: { marginTop: 12, fontSize: 16, fontWeight: 'bold', color: '#fff' },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginTop: 25 
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', paddingHorizontal: 20, marginTop: 20 },
  seeAll: { color: '#00E5FF', fontSize: 14 },
  toolsRow: { paddingLeft: 20, marginTop: 15 },
  toolItem: { alignItems: 'center', marginRight: 25 },
  toolIconCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 15, 
    backgroundColor: '#1C1C1E', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3C'
  },
  toolText: { color: '#8E8E93', fontSize: 12, marginTop: 8 },
  templateGrid: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  templatePlaceholder: { 
    width: '48%', 
    height: 250, 
    backgroundColor: '#1C1C1E', 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2C2C2E'
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#38383A',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, marginTop: 4, color: '#8E8E93' }
});
    
