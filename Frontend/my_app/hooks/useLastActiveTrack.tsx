import { useEffect, useState } from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'

// Ajout du type de retour : () : Track | undefined
const useLastActiveTrack = (): Track | undefined => {
    const activeTrack = useActiveTrack();
    const [lastActiveTrack, setLastActiveTrack] = useState<Track>()

    useEffect(() => {
        if (activeTrack) {
            setLastActiveTrack(activeTrack)
        }
    }, [activeTrack])

    return lastActiveTrack
}

export default useLastActiveTrack
