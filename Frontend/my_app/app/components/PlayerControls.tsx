import { Colors } from '@/constants/Colors'
import { FontAwesome6 } from '@expo/vector-icons'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme
} from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerControlsProps = {
  style?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton iconSize={30} style={{ marginRight: 20 }} />
        <PlayPauseButton iconSize={30} />
        <SkipToNextButton iconSize={30} style={{ marginLeft: 20 }} />
      </View>
    </View>
  )
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const theme = isDarkMode ? Colors.dark : Colors.light

  const { playing } = useIsPlaying()

  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome6
          name={playing ? 'pause' : 'play'}
          size={iconSize}
          color={theme.text}
        />
      </TouchableOpacity>
    </View>
  )
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const theme = isDarkMode ? Colors.dark : Colors.light

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <FontAwesome6 name="forward" size={iconSize} color={theme.text} />
    </TouchableOpacity>
  )
}

export const SkipToPreviousButton = ({
  iconSize = 30,
  style
}: PlayerButtonProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const theme = isDarkMode ? Colors.dark : Colors.light

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
      style={style}
    >
      <FontAwesome6 name="backward" size={iconSize} color={theme.text} />
    </TouchableOpacity>
  )
}

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      width: '100%'
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  })
}
