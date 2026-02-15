import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import api from '../services/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job': return '💼';
      case 'quote': return '📄';
      case 'invoice': return '💰';
      default: return '🔔';
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={[styles.notificationCard, !item.read && styles.unread]}>
      <Text style={styles.icon}>{getTypeIcon(item.type)}</Text>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{new Date(item.created_at).toLocaleDateString()}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' },
  loadingText: { color: '#888' },
  listContent: { padding: 16 },
  notificationCard: { backgroundColor: '#2a2a3e', borderRadius: 8, padding: 16, marginBottom: 12, flexDirection: 'row', gap: 12 },
  unread: { borderLeftWidth: 3, borderLeftColor: '#3b82f6' },
  icon: { fontSize: 24 },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 4 },
  message: { fontSize: 14, color: '#888', marginBottom: 8 },
  time: { fontSize: 12, color: '#666' },
  emptyContainer: { alignItems: 'center', padding: 40 },
  emptyIcon: { fontSize: 48 },
  emptyText: { color: '#888', fontSize: 16, marginTop: 16 },
});

export default NotificationsScreen;
