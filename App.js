import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandName}>CRYSTEL PRO</Text>
          <Text style={styles.subTag}>Ak Development Tech</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Feather name="user" size={24} color="#00E5FF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Hero Banner: Future Star Creator Spot */}
        <View style={styles.heroCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500' }} 
            style={styles.heroImage} 
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Become a Star Creator</Text>
            <Text style={styles.heroSubtitle}>Reach 5M Followers & Earn ₹30,000/Month</Text>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={styles.joinText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="video-plus" size={32} color="#fff" />
            <Text style={styles.actionLabel}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#00E5FF' }]}>
            <MaterialCommunityIcons name="auto-fix" size={32} color="#00E5FF" />
            <Text style={[styles.actionLabel, { color: '#00E5FF' }]}>AI Magic</Text>
          </TouchableOpacity>
        </View>

        {/* Trending Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Templates</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templateScroll}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.templateCard}>
              <View style={styles.placeholderImg}>
                <Feather name="play-circle" size={40} color="rgba(255,255,255,0.5)" />
              </View>
              <Text style={styles.templateName}>Vibe Check #{item}</Text>
              <View style={styles.creatorInfo}>
                <View style={styles.verifiedCircle} />
                <Text style={styles.creatorName}>Star_Editor_0{item}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {['Home', 'Templates', 'Me'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.navItem}>
            <Feather 
              name={tab === 'Home' ? 'home' : tab === 'Templates' ? 'layers' : 'user'} 
              size={24} 
              color={activeTab === tab ? '#00E5FF' : '#888'} 
            />
            <Text style={[styles.navText, { color: activeTab === tab ? '#00E5FF' : '#888' }]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  brandName: { color: '#fff', fontSize: 24, fontWeight: '900', letterSpacing: 2 },
  subTag: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold' },
  profileBtn: { backgroundColor: '#1A1A1A', padding: 10, borderRadius: 12 },
  heroCard: { margin: 20, height: 200, borderRadius: 20, overflow: 'hidden', elevation: 10 },
  heroImage: { width: '100%', height: '100%', opacity: 0.6 },
  heroOverlay: { position: 'absolute', bottom: 20, left: 20 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  heroSubtitle: { color: '#ddd', fontSize: 12, marginTop: 5 },
  joinBtn: { backgroundColor: '#00E5FF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, marginTop: 10, alignSelf: 'flex-start' },
  joinText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10 },
  actionCard: { backgroundColor: '#00E5FF', width: '42%', height: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  actionLabel: { color: '#000', fontWeight: 'bold', marginTop: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 10 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#00E5FF', fontSize: 14 },
  templateScroll: { paddingLeft: 20 },
  templateCard: { width: 160, marginRight: 15, marginBottom: 100 },
  placeholderImg: { width: 160, height: 220, backgroundColor: '#1A1A1A', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  templateName: { color: '#fff', marginTop: 10, fontWeight: '600' },
  creatorInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  verifiedCircle: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00E5FF', marginRight: 5 },
  creatorName: { color: '#888', fontSize: 12 },
  bottomNav: { position: 'absolute', bottom: 0, width: '100%', height: 70, backgroundColor: '#111', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#222' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 10, marginTop: 4 }
});
            
