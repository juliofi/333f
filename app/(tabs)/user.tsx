import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function UserScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar usuário atual
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        console.log('👤 Usuário carregado:', user?.email);
        setUser(user);
      } catch (error) {
        console.error('❌ Erro ao buscar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    console.log('🚪 Iniciando logout...');
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('❌ Erro ao fazer logout:', error.message);
        return;
      }

      console.log('✅ Logout bem-sucedido!');
      router.replace('/login');
    } catch (err) {
      console.error('💥 Erro inesperado no logout:', err);
    }
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuário';
  const userEmail = user?.email || 'Não disponível';
  const passwordMasked = '••••••••';

  const userFields = [
    { label: 'Usuário', value: userName },
    { label: 'Email', value: userEmail },
    { label: 'Senha', value: passwordMasked },
  ];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24,
          },
        ]}>
        <ThemedText type="title" style={styles.title}>
          Usuário
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Gerencie suas informações pessoais
        </ThemedText>

        <Card style={styles.card} variant="elevated">
          {userFields.map((field) => (
            <View key={field.label} style={styles.fieldRow}>
              <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
                {field.label}
              </ThemedText>
              <ThemedText style={[styles.fieldValue, { color: colors.text }]}>{field.value}</ThemedText>
            </View>
          ))}
        </Card>

        <View style={styles.actions}>
          <Button
            title="Logout"
            style={styles.logoutButton}
            variant="outline"
            onPress={handleLogout}
            disabled={loading}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    gap: 16,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginBottom: 16,
  },
  card: {
    padding: 20,
    gap: 20,
  },
  fieldRow: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 14,
  },
  fieldValue: {
    fontSize: 18,
  },
  actions: {
    gap: 12,
    marginTop: 16,
  },
  logoutButton: {},
});


