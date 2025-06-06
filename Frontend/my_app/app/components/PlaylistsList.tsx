import { unknownTrackImageUri } from '@/constants/images'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import i18n from '@/locales'
import { utilsStyles } from '@/styles'
import { Image } from 'expo-image'
import { useMemo } from 'react'
import {
  FlatList,
  FlatListProps,
  Text,
  useColorScheme,
  View
} from 'react-native'
import { PlaylistsListItem } from './PlaylistsListItem'

type PlaylistsListProps = {
  playlists: Playlist[]
  onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  return (
    <View
      style={{
        ...utilsStyles(isDarkMode).ItemSeparator,
        marginLeft: 80,
        marginVertical: 12
      }}
    />
  )
}
export const PlaylistsList = ({
  playlists,
  onPlaylistPress: handlePlaylistPress,
  ...flatListProps
}: PlaylistsListProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  const search = useNavigationSearch({
    searchBarOption: {
      placeholder: i18n.t('Find in playlists'),
      hideWhenScrolling: false
    }
  })
  const filteredPlaylists = useMemo(() => {
    if (!search) return playlists

    return playlists.filter(playlistNameFilter(search))
  }, [playlists, search])

  return (
    <FlatList
      data={filteredPlaylists}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles(isDarkMode).emptyContentText}>
            {i18n.t("No playlists found")}
          </Text>

          <Image
            source={unknownTrackImageUri}
            style={utilsStyles(isDarkMode).emptyContentImage}
          />
        </View>
      }
      {...flatListProps}
      renderItem={({ item: playlist }) => (
        <PlaylistsListItem
          playlist={playlist}
          onPress={() => handlePlaylistPress(playlist)}
        />
      )}
    />
  )
}
