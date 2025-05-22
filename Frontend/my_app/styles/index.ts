import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/FontSize'

/**
 * Default styles used across the app.
 * To support both light and dark modes dynamically, consider passing theme props or using a theme context.
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
    text : {
        color: isDarkMode
            ? Colors.dark.text
            : Colors.light.text,
        fontSize: FontSize.base,
        fontWeight: '400',
        lineHeight: 24,
    }
  })

export const utilsStyles = StyleSheet.create({
})
