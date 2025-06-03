import { Colors } from '@/constants/Colors'
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume' 
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme, View, ViewProps, Text } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

export const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume()
  const progress = useSharedValue(volume ?? 0)
  const min = useSharedValue(0)
  const max = useSharedValue(1)

  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const theme = isDarkMode ? Colors.dark : Colors.light

  useEffect(() => {
    progress.value = withTiming(volume ?? 0)
  }, [volume])

  return (
    <View style={[style, { paddingHorizontal: 20, marginTop: 15 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons
          name="volume-low"
          size={24}
          color={theme.text}
          style={{ opacity: 0.8 }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12
          }}
        >
          <View style={{ flex: 1 }}>
            <Slider
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              containerStyle={{
                height: 4,
                borderRadius: 2,
                backgroundColor: theme.maximumTrackTintColor
              }}
              onValueChange={(value) => {
                progress.value = value
                updateVolume(value)
              }}
              renderBubble={() => null}
              theme={{
                maximumTrackTintColor: theme.maximumTrackTintColor,
                minimumTrackTintColor: theme.minimumTrackTintColor
              }}
              thumbWidth={16}
            />
          </View>
          <Text
            style={{
              color: theme.text,
              fontSize: 12,
              width: 40,
              textAlign: 'center',
              marginLeft: 8
            }}
          >
            {volume !== undefined ? `${Math.round(volume * 100)}%` : '0%'}
          </Text>
        </View>
        <Ionicons
          name="volume-high"
          size={24}
          color={theme.text}
          style={{ opacity: 0.8 }}
        />
      </View>
    </View>
  )
}
