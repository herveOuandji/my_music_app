import { View, Text, useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'

const PlaylistScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <View style={styles.container}> 
    </View>
  )
}

export default PlaylistScreen
