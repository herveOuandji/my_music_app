import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Colors } from './Colors'
import { useColorScheme } from 'react-native'

const useStackScreenWithSearchBar = (): NativeStackNavigationOptions => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

  return {
    headerLargeTitle: true,
    headerLargeStyle: {
      backgroundColor: theme.background
    },
    headerLargeTitleStyle: {
      color: theme.text
    },
    headerTintColor: theme.text,
    headerTransparent: true,
    headerBlurEffect: 'prominent',
    headerShadowVisible: false
  }
}

export default useStackScreenWithSearchBar
