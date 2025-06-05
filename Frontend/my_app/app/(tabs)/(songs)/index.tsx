import { View, useColorScheme, ScrollView } from 'react-native'
import { defaultStyles } from '@/styles'
import TracksList from '@/app/components/TracksList'
import { ScreenPadding } from '@/constants/ScreenPadding'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { enableScreens } from 'react-native-screens'
import i18n from '@/locales'
import { useTracks } from '@/store/library'
import { useMemo } from 'react'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'

enableScreens()
const SongsScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = defaultStyles(isDarkMode)

  // Set up navigation search bar
  const search = useNavigationSearch({
    searchBarOption: {
      placeholder: i18n.t('Find in songs'),
      hideWhenScrolling: false
    }
  })

  const tracks = useTracks()
  // Filter tracks based on search
  const filteredTracks = useMemo(() => {
    if (!search) return tracks
    return tracks.filter(trackTitleFilter(search))
  }, [search, tracks])

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
        <TracksList
          id={generateTracksListId('songs', search)}
          tracks={filteredTracks}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  )
}

export default SongsScreen
