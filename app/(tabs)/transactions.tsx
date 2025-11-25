import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

type FilterType = 'all' | 'income' | 'expense';

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<FilterType>('all');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  // Dados mockados - serão substituídos pela API
  const transactions = [
    {
      id: '1',
      description: 'Pagamento de fornecedor XYZ',
      amount: -5000,
      date: '2024-01-20',
      category: 'Fornecedores',
      account: 'Banco do Brasil',
      type: 'expense' as const,
    },
    {
      id: '2',
      description: 'Recebimento cliente ABC',
      amount: 12500,
      date: '2024-01-19',
      category: 'Vendas',
      account: 'Itaú',
      type: 'income' as const,
    },
    {
      id: '3',
      description: 'Salário funcionários',
      amount: -45000,
      date: '2024-01-15',
      category: 'Folha de Pagamento',
      account: 'Banco do Brasil',
      type: 'expense' as const,
    },
    {
      id: '4',
      description: 'Venda produto XYZ',
      amount: 8300,
      date: '2024-01-14',
      category: 'Vendas',
      account: 'Bradesco',
      type: 'income' as const,
    },
    {
      id: '5',
      description: 'Aluguel escritório',
      amount: -3500,
      date: '2024-01-10',
      category: 'Despesas Operacionais',
      account: 'Itaú',
      type: 'expense' as const,
    },
    {
      id: '6',
      description: 'Recebimento cliente DEF',
      amount: 15200,
      date: '2024-01-08',
      category: 'Vendas',
      account: 'Banco do Brasil',
      type: 'income' as const,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Hoje';
    if (date.toDateString() === yesterday.toDateString()) return 'Ontem';
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const FilterButton = ({ type, label }: { type: FilterType; label: string }) => {
    const isActive = filter === type;
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          isActive && { backgroundColor: colors.primary },
          !isActive && { backgroundColor: colors.surfaceSecondary },
        ]}
        onPress={() => setFilter(type)}>
        <ThemedText
          style={[
            styles.filterText,
            isActive && { color: '#FFFFFF' },
            !isActive && { color: colors.text },
          ]}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Transações</ThemedText>
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            Histórico completo de movimentações
          </ThemedText>
        </ThemedView>

        {/* Filters */}
        <View style={styles.filters}>
          <FilterButton type="all" label="Todas" />
          <FilterButton type="income" label="Receitas" />
          <FilterButton type="expense" label="Despesas" />
        </View>

        {/* Transactions List */}
        <ThemedView style={styles.transactionsList}>
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionHeader}>
                <View
                  style={[
                    styles.transactionIcon,
                    {
                      backgroundColor:
                        transaction.type === 'income' ? colors.success + '20' : colors.danger + '20',
                    },
                  ]}>
                  <IconSymbol
                    name={transaction.type === 'income' ? 'arrow.down.circle.fill' : 'arrow.up.circle.fill'}
                    size={20}
                    color={transaction.type === 'income' ? colors.success : colors.danger}
                  />
                </View>
                <View style={styles.transactionInfo}>
                  <ThemedText type="defaultSemiBold">{transaction.description}</ThemedText>
                  <ThemedText style={[styles.transactionMeta, { color: colors.textSecondary }]}>
                    {transaction.category} • {transaction.account}
                  </ThemedText>
                </View>
                <View style={styles.transactionAmount}>
                  <ThemedText
                    style={[
                      styles.amountText,
                      {
                        color: transaction.type === 'income' ? colors.success : colors.danger,
                      },
                    ]}>
                    {transaction.type === 'income' ? '+' : ''}
                    {formatAmount(transaction.amount)}
                  </ThemedText>
                  <ThemedText style={[styles.transactionDate, { color: colors.textSecondary }]}>
                    {formatDate(transaction.date)}
                  </ThemedText>
                </View>
              </View>
            </Card>
          ))}
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
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    padding: 16,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  transactionMeta: {
    fontSize: 12,
    marginTop: 4,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    marginTop: 4,
  },
});

