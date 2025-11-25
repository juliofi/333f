import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewProps } from 'react-native';
import { ThemedView } from '../themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export type CardProps = (ViewProps | TouchableOpacityProps) & {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  onTouchEnd?: () => void;
};

export function Card({ children, style, variant = 'default', onTouchEnd, ...props }: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const cardStyle = [
    styles.card,
    variant === 'elevated' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    { backgroundColor: colors.surface, borderColor: colors.border },
    style,
  ];

  if (onTouchEnd) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onTouchEnd}
        activeOpacity={0.7}
        {...(props as TouchableOpacityProps)}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <ThemedView style={cardStyle} {...(props as ViewProps)}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
});

