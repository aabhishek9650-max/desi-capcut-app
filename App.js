import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 🔝 Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>Desi <Text style={{color: '#007AFF'}}>Capcut</Text></Text>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="cog-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🚀 New Project Hero Section */}
        <TouchableOpacity activeOpacity={0.8} style={styles.heroCard}>
          <LinearGradient colors={['#1e1e1e', '#121212']} style={styles.heroGrad}>
            <View style={styles.plusCircle}>
              <MaterialCommunityIcons name="plus" size={40} color="#fff" />
            </View>
            <Text style={styles.heroTitle}>New Project</Text>
            <Text style={styles.heroSub}>Start creating magic</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 🛠️ Quick Tools Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Tools</Text>
        </View>
        
        <View style={styles.toolsGrid}>
          {[
            {name: 'Auto Cut', icon: 'movie-filter', color: '#FF3B30'},
            {name: 'Remove BG', icon: 'human-edit', color: '#34C759'},
            {name: 'AI Effects', icon: 'auto-fix', color: '#AF52DE'},
            {name: 'Caption', icon: 'closed-caption', color: '#5856D6'}
          ].map((tool, i) => (
            <TouchableOpacity key={i} style={styles.toolItem}>
              <View style={[styles.toolIcon, {backgroundColor: tool.color + '20'}]}>
                <MaterialCommunityIcons name={tool.icon} size={24} color={tool.color} />
              </View>
              <Text style={styles.toolLabel}>{tool.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 🎬 Recent Projects Placeholder */}
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="folder-open-outline" size={50} color="#333" />
          <Text style={styles.emptyText}>Your masterpieces will appear here</Text>
        </View>
      </ScrollView>

      {/* ⚓ Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="movie-edit" size={26} color="#007AFF" />
          <Text style={[styles.navText, {color: '#007AFF'}]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="layers-outline" size={26} color="#666" />
          <Text style={styles.navText}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="account-outline" size={26} color="#666" />
          <Text style={styles.navText}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  logoText: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: -1 },
  heroCard: { width: width - 40, alignSelf: 'center', height: 200, borderRadius: 20, overflow: 'hidden', borderWeight: 1, borderColor: '#333' },
  heroGrad: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  plusCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 10 },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  heroSub: { color: '#666', fontSize: 14, marginTop: 5 },
  sectionHeader: { paddingHorizontal: 20, marginTop: 30, marginBottom: 15 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15 },
  toolItem: { width: '25%', alignItems: 'center', marginBottom: 20 },
  toolIcon: { width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  toolLabel: { color: '#999', fontSize: 12 },
  emptyState: { marginTop: 40, alignItems: 'center', paddingBottom: 100 },
  emptyText: { color: '#333', fontSize: 14, marginTop: 10 },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 80, backgroundColor: '#111', flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#222' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 11, marginTop: 4, fontWeight: '500' }
});
    
