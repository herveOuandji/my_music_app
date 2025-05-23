import { Stack } from 'expo-router'
import { View, useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'
import i18n from '@/locales'
import useStackScreenWithSearchBar from '@/constants/layout'

const FavoriteScreenLayout = () => {
  const colorScheme = useColorScheme() // 'dark' or 'light'
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <View style={styles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...useStackScreenWithSearchBar(),
            title: i18n.t('favorites')
          }}
        />
      </Stack>
    </View>
  )
}

export default FavoriteScreenLayout
