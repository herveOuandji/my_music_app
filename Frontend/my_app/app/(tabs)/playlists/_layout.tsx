import { Stack } from 'expo-router'
import { View, useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'
import i18n from '@/locales'
import useStackScreenWithSearchBar from '@/constants/layout'
import { Colors } from '@/constants/Colors'

const PlaylistScreenLayout = () => {
  const colorScheme = useColorScheme() // 'dark' or 'light'
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)
  const theme = isDarkMode ? Colors.dark : Colors.light

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...useStackScreenWithSearchBar(),
            title: i18n.t('playlists')
          }}
        />
        <Stack.Screen
          name="[name]"
          options={{
            headerTitle: '',
            headerBackVisible: true,
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.tabIconSelected
          }}
        />
      </Stack>
    </View>
  )
}

export default PlaylistScreenLayout
