import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface CustomButtonProps extends PressableProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loaderColor?: string;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  loaderColor = '#FFFFFF',  
}) => {
  const isButtonDisabled = disabled || loading;

  // 3. Lógica del Theme
  const theme = useColorScheme() ?? 'light';
  const defaultTextColor = Colors[theme].text;

  // 4. Color del loader
  // Usa el prop 'loaderColor' si se pasa uno,
  // si no, usa el color de texto del theme
  const finalLoaderColor = loaderColor ?? defaultTextColor;

  return (
    <Pressable
      onPress={onPress}
      disabled={isButtonDisabled}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={finalLoaderColor} />
      ) 
      : (
        <Text
          style={[
            { color: defaultTextColor }, 
            textStyle, 
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};