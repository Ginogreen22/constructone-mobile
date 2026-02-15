import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface Stats {
  total_jobs: number;
  active_jobs: number;
  pending_quotes: number;
  unpaid_invoices: number;
}

const DashboardScreen = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
    setRefreshing(false);
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value || 0}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statIcon}>{icon}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{user?.name || 'User'}</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard title="Total Jobs" value={stats?.total_jobs} icon="💼" color="#3b82f6" />
        <StatCard title="Active Jobs" value={stats?.active_jobs} icon="⚡" color="#22c55e" />
        <StatCard title="Pending Quotes" value={stats?.pending_quotes} icon="📄" color="#f59e0b" />
        <StatCard title="Unpaid Invoices" value={stats?.unpaid_invoices} icon="💰" color="#ef4444" />
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>New Job</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionText}>New Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📍</Text>
            <Text style={styles.actionText}>Check In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📷</Text>
            <Text style={styles.actionText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { padding: 20 },
  greeting: { fontSize: 16, color: '#888' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 10, gap: 10 },
  statCard: {
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    padding: 16,
    width: '47%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  statContent: {},
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  statTitle: { fontSize: 12, color: '#888', marginTop: 4 },
  statIcon: { fontSize: 24 },
  quickActions: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 16 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { backgroundColor: '#2a2a3e', borderRadius: 8, padding: 16, width: '47%', alignItems: 'center', gap: 8 },
  actionIcon: { fontSize: 24 },
  actionText: { color: '#fff', fontSize: 14 },
});

export default DashboardScreen;
