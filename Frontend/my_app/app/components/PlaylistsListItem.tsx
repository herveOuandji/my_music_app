import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/FontSize'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  useColorScheme,
  View
} from 'react-native'

type PlaylistListItemProps = {
  playlist: Playlist
} & TouchableHighlightProps

export const PlaylistsListItem = ({
  playlist,
  ...props
}: PlaylistListItemProps) => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)
  const theme = isDarkMode ? Colors.dark : Colors.light

  return (
    <TouchableHighlight activeOpacity={0.8} {...props}>
      <View style={styles.playlistItemContainer}>
        <View>
          <Image
            source={playlist.artworkPreview}
            style={styles.playlistArtworkImage}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {playlist.name}
          </Text>
          <AntDesign
            name="right"
            size={16}
            color={theme.icon}
            style={{ opacity: 0.5 }}
          />
        </View>
      </View>
    </TouchableHighlight>
  )
}

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    playlistItemContainer: {
      flexDirection: 'row',
      columnGap: 14,
      alignItems: 'center',
      paddingRight: 90
    },
    playlistArtworkImage: {
      borderRadius: 8,
      width: 70,
      height: 70
    },
    playlistNameText: {
      ...defaultStyles(isDarkMode).text,
      fontSize: FontSize.large,
      fontWeight: '600',
      maxWidth: '80%'
    }
  })
}
