import { Colors } from '@/constants/Colors'
import { unknownTrackImageUri } from '@/constants/images'
import { ScreenPadding } from '@/constants/ScreenPadding'
import { defaultStyles, utilsStyles } from '@/styles'
import { Image } from 'expo-image'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import MovingText from './components/MovingText'
import { FontSize } from '@/constants/FontSize'
import { FontAwesome } from '@expo/vector-icons'
import { PlayerControls } from './components/PlayerControls'
import { PlayerProgressBar } from './components/PlayerProgressBar'
import { PlayerVolumeBar } from './components/PlayerVolumeBar'
import { PlayerRepeatToggle } from './components/PlayerRepeatToggle'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { BlurView } from 'expo-blur'
import { useTrackPlayerFavorite } from '@/hooks/useTrackPlayerFavorite'

const PlayerScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)
  const theme = isDarkMode ? Colors.dark : Colors.light
  const { top, bottom } = useSafeAreaInsets()

  const activeTrack = useActiveTrack()

  const isRemoteArtwork =
    typeof activeTrack?.artwork === 'string' &&
    activeTrack.artwork.startsWith('http')

  const remoteArtworkUri = isRemoteArtwork ? activeTrack!.artwork : ''
  const { imageColor } = usePlayerBackground(remoteArtworkUri ?? '')

  const artworkSource = isRemoteArtwork
    ? { uri: activeTrack!.artwork }
    : unknownTrackImageUri

  const {isFavorite, toggleFavorite} = useTrackPlayerFavorite()

  if (!activeTrack) {
    return (
      <View
        style={[
          defaultStyles(isDarkMode).container,
          { justifyContent: 'center' }
        ]}
      >
        <ActivityIndicator color={theme.icon} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Background image with optional blur */}
      <Image
        source={artworkSource}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        blurRadius={Platform.OS === 'android' ? 20 : 0}
      />

      {Platform.OS === 'ios' && (
        <BlurView
          tint={isDarkMode ? 'dark' : 'light'}
          intensity={90}
          style={StyleSheet.absoluteFill}
        />
      )}

      {/* Optional overlay tint for readability */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: imageColor ?? theme.background, opacity: 0.5 }
        ]}
      />

      <View style={styles.overlayContainer}>
        <DismissPlayerSymbol />
        <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
          <View style={styles.artworkImageContainer}>
            <Image
              source={artworkSource}
              contentFit="cover"
              style={styles.artworkImage}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 'auto' }}>
              <View style={{ height: 60 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={activeTrack.title ?? ''}
                      animationThreshold={30}
                      style={styles.trackTitleText}
                    />
                  </View>
                  <FontAwesome
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={20}
                    color={isFavorite ? theme.tabIconSelected : theme.text}
                    style={{ marginHorizontal: 14 }}
                    onPress={toggleFavorite}
                  />
                </View>
                {activeTrack.artist && (
                  <Text
                    numberOfLines={1}
                    style={[styles.trackArtistText, { marginTop: 6 }]}
                  >
                    {activeTrack.artist}
                  </Text>
                )}
              </View>
              <PlayerProgressBar style={{ marginTop: 32 }} />
              <PlayerControls style={{ marginTop: 40 }} />
            </View>
            <PlayerVolumeBar style={{ marginTop: 'auto', marginBottom: 30 }} />
            <View style={utilsStyles(isDarkMode).centeredRow}>
              <PlayerRepeatToggle style={{ marginBottom: 6 }} size={30} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const DismissPlayerSymbol = () => {
  const { top } = useSafeAreaInsets()
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const theme = isDarkMode ? Colors.dark : Colors.light

  return (
    <View
      style={{
        position: 'absolute',
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: theme.icon,
          opacity: 0.7
        }}
      />
    </View>
  )
}

const getStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    overlayContainer: {
      ...defaultStyles(isDarkMode).container,
      paddingHorizontal: ScreenPadding.horizontal,
      backgroundColor: 'transparent'
    },
    artworkImageContainer: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.44,
      shadowRadius: 11.0,
      flexDirection: 'row',
      justifyContent: 'center',
      height: '45%'
    },
    artworkImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12
    },
    trackTitleContainer: {
      flex: 1,
      overflow: 'hidden'
    },
    trackTitleText: {
      ...defaultStyles(isDarkMode).text,
      fontSize: FontSize.xlarge,
      fontWeight: '700'
    },
    trackArtistText: {
      ...defaultStyles(isDarkMode).text,
      fontSize: FontSize.base,
      opacity: 0.8,
      maxWidth: '90%'
    }
  })
}

export default PlayerScreen
