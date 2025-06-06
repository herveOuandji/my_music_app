import { View, useColorScheme, StyleSheet } from 'react-native'
import { defaultStyles } from '@/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { ScreenPadding } from '@/constants/ScreenPadding'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import i18n from '@/locales'
import { usePlaylists } from '@/store/library'
import { useMemo } from 'react'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useRouter } from 'expo-router'
import { PlaylistsList } from '@/app/components/PlaylistsList'

// Déclare getStyles AVANT de l'utiliser
const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    scrollView: {
      paddingHorizontal: ScreenPadding.horizontal,
      paddingTop: 50
    },
    text: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 16,
      fontWeight: '500'
    }
  })
}

const PlaylistsScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)

  const router = useRouter()

  const search = useNavigationSearch({
    searchBarOption: {
      placeholder: i18n.t('Find in playlists'),
      hideWhenScrolling: false
    }
  })
  const { playlists } = usePlaylists()

  const filteredPlaylists = useMemo(() => {
    if (!search) return playlists
    return playlists.filter(playlistNameFilter(search))
  }, [playlists, search])

  const handlePlaylistPress = (playlist: Playlist) => {
    router.push({
      pathname: '/(tabs)/playlists/[name]',
      params: { name: encodeURIComponent(playlist.name) }
    })
  }

  return (
    <View style={defaultStyles(isDarkMode).container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <PlaylistsList
          scrollEnabled={false}
          playlists={filteredPlaylists}
          onPlaylistPress={handlePlaylistPress}
        />
      </ScrollView>
    </View>
  )
}

export default PlaylistsScreen
