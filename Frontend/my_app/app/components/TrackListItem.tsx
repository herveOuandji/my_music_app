import { FontSize } from '@/constants/FontSize'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  useColorScheme
} from 'react-native'
import { Colors } from '@/constants/Colors'

export type TrackListItemProps = {
  /**
   * The track object containing title, optional artist, and optional image.
   */
  track: { title: string; artist?: string; image?: string }
}

const TrackListItem = ({ track }: TrackListItemProps) => {
  const isActiveTrack = false
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)
  const theme = isDarkMode ? Colors.dark : Colors.light

  return (
    <TouchableHighlight>
      <View
        style={{ ...styles.trackItemContainer  }}
      >
        <View>
          <Image
            source={track.image ?? unknownTrackImageUri}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1
            }}
            contentFit="cover"
            transition={300}
          />
        </View>
        <View style={{ width: '100%' }}>
          <Text
            style={{
              ...styles.trackTitleText,
              color: isActiveTrack ? (isDarkMode ? '#fff' : '#000') : theme.text
            }}
            numberOfLines={1}
          >
            {track.title}
          </Text>
          {track.artist && (
            <Text numberOfLines={1} style={styles.trackArtistText}>
              {track.artist}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const getStyles = (isDarkMode: boolean) => {
  const theme = isDarkMode ? Colors.dark : Colors.light
  return StyleSheet.create({
    trackItemContainer :{
      flexDirection: 'row',
      columnGap: 14,
      alignItems: 'center',
      paddingRight: 20,
    }, 

    trackArtworkImage: {
      borderRadius: 8,
      width: 50,
      height: 50,
      marginRight: 12
    },
    trackTitleText: {
      ...defaultStyles(isDarkMode).text,
      fontSize: FontSize.small,
      fontWeight: '600',
      maxWidth: '90%'
    },
    trackArtistText: {
      ...defaultStyles(isDarkMode).text,
      color: theme.textMuted,
      fontSize: FontSize.xs
    }, 
    
  })
}

export default TrackListItem
