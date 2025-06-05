import { trackTitleFilter } from '@/helpers/filter'
import { Artist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import i18n from '@/locales'
import { useMemo } from 'react'
import TracksList from './TracksList'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Image } from 'expo-image'
import { unknownArtistImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { FontSize } from '@/constants/FontSize'
import { QueueControl } from './QueueControl'

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)

  const search = useNavigationSearch({
    searchBarOption: {
      hideWhenScrolling: true,
      placeholder: i18n.t('Find in songs')
    }
  })

  const filteredArtistTracks = useMemo(() => {
    return artist.tracks.filter(trackTitleFilter(search))
  }, [artist.tracks, search])

  return (
    <TracksList
      id={generateTracksListId(artist.name, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.artistHeaderContainer} 
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image source={unknownArtistImageUri} style={styles.artistImage} />
          </View>
          <Text numberOfLines={1} style={styles.artistNameText}>
            {artist.name}
          </Text>
          {search.length === 0 && (
            <QueueControl
              tracks={filteredArtistTracks}
              style={{ paddingTop: 24 }}
            />
          )}
        </View>
      }
      tracks={artist.tracks}
    />
  )
}

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    artistHeaderContainer: {
      flex: 1,
      marginBottom: 32
    },
    artworkImageContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      height: 200
    },
    artistImage: {
      width: '60%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 128
    },
    artistNameText: {
      ...defaultStyles(isDarkMode).text,
      marginTop: 22,
      textAlign: 'center',
      fontSize: FontSize.large,
      fontWeight: '800'
    }
  })
}
