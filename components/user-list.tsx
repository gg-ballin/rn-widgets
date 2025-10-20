import type { User } from '@/constants/types';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { memo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Props {
  data: User[];
}

function UserCard({ item }: { item: User }) {
  const scheme = useColorScheme() ?? 'light';
  const cardBg = scheme === 'dark' ? '#1C1C1E' : '#FFFFFF';
  const textColor = scheme === 'dark' ? '#ECEDEE' : '#11181C';
  const subTextColor = scheme === 'dark' ? '#C7C9CC' : '#4A4F55';

  // Generate initials from name (first letters of first and last name)
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  };

  // Deterministic pick from 5 color pairs (fg text + lighter bg)
  const colorPairs = [
    { fg: '#0B63C7', bg: '#D8E8FF' },
    { fg: '#9B2FAC', bg: '#F4D9F8' },
    { fg: '#1F7A1F', bg: '#DDF3DD' },
    { fg: '#B24C2C', bg: '#FADFD7' },
    { fg: '#C08400', bg: '#FBECCB' },
  ] as const;

  const hash = [...item?.name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const palette = colorPairs[hash % colorPairs.length];

  return (
    <View style={[styles.card, { backgroundColor: cardBg }]}> 
      <View style={styles.cardRow}>
        <View style={styles.cardContent}>
          <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
          <Text style={[styles.sub, { color: subTextColor }]}>{item.email}</Text>
          <Text style={[styles.company, { color: textColor }]}>{item.company.name}</Text>
          <Text style={[styles.catch, { color: subTextColor }]}>{item.company.catchPhrase}</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: palette.bg }]}> 
          <Text style={[styles.avatarText, { color: palette.fg }]}>{getInitials(item.name)}</Text>
        </View>
      </View>
    </View>
  );
}

const MemoCard = memo(UserCard);

export default function UserList({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(u) => String(u.id)}
      renderItem={({ item }) => <MemoCard item={item} />}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 12,
    paddingBottom: 120, // keep above bottom button
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    // subtle shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    // elevation (Android)
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(60,60,67,0.18)'
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    marginBottom: 8,
  },
  company: {
    fontSize: 15,
    fontWeight: '500',
  },
  catch: {
    fontSize: 13,
    marginTop: 4,
    fontStyle: 'italic',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
