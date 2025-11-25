import React from 'react';
import { StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { FinancialCard } from '@/components/financial-card';
import { Card } from '@/components/ui/card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  // Dados mockados - serão substituídos pela API
  const financialData = {
    balance: 'R$ 245.890,50',
    income: 'R$ 180.500,00',
    expense: 'R$ 134.609,50',
  };

  const recentTransactions = [
    { id: '1', description: 'Pagamento de fornecedor', amount: '-R$ 5.000,00', date: 'Hoje', type: 'expense' },
    { id: '2', description: 'Recebimento cliente ABC', amount: '+R$ 12.500,00', date: 'Ontem', type: 'income' },
    { id: '3', description: 'Salário funcionários', amount: '-R$ 45.000,00', date: '15/01', type: 'expense' },
    { id: '4', description: 'Venda produto XYZ', amount: '+R$ 8.300,00', date: '14/01', type: 'income' },
  ];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.greeting}>
            Olá, Empresa
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Resumo financeiro
          </ThemedText>
        </ThemedView>

        {/* Financial Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
          contentContainerStyle={styles.cardsContent}>
          <FinancialCard
            title="Saldo Total"
            amount={financialData.balance}
            type="balance"
            trend={{ value: '+12,5%', isPositive: true }}
          />
          <FinancialCard
            title="Receitas"
            amount={financialData.income}
            type="income"
            trend={{ value: '+8,2%', isPositive: true }}
          />
          <FinancialCard
            title="Despesas"
            amount={financialData.expense}
            type="expense"
            trend={{ value: '-3,1%', isPositive: true }}
          />
        </ScrollView>

        {/* Recent Transactions */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText type="subtitle">Transações Recentes</ThemedText>
            <ThemedText
              style={[styles.seeAll, { color: colors.primary }]}
              onPress={() => router.push('/(tabs)/transactions')}>
              Ver todas
            </ThemedText>
          </ThemedView>

          <Card style={styles.transactionsCard}>
            {recentTransactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.id}
                style={styles.transactionItem}
                onPress={() => router.push('/(tabs)/transactions')}
                activeOpacity={0.7}>
                <ThemedView style={styles.transactionLeft}>
                  <ThemedView
                    style={[
                      styles.transactionIcon,
                      {
                        backgroundColor:
                          transaction.type === 'income'
                            ? colors.success + '20'
                            : colors.danger + '20',
                      },
                    ]}>
                    <ThemedText
                      style={{
                        color: transaction.type === 'income' ? colors.success : colors.danger,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {transaction.type === 'income' ? '+' : '-'}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.transactionInfo}>
                    <ThemedText type="defaultSemiBold">{transaction.description}</ThemedText>
                    <ThemedText style={[styles.transactionDate, { color: colors.textSecondary }]}>
                      {transaction.date}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
                <ThemedText
                  style={[
                    styles.transactionAmount,
                    {
                      color: transaction.type === 'income' ? colors.success : colors.danger,
                    },
                  ]}>
                  {transaction.amount}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </Card>
        </ThemedView>

        {/* Quick Actions */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Ações Rápidas
          </ThemedText>
          <ThemedView style={styles.quickActions}>
            <Card
              style={[styles.actionCard, { backgroundColor: colors.primary }]}
              onTouchEnd={() => router.push('/(tabs)/accounts')}>
              <ThemedText style={[styles.actionText, { color: '#FFFFFF' }]} type="defaultSemiBold">
                Contas Bancárias
              </ThemedText>
            </Card>
            <Card
              style={[styles.actionCard, { backgroundColor: colors.success }]}
              onTouchEnd={() => router.push('/(tabs)/transactions')}>
              <ThemedText style={[styles.actionText, { color: '#FFFFFF' }]} type="defaultSemiBold">
                Nova Transação
              </ThemedText>
            </Card>
          </ThemedView>
        </ThemedView>
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
  greeting: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  cardsContainer: {
    marginBottom: 24,
  },
  cardsContent: {
    paddingRight: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDate: {
    fontSize: 12,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  actionText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
