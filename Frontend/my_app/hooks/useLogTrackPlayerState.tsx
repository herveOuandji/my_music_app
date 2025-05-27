import { Event, useTrackPlayerEvents } from "react-native-track-player"

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
  Event.PlaybackActiveTrackChanged,
  Event.RemotePlay,
  Event.RemotePause,
  Event.RemoteStop,
  Event.RemoteNext,
  Event.RemotePrevious,
]

export const useLogTrackPlayerState = () => {
  useTrackPlayerEvents(events, (event) => {
    console.log(`Track Player Event: ${event.type}`, event)

    if (event.type === Event.PlaybackError) {
      console.error("Playback Error:", event)
    }

    if (event.type === Event.PlaybackState) {
      console.log("Playback State Changed:", event.state)
    }

    if (event.type === Event.PlaybackActiveTrackChanged) {
      console.log("Active Track Changed:", event.index)
    }
  })
}