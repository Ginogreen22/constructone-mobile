import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import api from '../services/api';

const JobDetailScreen = ({ route }: any) => {
  const { jobId } = route.params;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetail();
  }, [jobId]);

  const fetchJobDetail = async () => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      setJob(response.data);
    } catch (error) {
      console.error('Failed to fetch job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDirections = () => {
    if (job?.address) {
      const encodedAddress = encodeURIComponent(job.address);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
      Linking.openURL(url);
    }
  };

  const handleCallClient = () => {
    if (job?.client_phone) {
      Linking.openURL(`tel:${job.client_phone}`);
    }
  };

  const handleEmailClient = () => {
    if (job?.client_email) {
      Linking.openURL(`mailto:${job.client_email}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Job not found</Text>
      </View>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in_progress': return '#3b82f6';
      case 'on_hold': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#888';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
          <Text style={styles.statusText}>{job.status?.replace('_', ' ')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.infoText}>{job.client_name}</Text>
        </View>
        {job.client_email && (
          <TouchableOpacity style={styles.infoRow} onPress={handleEmailClient}>
            <Text style={styles.icon}>📧</Text>
            <Text style={[styles.infoText, styles.linkText]}>{job.client_email}</Text>
          </TouchableOpacity>
        )}
        {job.client_phone && (
          <TouchableOpacity style={styles.infoRow} onPress={handleCallClient}>
            <Text style={styles.icon}>📞</Text>
            <Text style={[styles.infoText, styles.linkText]}>{job.client_phone}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <TouchableOpacity style={styles.infoRow} onPress={handleGetDirections}>
          <Text style={styles.icon}>📍</Text>
          <Text style={[styles.infoText, styles.linkText]}>{job.address}</Text>
        </TouchableOpacity>
      </View>

      {job.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{job.description}</Text>
        </View>
      )}

      {job.budget && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget</Text>
          <Text style={styles.budgetText}>${job.budget.toLocaleString()}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <View style={styles.quickActionsRow}>
          {job.client_phone && (
            <TouchableOpacity style={styles.quickActionButton} onPress={handleCallClient}>
              <Text style={styles.actionIcon}>📞</Text>
              <Text style={styles.quickActionText}>Call</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.quickActionButton} onPress={handleGetDirections}>
            <Text style={styles.actionIcon}>🗺️</Text>
            <Text style={styles.quickActionText}>Directions</Text>
          </TouchableOpacity>
          
          {job.client_email && (
            <TouchableOpacity style={styles.quickActionButton} onPress={handleEmailClient}>
              <Text style={styles.actionIcon}>📧</Text>
              <Text style={styles.quickActionText}>Email</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  loadingText: {
    color: '#888',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  icon: {
    fontSize: 16,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  linkText: {
    color: '#3b82f6',
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 22,
  },
  budgetText: {
    color: '#22c55e',
    fontSize: 24,
    fontWeight: 'bold',
  },
  actions: {
    padding: 20,
    gap: 16,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    fontSize: 24,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default JobDetailScreen;
