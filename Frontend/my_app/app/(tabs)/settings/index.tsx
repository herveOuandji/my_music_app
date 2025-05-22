import { View, Text, useColorScheme } from 'react-native'
import { defaultStyles } from '@/styles'

const SettingScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting List will appear here.</Text>
    </View>
  )
}

export default SettingScreen
