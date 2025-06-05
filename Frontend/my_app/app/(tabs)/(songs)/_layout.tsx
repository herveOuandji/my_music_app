import { useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'
import i18n from '@/locales'
import useStackScreenWithSearchBar from '@/constants/layout'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import IndexScreen from './index'

const Stack = createNativeStackNavigator()

const SongsLayout = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { ...styles.container, flex: 1 }
      }}
    >
      <Stack.Screen
        name="index"
        component={IndexScreen}
        options={{
          ...useStackScreenWithSearchBar(),
          title: i18n.t('songs')
        }}
      />
    </Stack.Navigator>
  )
}

export default SongsLayout
