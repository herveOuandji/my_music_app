import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import useSetupTrackPlayer from '@/hooks/useSetupTrackPlayer'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler' // <-- Correction ici
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'
import i18n from '@/locales'
import TrackPlayer from 'react-native-track-player'
import { playbackService } from '@/constants/playbackService'

SplashScreen.preventAutoHideAsync()

TrackPlayer.registerPlaybackService(() => playbackService)

const App = () => {
  const handleTrackLayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  useSetupTrackPlayer({
    onLoad: handleTrackLayerLoaded
  })

  useLogTrackPlayerState()

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayout />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="player"
        options={{
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 400,
          headerShown: false
        }}
      />

      <Stack.Screen
        name="(modal)/addToPlaylist"
        options={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor: theme.background
          },
          headerTitle: i18n.t('Add to playlist'),
          headerTitleStyle: {
            color: theme.text
          }
        }}
      />
    </Stack>
  )
}

export default App
