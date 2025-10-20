import { CustomButton } from '@/components/Button';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UsersScreen() {
  const { user, name, catchPhrase } = useLocalSearchParams();
  const router = useRouter();
    const theme = useColorScheme() ?? 'light';
    const defaultTextColor = Colors[theme].text;
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomButton title="Go home" onPress={() => {router.replace('/') }} style={styles.button} textStyle={styles.buttonText} />
      <Text style={{ fontSize: 18, color: defaultTextColor }}>User selected from widget:</Text>
      <View style={{ flexDirection: 'column', alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: defaultTextColor, textAlign: 'center', marginBottom: 12}}>
        {name}
      </Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: defaultTextColor, textAlign: 'center', marginBottom: 12}}>
        {user}
      </Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: defaultTextColor, textAlign: 'center', marginBottom: 12}}>
        {catchPhrase}
      </Text>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 24,
    left: 24,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
 
