import { Tabs } from 'expo-router'
import i18n from '@/locales'
import { useColorScheme, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { FontSize } from '@/constants/FontSize'
import { BlurView } from 'expo-blur'
import { FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons'

const TabsLayout = () => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light

  const blurBackgroundColor =
    colorScheme === 'dark' ? 'rgba(18,18,18,0.7)' : 'rgba(255,255,255,0.7)'

  // Ensure tint is always a valid value
  const blurTint =
    colorScheme === 'dark'
      ? 'dark'
      : colorScheme === 'light'
      ? 'light'
      : 'default'

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            tint={blurTint}
            style={[styles.blur, { backgroundColor: blurBackgroundColor }]}
          />
        )
      }}
    >
      <Tabs.Screen
        name="favorites"
        options={{
          title: i18n.t('favorites'),
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: i18n.t('playlists'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="playlist-play" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="(songs)"
        options={{
          title: i18n.t('songs'),
          tabBarIcon: ({ color }) => (
            <Ionicons name="musical-notes-sharp" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="artists"
        options={{
          title: i18n.t('artists'),
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="users-line" size={20} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('settings'),
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-sharp" size={22} color={color} />
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  blur: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  tabBarLabel: {
    fontSize: FontSize.xs,
    fontWeight: '500'
  }
})

export default TabsLayout
