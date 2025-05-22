import { Stack } from 'expo-router'
import { View, useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'
import i18n from '@/locales'

const SettingScreenLayout = () => {
  const colorScheme = useColorScheme() // 'dark' or 'light'
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: i18n.t('settings'),
            headerShown: true
          }}
        />
      </Stack>
    </View>
  )
}

export default SettingScreenLayout
