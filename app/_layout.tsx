import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams();

  const isWidgetLink = pathname === '/users' && !!params.user;

  useEffect(() => {
    // Aquí es seguro navegar porque el layout ya se montó
    if (isWidgetLink) {
      router.replace({
        pathname: '/users',
        params: { user: params.user },
      });
    }
  }, [isWidgetLink, params.user, router]);

  if (isWidgetLink) {
    return null; 
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="users" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
