import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/FontSize'

/**
 * Default styles used across the app.
 * Pass isDarkMode to dynamically switch between light and dark themes.
 */
export const defaultStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode
        ? Colors.dark.background
        : Colors.light.background,
      padding: 16
    },
    text: {
      color: isDarkMode ? Colors.dark.text : Colors.light.text,
      fontSize: FontSize.base,
      fontWeight: '400',
      lineHeight: 24
    }
  })

export const utilsStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    ItemSeparator: {
      borderColor: isDarkMode ? Colors.dark.textMuted : Colors.light.textMuted,
      borderWidth: StyleSheet.hairlineWidth,
      opacity: 0.3
    }
  })
