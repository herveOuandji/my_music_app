import { Stack } from 'expo-router' // Import Stack navigator from Expo Router
import { StatusBar } from 'expo-status-bar' // Import StatusBar for status bar styling
import { SafeAreaProvider } from 'react-native-safe-area-context' // Import SafeAreaProvider for safe area handling

// Main App component
const App = () => {
  return (
    // Provides safe area context to the app (handles notches, etc.)
    <SafeAreaProvider>
      <RootLayout /> {/* Renders the navigation stack */}
      <StatusBar style="auto" /> {/* Sets the status bar style */}
    </SafeAreaProvider>
  )
}

// Root layout for navigation
const RootLayout = () => {
  return (
    <Stack>
      {/* Main tab navigator, header is hidden */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />
      {/* Modal screen, presented as a modal */}
      <Stack.Screen
        name="(modal)"
        options={{
          presentation: 'modal'
        }}
      />
    </Stack>
  )
}

export default App // Export the main App component
