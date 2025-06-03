/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorDark = '#0a7ea4'
const tintColorLight = '#007AFF'

export const Colors = {
  light: {
    text: '#1C1C1E',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#3A3A3C',
    tabIconDefault: '#A1A1A1',
    tabIconSelected: tintColorLight,
    textMuted: '#6B7280',
    maximumTrackTintColor: 'rgba(0,0,0,0.4)',
    minimumTrackTintColor: 'rgba(0,0,0,0.6)'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    textMuted: '#9ca3af',
    maximumTrackTintColor: 'rgba(255,255,255,0.4)',
    minimumTrackTintColor: 'rgba(255,255,255,0.6)'
  }
}
