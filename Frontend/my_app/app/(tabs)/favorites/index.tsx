import { View, Text, useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'

const FavoriteScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorite List will appear here.</Text>
    </View>
  )
}

export default FavoriteScreen
