import { FlatList, FlatListProps, View, useColorScheme } from 'react-native'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'
import { Track } from 'react-native-track-player'

export type TracksListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[]
}

const ItemDivider = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = utilsStyles(isDarkMode)
  return (
    <View style={{ ...styles.ItemSeparator, marginVertical: 9, marginLeft: 60 }} />
  )
}

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingBottom: 128, paddingTop: 10 }}
      ListFooterComponent={ItemDivider}
      ItemSeparatorComponent={ItemDivider}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} />
      )}
      {...flatListProps}
    />
  )
}

export default TracksList
