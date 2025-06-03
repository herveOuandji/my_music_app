import { FontSize } from '@/constants/FontSize'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewProps
} from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import {
  PlayPauseButton,
  SkipToNextButton,
  SkipToPreviousButton
} from './PlayerControls' 
import useLastActiveTrack from '@/hooks/useLastActiveTrack'
import MovingText from './MovingText'
import { useRouter } from 'expo-router'

const FloatingPlayer = ({ style }: ViewProps) => {
  const router = useRouter()

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)

  const activeTrack = useActiveTrack()
  const lastActiveTrack = useLastActiveTrack()

  const displayedTrack = activeTrack ?? lastActiveTrack

  const handlePress = () => {
    router.navigate('/player')
  }
  // Si activeTrack n'est pas défini, on retourne null
  if (!displayedTrack) return null

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.6}
      style={[styles.container, style]}
    >
      <>
        <Image
          source={displayedTrack.artwork ?? unknownTrackImageUri}
          style={styles.trackArtworkImage}
        />
        <View style={styles.trackItemContainer}>
          <MovingText
            style={styles.trackTitleText}
            text={displayedTrack.title ?? ''}
            animationThreshold={30}
          />
        </View>
        <View style={styles.trackControlContainer}>
          <SkipToPreviousButton iconSize={24} />
          <PlayPauseButton iconSize={24} />
          <SkipToNextButton iconSize={24} />
        </View>
      </>
    </TouchableOpacity>
  )
}

const getStyles = (isDarkMode: boolean) => {
  
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#252525' : '#F5F5F5',
      padding: 8,
      borderRadius: 12,
      paddingVertical: 10
    },
    trackItemContainer: {
      flex: 1,
      overflow: 'hidden',
      marginLeft: 10
    },

    trackArtworkImage: {
      width: 40,
      height: 40,
      borderRadius: 8,
    },
    trackTitleText: {
      ...defaultStyles(isDarkMode).text,
      fontSize: FontSize.large,
      fontWeight: '600', 
      paddingLeft: 10
    },
    trackControlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 20,
      marginRight: 16,
      paddingLeft: 16
    }
  })
}

export default FloatingPlayer
