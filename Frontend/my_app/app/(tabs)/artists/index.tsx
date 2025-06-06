import {
  View,
  Text,
  useColorScheme,
  FlatList,
  TouchableHighlight,
  StyleSheet
} from 'react-native'
import { defaultStyles, utilsStyles } from '@/styles'
import { ScrollView } from 'react-native-gesture-handler'
import { useArtists } from '@/store/library'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import i18n from '@/locales'
import { useMemo } from 'react'
import { artistNameFilter } from '@/helpers/filter'
import { ScreenPadding } from '@/constants/ScreenPadding'
import { Image } from 'expo-image'
import { unknownArtistImageUri } from '@/constants/images'
import { Link } from 'expo-router'
import { FontSize } from '@/constants/FontSize'

const ArtistScreen = () => {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const styles = getStyles(isDarkMode)

  const itemSeparatorComponent = () => {
    return (
      <View
        style={[
          utilsStyles(isDarkMode).ItemSeparator,
          { marginLeft: 50, marginVertical: 12 }
        ]}
      />
    )
  }

  const search = useNavigationSearch({
    searchBarOption: {
      placeholder: i18n.t('Find in artists'),
      hideWhenScrolling: false
    }
  })

  const artists = useArtists()

  const filteredArtists = useMemo(() => {
    if (!search) return artists

    return artists.filter(artistNameFilter(search))
  }, [artists, search])

  return (
    <View style={defaultStyles(isDarkMode).container}>
      <ScrollView
        style={{ paddingHorizontal: ScreenPadding.horizontal }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{ paddingTop: 50, paddingBottom: 120 }}
          ItemSeparatorComponent={itemSeparatorComponent}
          ListFooterComponent={itemSeparatorComponent}
          ListEmptyComponent={
            <View>
              <Text>{i18n.t('No artists found')}</Text>
              <Image
                source={unknownArtistImageUri}
                style={utilsStyles(isDarkMode).emptyContentImage}
              />
            </View>
          }
          data={filteredArtists}
          renderItem={({ item: artist }) => {
            return (
              <Link href={`/artists/${artist.name}`} asChild>
                <TouchableHighlight activeOpacity={0.8}>
                  <View style={styles.artistItemContainer}>
                    <View>
                      <Image
                        source={unknownArtistImageUri}
                        style={styles.artistImage}
                      />
                    </View>
                    <View style={{ width: '100%' }}>
                      <Text numberOfLines={1} style={styles.artistNameText}>
                        {artist.name}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </Link>
            )
          }}
        />
      </ScrollView>
    </View>
  )
}
const getStyles = (isDarkMode: boolean) => { 
  return StyleSheet.create({
    artistItemContainer: {
      flexDirection: 'row',
      columnGap: 14,
      alignItems: 'center'
    },
    artistImage: {
      borderRadius: 32,
      width: 40,
      height: 40
    },
    artistNameText: {
      ...defaultStyles(isDarkMode).text,
      fontSize: FontSize.large,
      maxWidth: '80%'
    }
  })
}

export default ArtistScreen
