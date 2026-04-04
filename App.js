import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; // Icons ke liye

const { width } = Dimensions.get('window');

export default function App() {
  const [tab, setTab] = useState('edit'); // 'edit' or 'templates'

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Desi Capcut</Text>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>

      {tab === 'edit' ? (
        /* Edit Tab - Add Project Section */
        <View style={styles.center}>
          <TouchableOpacity style={styles.newProjectBtn}>
            <Ionicons name="add" size={40} color="black" />
            <Text style={styles.btnTextBold}>New Project</Text>
          </TouchableOpacity>
          <Text style={styles.subText}>Your recent projects will appear here</Text>
        </View>
      ) : (
        /* Templates Tab - Reels Style */
        <FlatList
          data={[
            { id: '1', title: 'Viral Velocity', url: 'https://v.ftcdn.net/05/52/63/14/700_F_552631405_9v9TDP2XUfS7V8C6uUvNf8ZkO6WvLp2V_ST.mp4' },
            { id: '2', title: 'Slow-Mo Magic', url: 'https://v.ftcdn.net/02/91/93/29/700_F_291932912_7vD4W5N0vR5M2p0P1p7XjL6F9oZk6V_ST.mp4' }
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.templateCard}>
              <Video source={{ uri: item.url }} style={styles.video} resizeMode="cover" isLooping shouldPlay />
              <View style={styles.tempOverlay}>
                <Text style={styles.tempTitle}>{item.title}</Text>
                <TouchableOpacity style={styles.useBtn}><Text style={styles.useBtnText}>Use</Text></TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setTab('edit')} style={styles.navItem}>
          <Ionicons name="cut" size={24} color={tab === 'edit' ? '#007AFF' : 'gray'} />
          <Text style={{color: tab === 'edit' ? '#007AFF' : 'gray'}}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setTab('templates')} style={styles.navItem}>
          <Ionicons name="layers" size={24} color={tab === 'templates' ? '#007AFF' : 'gray'} />
          <Text style={{color: tab === 'templates' ? '#007AFF' : 'gray'}}>Templates</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  logo: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  newProjectBtn: { backgroundColor: '#fff', width: 150, height: 150, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  btnTextBold: { fontWeight: 'bold', marginTop: 10, fontSize: 16 },
  subText: { color: 'gray', marginTop: 20 },
  navBar: { flexDirection: 'row', height: 70, borderTopWidth: 0.5, borderColor: '#333', backgroundColor: '#111' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  templateCard: { width: width, height: 400, marginBottom: 10 },
  video: { flex: 1 },
  tempOverlay: { position: 'absolute', bottom: 20, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tempTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  useBtn: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5 },
  useBtnText: { color: '#fff', fontWeight: 'bold' }
});
    
