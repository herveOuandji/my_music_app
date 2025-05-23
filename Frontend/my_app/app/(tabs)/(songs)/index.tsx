import { View, useColorScheme, ScrollView } from 'react-native'
import { defaultStyles } from '@/styles'
import TracksList from '@/app/components/TracksList'

const SongsScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  return (
    <View style={styles.container}>
      <ScrollView>
        <TracksList scrollEnabled={false} />
      </ScrollView>
    </View>
  )
}

export default SongsScreen
