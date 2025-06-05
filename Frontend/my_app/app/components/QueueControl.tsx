import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/FontSize'
import i18n from '@/locales'
import { defaultStyles } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewProps
} from 'react-native'
import TrackPlayer, { Track, RepeatMode } from 'react-native-track-player'
import { useQueue } from '@/store/queue'

type QueueControlProps = {
  tracks: Track[]
  id?: string // Add optional id to identify the queue
} & ViewProps

export const QueueControl = ({
  tracks,
  id,
  style,
  ...viewProps
}: QueueControlProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)
  const theme = isDarkMode ? Colors.dark : Colors.light
  const { setActiveQueueId } = useQueue()

  const setupQueue = async (tracksToAdd: Track[]) => {
    if (!tracksToAdd.length) return

    try {
      await TrackPlayer.reset()

      // Create circular queue by duplicating tracks
      const duplicatedTracks = [...tracksToAdd, ...tracksToAdd]

      await TrackPlayer.add(duplicatedTracks)
      await TrackPlayer.setRepeatMode(RepeatMode.Queue)

      const queue = await TrackPlayer.getQueue()
      if (queue.length === 0) {
        console.warn('Queue is empty after adding tracks')
        return
      }

      await TrackPlayer.skip(0)
      await TrackPlayer.play()

      // Update active queue ID if provided
      if (id) {
        setActiveQueueId(id)
      }
    } catch (error) {
      console.error('Error setting up queue:', error)
    }
  }

  const handlePlay = async () => {
    await setupQueue(tracks)
  }

  const handleShufflePlay = async () => {
    if (!tracks.length) return

    // Create a proper shuffle using Fisher-Yates algorithm
    const shuffledTracks = [...tracks]
    for (let i = shuffledTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledTracks[i], shuffledTracks[j]] = [
        shuffledTracks[j],
        shuffledTracks[i]
      ]
    }

    await setupQueue(shuffledTracks)
  }

  return (
    <View
      style={[{ flexDirection: 'row', columnGap: 16 }, style]}
      {...viewProps}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={handlePlay}
        >
          <Ionicons name="play" size={22} color={theme.tabIconSelected} />
          <Text style={styles.buttonText}>{i18n.t('Play')}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={handleShufflePlay}
        >
          <Ionicons
            name="shuffle-sharp"
            size={24}
            color={theme.tabIconSelected}
          />
          <Text style={styles.buttonText}>{i18n.t('Shuffle')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    button: {
      padding: 12,
      backgroundColor: isDarkMode
        ? 'rgba(47, 47, 47, 0.5)'
        : 'rgba(213,213,213,0.7)',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 8
    },
    buttonText: {
      ...defaultStyles(isDarkMode).text,
      color: isDarkMode
        ? Colors.dark.tabIconSelected
        : Colors.light.tabIconSelected,
      fontWeight: '600',
      fontSize: FontSize.large,
      textAlign: 'center'
    }
  })
}
