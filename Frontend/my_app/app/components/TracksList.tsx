import {
  FlatList,
  FlatListProps,
  Text,
  View,
  useColorScheme
} from 'react-native'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import i18n from '@/locales'
import { Image } from 'expo-image'
import { unknownTrackImageUri } from '@/constants/images'

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[]
}

const ItemDivider = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = utilsStyles(isDarkMode)

  return (
    <View
      style={{ ...styles.ItemSeparator, marginVertical: 9, marginLeft: 60 }}
    />
  )
}

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track)
    await TrackPlayer.play()
  }

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingBottom: 128, paddingTop: 10 }}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles(isDarkMode).emptyContentText}>
            {i18n.t('No songs found')}
          </Text>
          <Image
            source={unknownTrackImageUri}
            style={utilsStyles(isDarkMode).emptyContentImage}
          />
        </View>
      }
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      {...flatListProps}
    />
  )
}

export default TracksList
