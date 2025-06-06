import { PlaylistTracksList } from '@/app/components/PlaylistTracksList'
import { ScreenPadding } from '@/constants/ScreenPadding'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { ScrollView, useColorScheme, View } from 'react-native'

const PlaylistScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const { name: playlistName } = useLocalSearchParams<{ name: string }>()

  const { playlists } = usePlaylists()

  const playlist = playlists.find((playlist) => playlist.name === playlistName)

  if (!playlist) {
    console.warn(`Playlist ${playlistName} was not found!`)

    return <Redirect href={'/(tabs)/playlists'} />
  }

  return (
    <View style={defaultStyles(isDarkMode).container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: ScreenPadding.horizontal }}
      >
        <PlaylistTracksList playlist={playlist} />
      </ScrollView>
    </View>
  )
}

export default PlaylistScreen
