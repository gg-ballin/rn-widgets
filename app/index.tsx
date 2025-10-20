import UserList from '@/components/user-list';
import { BASE_URL } from '@/lib/config';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { User } from './types';

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(BASE_URL);
      const [data] = await Promise.all([
        res.json() as Promise<User | User[]>,
        new Promise<void>((resolve) => setTimeout(resolve, 1500)),
      ]);
      setUsers(Array.isArray(data) ? data : [data]);
      console.log('Fetched users', data);
    } catch (e) {
      console.warn('Failed to fetch users', e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerRow}>
          <Text style={styles.loadedText}>Loaded: {users.length}</Text>
          <Pressable onPress={() => setUsers([])} disabled={users.length === 0} style={styles.clearButton}>
            <Text style={[
              styles.clearButtonText,
              users.length === 0 && styles.clearButtonTextDisabled,
            ]}>Clear</Text>
          </Pressable>
        </View>
        <UserList data={users} />
        <View style={styles.bottomActionContainer}>
          <Pressable style={styles.primaryButton} onPress={fetchUsers} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Fetch Users</Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerRow: {
    marginTop: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadedText: {
    color: 'white',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  clearButtonTextDisabled: {
    color: 'rgba(255,255,255,0.5)',
  },
  bottomActionContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
