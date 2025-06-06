import library from '@/assets/data/library.json'
import { unknownTrackImageUri } from '@/constants/images'
import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { useMemo } from 'react'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'

interface LibraryState {
  tracks: TrackWithPlaylist[]
  toggleTrackFavorite: (track: Track) => void
  addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
  tracks: library,

  toggleTrackFavorite: (track) =>
    set((state) => ({
      tracks: state.tracks.map((currentTrack) =>
        currentTrack.url === track.url
          ? {
              ...currentTrack,
              rating: currentTrack.rating === 1 ? 0 : 1
            }
          : currentTrack
      )
    })),

  addToPlaylist: (track, playlistName) =>
    set((state) => ({
      tracks: state.tracks.map((currentTrack) =>
        currentTrack.url === track.url
          ? {
              ...currentTrack,
              playlist: Array.from(
                new Set([...(currentTrack.playlist ?? []), playlistName])
              )
            }
          : currentTrack
      )
    }))
}))

// All tracks
export const useTracks = () => useLibraryStore((state) => state.tracks)

// Only favorited tracks
export const useFavorites = () => {
  const tracks = useLibraryStore((state) => state.tracks)
  const favorites = useMemo(
    () => tracks.filter((t) => t.rating === 1),
    [tracks]
  )
  const toggleTrackFavorite = useLibraryStore(
    (state) => state.toggleTrackFavorite
  )

  return { favorites, toggleTrackFavorite }
}

// Artists extracted from tracks
export const useArtists = () => {
  const tracks = useLibraryStore((state) => state.tracks)

  return useMemo(() => {
    const artistsMap: Record<string, Artist> = {}

    for (const track of tracks) {
      const artistName =
        typeof track.artist === 'string' && track.artist.trim() !== ''
          ? track.artist
          : 'Unknown'

      if (!artistsMap[artistName]) {
        artistsMap[artistName] = { name: artistName, tracks: [] }
      }
      artistsMap[artistName].tracks.push(track)
    }

    return Object.values(artistsMap)
  }, [tracks])
}

// Playlists extracted from tracks
export const usePlaylists = () => {
  const tracks = useLibraryStore((state) => state.tracks)
  const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

  const playlists = useMemo(() => {
    return tracks.reduce((acc, track) => {
      for (const name of track.playlist ?? []) {
        const existing = acc.find((p) => p.name === name)
        if (existing) {
          existing.tracks.push(track)
        } else {
          acc.push({
            name,
            tracks: [track],
            artworkPreview: track.artwork ?? unknownTrackImageUri
          })
        }
      }
      return acc
    }, [] as Playlist[])
  }, [tracks])

  return { playlists, addToPlaylist }
}
