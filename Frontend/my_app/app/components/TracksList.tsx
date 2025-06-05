import {
  FlatList,
  FlatListProps,
  Text,
  View,
  useColorScheme
} from 'react-native'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track, RepeatMode } from 'react-native-track-player'
import i18n from '@/locales'
import { Image } from 'expo-image'
import { unknownTrackImageUri } from '@/constants/images'
import { useQueue } from '@/store/queue'
import { useRef } from 'react'
import { QueueControl } from './QueueControl'

export type TracksListProps = Partial<FlatListProps<Track>> & {
  id: string
  tracks: Track[]
  hideQueueControls?: boolean
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

const TracksList = ({
  id,
  tracks,
  hideQueueControls = false,
  ...flatListProps
}: TracksListProps) => {
  const queueOffset = useRef(0)
  const { activeQueueId, setActiveQueueId } = useQueue()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'

  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex(
      (track) => track.url === selectedTrack.url
    )

    if (trackIndex === -1) return

    const isChangingQueue = id !== activeQueueId

    if (isChangingQueue) {
      await TrackPlayer.reset()

      // Add all tracks to create a proper circular queue
      await TrackPlayer.add(tracks)

      // Set repeat mode to ensure circular playback
      await TrackPlayer.setRepeatMode(RepeatMode.Queue)

      // Skip to the selected track
      await TrackPlayer.skip(trackIndex)
      await TrackPlayer.play()

      // Reset queue offset since we're using the original track order
      queueOffset.current = 0
      setActiveQueueId(id)
    } else {
      // When staying in the same queue, just skip to the track
      await TrackPlayer.skip(trackIndex)
      TrackPlayer.play()
    }
  }

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingBottom: 128, paddingTop: 10 }}
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControl tracks={tracks} style={{ paddingBottom: 20 }} />
        ) : undefined
      }
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
