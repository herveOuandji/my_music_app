import { useEffect, useRef } from 'react'
import TrackPlayer, {
  Capability,
  RatingType,
  RepeatMode
} from 'react-native-track-player'

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 1024 * 100, // 100 MB
    waitForBuffer: true
  })

  await TrackPlayer.updateOptions({
    ratingType: RatingType.Heart,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop
    ]
  })

  await TrackPlayer.setVolume(0.3) // Set initial volume to 100%
  await TrackPlayer.setRepeatMode(RepeatMode.Queue) // Set repeat mode to Queue
}

const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false)
  useEffect(() => {
    const initializePlayer = async () => {
      try {
        await setupPlayer()
        isInitialized.current = true
        onLoad?.() // Call the onLoad function after setup
        console.log('Track Player setup successfully')
      } catch (error) {
        isInitialized.current = false
        console.error('Error setting up Track Player:', error)
      }
    }
    initializePlayer()
  }, [onLoad])
}

export default useSetupTrackPlayer
