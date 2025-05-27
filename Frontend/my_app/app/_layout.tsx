import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import useSetupTrackPlayer from '@/hooks/useSetupTrackPlayer'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

const App = () => {
  

  const handleTrackLayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  useSetupTrackPlayer({
    onLoad: handleTrackLayerLoaded,
  })

  useLogTrackPlayerState() 

  return (
    <SafeAreaProvider>
      <RootLayout />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modal)"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}

export default App
