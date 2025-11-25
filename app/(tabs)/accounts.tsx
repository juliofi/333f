import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function AccountsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  // Dados mockados - serão substituídos pela API
  const accounts = [
    {
      id: '1',
      name: 'Banco do Brasil',
      type: 'Conta Corrente',
      accountNumber: '****1234',
      balance: 'R$ 125.450,00',
      bankCode: '001',
    },
    {
      id: '2',
      name: 'Itaú',
      type: 'Conta Corrente',
      accountNumber: '****5678',
      balance: 'R$ 89.320,50',
      bankCode: '341',
    },
    {
      id: '3',
      name: 'Bradesco',
      type: 'Conta Poupança',
      accountNumber: '****9012',
      balance: 'R$ 31.120,00',
      bankCode: '237',
    },
  ];

  const getBankIcon = (bankCode: string) => {
    // Ícones baseados no código do banco
    return 'building.columns.fill';
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Contas Bancárias</ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            {accounts.length} conta{accounts.length !== 1 ? 's' : ''} conectada{accounts.length !== 1 ? 's' : ''}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.summaryCard}>
          <ThemedText style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Saldo Total
          </ThemedText>
          <ThemedText type="title" style={[styles.summaryAmount, { color: colors.primary }]}>
            R$ 245.890,50
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.accountsList}>
          {accounts.map((account) => (
            <Card key={account.id} style={styles.accountCard} variant="elevated">
              <View style={styles.accountHeader}>
                <View style={[styles.bankIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconSymbol name={getBankIcon(account.bankCode)} size={24} color={colors.primary} />
                </View>
                <View style={styles.accountInfo}>
                  <ThemedText type="defaultSemiBold">{account.name}</ThemedText>
                  <ThemedText style={[styles.accountType, { color: colors.textSecondary }]}>
                    {account.type} • {account.accountNumber}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.accountBalance}>
                <ThemedText style={[styles.balanceLabel, { color: colors.textSecondary }]}>
                  Saldo disponível
                </ThemedText>
                <ThemedText type="subtitle" style={styles.balanceAmount}>
                  {account.balance}
                </ThemedText>
              </View>
            </Card>
          ))}
        </ThemedView>

        <TouchableOpacity
          style={[styles.addAccountCard, { borderColor: colors.primary, borderWidth: 2, borderStyle: 'dashed' }]}
          onPress={() => {
            // Navegar para adicionar conta
            console.log('Adicionar nova conta');
          }}
          activeOpacity={0.7}>
          <IconSymbol name="plus.circle.fill" size={32} color={colors.primary} />
          <ThemedText style={[styles.addAccountText, { color: colors.primary }]} type="defaultSemiBold">
            Conectar Nova Conta
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
  },
  accountsList: {
    gap: 16,
    marginBottom: 16,
  },
  accountCard: {
    padding: 16,
  },
  accountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountType: {
    fontSize: 12,
    marginTop: 4,
  },
  accountBalance: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  balanceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 20,
  },
  addAccountCard: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  addAccountText: {
    marginTop: 12,
    fontSize: 16,
  },
});

