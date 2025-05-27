import { View, useColorScheme, ScrollView } from 'react-native'
import { defaultStyles } from '@/styles'
import TracksList from '@/app/components/TracksList'
import { ScreenPadding } from '@/constants/ScreenPadding'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import library from '@/assets/data/library.json'
import { enableScreens } from 'react-native-screens'


enableScreens()
const SongsScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  // Set up navigation search bar
  const search = useNavigationSearch({
    searchBarOption: {
      placeholder: 'Search',
      hideWhenScrolling: false
    }
  })

  // Filter tracks based on search
  const filteredTracks = search
    ? library.filter(
        (track) =>
          track.title.toLowerCase().includes(search.toLowerCase()) ||
          (track.artist &&
            track.artist.toLowerCase().includes(search.toLowerCase()))
      )
    : library

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          ...styles.container,
          paddingHorizontal: ScreenPadding.horizontal,
          flex: 1,
          paddingTop: 50
        }}
      >
        <TracksList tracks={filteredTracks} scrollEnabled={false} />
      </ScrollView>
    </View>
  )
}

export default SongsScreen
