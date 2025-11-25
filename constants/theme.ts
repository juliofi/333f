/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Cores profissionais para app financeiro
const primaryColor = '#2563EB'; // Azul profissional
const successColor = '#10B981'; // Verde para receitas
const dangerColor = '#EF4444'; // Vermelho para despesas
const warningColor = '#F59E0B'; // Laranja para alertas

export const Colors = {
  light: {
    text: '#111827',
    textSecondary: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceSecondary: '#F3F4F6',
    tint: primaryColor,
    primary: primaryColor,
    success: successColor,
    danger: dangerColor,
    warning: warningColor,
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: primaryColor,
    border: '#E5E7EB',
  },
  dark: {
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    background: '#111827',
    surface: '#1F2937',
    surfaceSecondary: '#374151',
    tint: '#60A5FA',
    primary: '#3B82F6',
    success: '#34D399',
    danger: '#F87171',
    warning: '#FBBF24',
    icon: '#9CA3AF',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#60A5FA',
    border: '#374151',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
