import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Informe seu e-mail e senha para continuar.');
      return;
    }

    setLoading(true);
    setError(null);

    console.log('🔐 Iniciando login...');
    console.log('📧 Email:', email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      console.log('📥 Resposta do Supabase:', { data, error });

      if (error) {
        console.error('❌ Erro no login:', error.message);
        setError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log('✅ Login bem-sucedido!');
        console.log('👤 Usuário:', {
          id: data.user.id,
          email: data.user.email,
          created_at: data.user.created_at,
        });
        console.log('🔑 Session:', data.session ? 'Sessão criada' : 'Sem sessão');
        
        // Login bem-sucedido - redirecionar para as tabs
        router.replace('/(tabs)');
      } else {
        console.warn('⚠️ Login sem dados de usuário');
        setError('Erro ao fazer login. Tente novamente.');
        setLoading(false);
      }
    } catch (err) {
      console.error('💥 Erro inesperado no login:', err);
      setError('Erro inesperado. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        keyboardShouldPersistTaps="handled">
        <ThemedView style={styles.content}>
          <ThemedView style={styles.hero}>
            <ThemedText type="title" style={styles.logo}>
              Telus Control
            </ThemedText>
          </ThemedView>

          <Card style={styles.card} variant="elevated">
            <View style={styles.formHeader}>
              <ThemedText type="subtitle">Acesse sua conta</ThemedText>
              <ThemedText style={[styles.formCaption, { color: colors.textSecondary }]}>
                Os dados ficam armazenados localmente por enquanto.
              </ThemedText>
            </View>

            <Input
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />

            {error && (
              <ThemedText style={[styles.error, { color: colors.danger }]}>
                {error}
              </ThemedText>
            )}

            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
          </Card>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    gap: 24,
  },
  hero: {
    gap: 12,
  },
  logo: {
    fontSize: 32,
  },
  subtitle: {
    fontSize: 16,
  },
  card: {
    padding: 20,
    gap: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  formHeader: {
    gap: 4,
  },
  formCaption: {
    fontSize: 14,
  },
  error: {
    fontSize: 14,
  },
});

