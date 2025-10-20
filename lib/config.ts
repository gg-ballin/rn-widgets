import Constants from 'expo-constants';

// Public, non-secret configuration sourced from app.json -> expo.extra.public
export const BASE_URL: string =
  (Constants.expoConfig?.extra as any)?.public?.BASE_URL ??
  'https://jsonplaceholder.typicode.com/users';

export function getBaseUrl(): string {
  return BASE_URL;
}
