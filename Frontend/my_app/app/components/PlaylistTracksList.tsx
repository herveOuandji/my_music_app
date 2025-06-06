import useNavigationSearch from '@/hooks/useNavigationSearch'
import TracksList from './TracksList'
import i18n from '@/locales'
import { useMemo } from 'react'
import { Playlist } from '@/helpers/types'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { defaultStyles } from '@/styles'
import { FontSize } from '@/constants/FontSize'
import { Image } from 'expo-image' 
import { QueueControl } from './QueueControl'

export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)
  const search = useNavigationSearch({
    searchBarOption: {
      hideWhenScrolling: true,
      placeholder: i18n.t('Find in playlists')
    }
  })

  const filteredPlaylistsTracks = useMemo(() => {
    return playlist.tracks.filter(trackTitleFilter(search))
  }, [playlist.tracks, search])

  return (
    <TracksList
      id={generateTracksListId(playlist.name, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.playlistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image
              source={playlist.artworkPreview}
              style={styles.artworkImage}
            />
          </View>
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>
          {search.length === 0 && (
            <QueueControl style={{ paddingTop: 24 }} tracks={playlist.tracks} />
          )}
        </View>
      }
      tracks={filteredPlaylistsTracks}
    />
  )
}
const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    playlistHeaderContainer: {
      flex: 1,
      marginBottom: 32
    },
    artworkImageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      height: 300
    },
    artworkImage: {
      width: '85%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 12
    },
    playlistNameText: {
      ...defaultStyles(isDarkMode).text,
      marginTop: 22,
      textAlign: 'center',
      fontSize: FontSize.large,
      fontWeight: '800'
    }
  })
}
