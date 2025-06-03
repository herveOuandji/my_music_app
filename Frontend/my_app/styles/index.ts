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
    centeredRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    slider: {
      height: 7,
      borderRadius: 16
    },
    ItemSeparator: {
      borderColor: isDarkMode ? Colors.dark.textMuted : Colors.light.textMuted,
      borderWidth: StyleSheet.hairlineWidth,
      opacity: 0.3
    },
    emptyContentText: {
      ...defaultStyles(isDarkMode).text,
      color: isDarkMode ? Colors.dark.textMuted : Colors.light.textMuted,
      textAlign: 'center',
      marginTop: 20
    },
    emptyContentImage: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginTop: 40,
      opacity: 0.3
    }
  })
