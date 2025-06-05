import { create } from 'zustand'

type QueueStore = {
  activeQueueId: string | null
  setActiveQueueId: (id: string) => void
}

export const useQueueStore = create<QueueStore>((set) => ({
  activeQueueId: null,
  setActiveQueueId: (id: string) => set({ activeQueueId: id })
}))

// Selective access to avoid unnecessary rerenders
export const useQueue = () => {
  const activeQueueId = useQueueStore((state) => state.activeQueueId)
  const setActiveQueueId = useQueueStore((state) => state.setActiveQueueId)
  return { activeQueueId, setActiveQueueId }
}
