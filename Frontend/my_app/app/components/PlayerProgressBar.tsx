import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/FontSize'
import { formatSecondToMinute } from '@/helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '@/styles'
import { StyleSheet, Text, useColorScheme, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'

export const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250)
  
  const isSliding = useSharedValue(false)
  const progress = useSharedValue(0)
  const min = useSharedValue(0)
  const max = useSharedValue(1)

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const theme = isDarkMode ? Colors.dark : Colors.light
  const styles = getStyles(isDarkMode)

  const trackElapsedTime = formatSecondToMinute(position)
  const trackRemainingTime = formatSecondToMinute(duration - position)

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0
  }
  return (
    <View style={style}>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilsStyles(isDarkMode).slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          minimumTrackTintColor: theme.minimumTrackTintColor,
          maximumTrackTintColor: theme.maximumTrackTintColor
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration)
        }}
        onSlidingComplete={async (value) => {
          if (!isSliding.value) return

          isSliding.value = false

          await TrackPlayer.seekTo(value * duration)
        }}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>
          {'-'} {trackRemainingTime}
        </Text>
      </View>
    </View>
  )
}
const getStyles = (isDarkMode: boolean) => {
  const theme = isDarkMode ? Colors.dark : Colors.light
  return StyleSheet.create({
    timeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 20
    },
    timeText: {
      ...defaultStyles(isDarkMode).text,
      color: theme.text,
      opacity: 0.75,
      fontSize: FontSize.xs,
      letterSpacing: 0.7,
      fontWeight: '500'
    }
  })
}
