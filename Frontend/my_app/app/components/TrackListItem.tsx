import { FontSize } from '@/constants/FontSize'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import { Image } from 'expo-image'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  useColorScheme,
  ActivityIndicator
} from 'react-native'
import { Colors } from '@/constants/Colors'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { TrackShortcutsMenu } from './TrackShortcutsMenu'
import { StopPropagation } from './utils/StopPropagation'
// import LoaderKit from 'react-native-loader-kit'

export type TrackListItemProps = {
  /**
   * The track object containing title, optional artist, and optional image.
   */
  track: Track
  onTrackSelect: (track: Track) => void
}

const TrackListItem = ({
  track,
  onTrackSelect: handleTrackSelect
}: TrackListItemProps) => {
  const { playing } = useIsPlaying()
  const isActiveTrack = useActiveTrack()?.url === track.url

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const theme = isDarkMode ? Colors.dark : Colors.light
  const styles = getStyles(isDarkMode)

  return (
    <TouchableHighlight onPress={() => handleTrackSelect(track)}>
      <View style={{ ...styles.trackItemContainer }}>
        <View>
          <Image
            source={track.artwork ?? unknownTrackImageUri}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1
            }}
            contentFit="cover"
            transition={300}
          />

          {isActiveTrack &&
            (playing ? (
              <ActivityIndicator
                style={styles.trackPlayingIconIndicator}
                size={24}
                color={theme.icon}
              />
            ) : (
              // <LoaderKit
              // name='LineScaleParty'
              //   style={styles.trackPlayingIconIndicator}
              //   color={theme.icon}  />
              <Ionicons
                name="play"
                style={styles.trackPauseIconIndicator}
                size={24}
                color={theme.icon}
              />
            ))}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ width: '100%' }}>
            <Text
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack
                  ? isDarkMode
                    ? '#fff'
                    : '#000'
                  : theme.text
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

          <StopPropagation>
            <TrackShortcutsMenu track={track}>
              <View style={{ padding: 6 }}>
                <Entypo
                  name="dots-three-horizontal"
                  size={15}
                  color={theme.icon}
                />
              </View>
            </TrackShortcutsMenu>
          </StopPropagation>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const getStyles = (isDarkMode: boolean) => {
  const theme = isDarkMode ? Colors.dark : Colors.light
  return StyleSheet.create({
    trackItemContainer: {
      flexDirection: 'row',
      columnGap: 14,
      alignItems: 'center',
      paddingRight: 20
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
    trackPlayingIconIndicator: {
      position: 'absolute',
      top: 10,
      left: 16,
      width: 16,
      height: 16
    },
    trackPauseIconIndicator: {
      position: 'absolute',
      top: 14,
      left: 14
    }
  })
}

export default TrackListItem
