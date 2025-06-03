import { Colors } from '@/constants/Colors'
import { useEffect, useState } from 'react'
import { useColorScheme, ImageURISource } from 'react-native'
import { getColors, ImageColorsResult } from 'react-native-image-colors'

export const usePlayerBackground = (imageUrl: string | number) => {
  const [imageColor, setImageColor] = useState<string | null>(null)
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const backgroundColor = isDarkMode ? Colors.dark.background : Colors.light.background

  useEffect(() => {
    // If it's a local image (require(...)), skip getColors
    if (typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
      setImageColor(backgroundColor)
      return
    }

    getColors(imageUrl, {
      fallback: backgroundColor,
      cache: true,
      key: imageUrl
    })
      .then((result: ImageColorsResult) => {
        if (result.platform === 'android') {
          setImageColor(result.dominant ?? backgroundColor)
        } else if (result.platform === 'ios') {
          setImageColor(result.background ?? backgroundColor)
        } else {
          setImageColor(result.dominant ?? backgroundColor)
        }
      })
      .catch(() => {
        setImageColor(backgroundColor) // fallback on error
      })
  }, [imageUrl, backgroundColor])

  return { imageColor }
}
