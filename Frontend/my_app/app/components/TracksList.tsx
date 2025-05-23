import { FlatList, FlatListProps } from 'react-native'
import library from '@/assets/data/library.json'
import TrackListItem from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<any>>

const TracksList = ({ ...flatListProps }: TracksListProps) => {
  return (
    <FlatList
      data={library}
      keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      renderItem={({ item }) => (
        <TrackListItem
          track={{
            ...item,
            image: item.artwork,
          }}
        />
      )}
      {...flatListProps}
    />
  )
}

export default TracksList
