import { Artist, Playlist } from './types'

export const trackTitleFilter = (title: string) => (track: any) =>
  typeof track.title === 'string' &&
  typeof title === 'string' &&
  track.title.toLowerCase().includes(title.toLowerCase())

export const artistNameFilter = (name: string) => (artist: Artist) =>
  typeof artist.name === 'string' &&
  typeof name === 'string' &&
  artist.name.toLowerCase().includes(name.toLowerCase())

export const playlistNameFilter = (name: string) => (playlist: Playlist) =>
  typeof playlist.name === 'string' &&
  typeof name === 'string' &&
  playlist.name.toLowerCase().includes(name.toLowerCase())
