import { ArtistTracksList } from '@/app/components/ArtistTracksList'
import { ScreenPadding } from '@/constants/ScreenPadding'
import { useArtists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { useColorScheme, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const ArtistDetailScreen = () => {
  const { name: artistName } = useLocalSearchParams<{ name: string }>()

  const artists = useArtists()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  const artist = artists.find((artist) => artist.name === artistName)

  if (!artist) {
    console.warn(`Artist ${artistName} not found!`)

    return <Redirect href={'/(tabs)/artists'} />
  }

  return (
    <View style={defaultStyles(isDarkMode).container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ paddingHorizontal: ScreenPadding.horizontal }}
      >
        <ArtistTracksList artist={artist} />
      </ScrollView>
    </View>
  )
}

export default ArtistDetailScreen
