import { View, useColorScheme } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useMemo } from 'react'
import TracksList from '@/app/components/TracksList'
import { defaultStyles } from '@/styles'
import { ScreenPadding } from '@/constants/ScreenPadding'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import i18n from '@/locales'
import { trackTitleFilter } from '@/helpers/filter'
import { useFavorites } from '@/store/library'
import { generateTracksListId } from '@/helpers/miscellaneous'

const FavoriteScreen = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const styles = defaultStyles(isDarkMode)

  const search = useNavigationSearch({
    searchBarOption: {
      placeholder: i18n.t('Find in songs')
    }
  })

  const { favorites: favoritesTracks, toggleTrackFavorite } = useFavorites()

  const filteredFavorites = useMemo(() => {
    if (!search) return favoritesTracks
    return favoritesTracks.filter(trackTitleFilter(search))
  }, [favoritesTracks, search])

  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          paddingHorizontal: ScreenPadding.horizontal,
          flex: 1,
          paddingTop: 50
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <TracksList
          id={generateTracksListId('favorites', search)}
          scrollEnabled={false}
          tracks={filteredFavorites}
          // onToggleFavorite={toggleTrackFavorite}
        />
      </ScrollView>
    </View>
  )
}

export default FavoriteScreen
