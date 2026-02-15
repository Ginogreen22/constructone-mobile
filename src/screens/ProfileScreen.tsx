import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout, style: 'destructive' },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will open a page to request account deletion. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => Linking.openURL('https://constructone.com.au/delete-account')
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
        <Text style={styles.role}>{user?.role || 'User'}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuText}>Settings</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuText}>Help & Support</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>📜</Text>
          <Text style={styles.menuText}>Privacy Policy</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleDeleteAccount}>
          <Text style={styles.menuIcon}>🗑️</Text>
          <Text style={styles.menuText}>Delete Account</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 2.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { alignItems: 'center', padding: 30, borderBottomWidth: 1, borderBottomColor: '#2a2a3e' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  email: { fontSize: 14, color: '#888', marginBottom: 8 },
  role: { fontSize: 12, color: '#3b82f6', textTransform: 'uppercase', backgroundColor: '#3b82f620', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4 },
  menu: { padding: 16 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2a2a3e', padding: 16, borderRadius: 8, marginBottom: 8 },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuText: { flex: 1, color: '#fff', fontSize: 16 },
  chevron: { color: '#888', fontSize: 24 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ef444420', margin: 16, padding: 16, borderRadius: 8, gap: 8 },
  logoutIcon: { fontSize: 20 },
  logoutText: { color: '#ef4444', fontSize: 16, fontWeight: '600' },
  version: { textAlign: 'center', color: '#666', fontSize: 12, marginTop: 8 },
});

export default ProfileScreen;
