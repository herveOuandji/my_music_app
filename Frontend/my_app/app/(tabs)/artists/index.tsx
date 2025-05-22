import { View, Text, useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'

const ArtistScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Artist List will appear here.</Text>
    </View>
  )
}

export default ArtistScreen
