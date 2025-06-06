import { PropsWithChildren, useRef } from 'react'
import { Platform, Pressable } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import { MenuView, MenuComponentRef } from '@react-native-menu/menu'
import i18n from '@/locales'
import { useFavorites } from '@/store/library'
import { useQueue } from '@/store/queue'
import { useRouter } from 'expo-router'
import { match } from 'ts-pattern'

type TrackShortcutsMenuProps = PropsWithChildren<{
  track: Track
}>

export const TrackShortcutsMenu = ({
  track,
  children
}: TrackShortcutsMenuProps) => {
  const router = useRouter()
  const isFavorite = track.rating === 1
  const { toggleTrackFavorite } = useFavorites()
  const { activeQueueId } = useQueue()
  const menuRef = useRef<MenuComponentRef>(null)

  const handlePressAction = (id: string) => {
    match(id)
      .with('add-to-favorites', async () => {
        toggleTrackFavorite(track)
        if (activeQueueId?.startsWith('favorites')) {
          await TrackPlayer.add(track)
        }
      })
      .with('remove-from-favorites', async () => {
        toggleTrackFavorite(track)
        if (activeQueueId?.startsWith('favorites')) {
          const queue = await TrackPlayer.getQueue()
          const index = queue.findIndex((qTrack) => qTrack.url === track.url)
          if (index !== -1) await TrackPlayer.remove(index)
        }
      })
      .with('add-to-playlist', () => {
        router.push({
          pathname: '/(modals)/addToPlaylist',
          params: { trackUrl: track.url }
        } as any) // safe cast for expo-router
      })
      .otherwise(() => console.warn(`Unknown menu action: ${id}`))
  }

  if (Platform.OS === 'web') {
    // Fallback for web (can be customized)
    return (
      <Pressable onLongPress={() => alert('Track menu not supported on web')}>
        {children}
      </Pressable>
    )
  }

  return (
    <MenuView
      ref={menuRef}
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      shouldOpenOnLongPress={true}
      actions={[
        {
          id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
          title: isFavorite
            ? i18n.t('Remove from favorites')
            : i18n.t('Add to favorites'),
          image: Platform.select({
            ios: isFavorite ? 'star.fill' : 'star',
            android: 'ic_menu_star'
          })
        },
        {
          id: 'add-to-playlist',
          title: i18n.t('Add to playlist'),
          image: Platform.select({
            ios: 'plus',
            android: 'ic_menu_add'
          })
        }
      ]}
    >
      {children}
    </MenuView>
  )
}
