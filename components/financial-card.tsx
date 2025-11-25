import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from './ui/card';
import { ThemedText } from './themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from './ui/icon-symbol';

export type FinancialCardProps = {
  title: string;
  amount: string;
  type: 'income' | 'expense' | 'balance';
  icon?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
};

export function FinancialCard({ title, amount, type, icon, trend }: FinancialCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getTypeColor = () => {
    switch (type) {
      case 'income':
        return colors.success;
      case 'expense':
        return colors.danger;
      case 'balance':
        return colors.primary;
      default:
        return colors.text;
    }
  };

  const getIconName = () => {
    if (icon) return icon;
    switch (type) {
      case 'income':
        return 'arrow.down.circle.fill';
      case 'expense':
        return 'arrow.up.circle.fill';
      case 'balance':
        return 'dollarsign.circle.fill';
      default:
        return 'circle.fill';
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getTypeColor() + '20' }]}>
          <IconSymbol name={getIconName()} size={24} color={getTypeColor()} />
        </View>
        <ThemedText style={[styles.title, { color: colors.textSecondary }]} type="defaultSemiBold">
          {title}
        </ThemedText>
      </View>
      
      <ThemedText style={[styles.amount, { color: colors.text }]} type="title">
        {amount}
      </ThemedText>

      {trend && (
        <View style={styles.trend}>
          <IconSymbol
            name={trend.isPositive ? 'arrow.up.right' : 'arrow.down.right'}
            size={14}
            color={trend.isPositive ? colors.success : colors.danger}
          />
          <ThemedText
            style={[
              styles.trendText,
              { color: trend.isPositive ? colors.success : colors.danger },
            ]}>
            {trend.value}
          </ThemedText>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 160,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    flex: 1,
  },
  amount: {
    fontSize: 24,
    marginBottom: 8,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});





