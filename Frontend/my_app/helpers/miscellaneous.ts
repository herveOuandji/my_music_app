export const formatSecondToMinute = (second: number) => {
  const minutes = Math.floor(second / 60)
  const remainingSeconds = Math.floor(second % 60)

  const formatMinutes = String(minutes).padStart(2, '0')
  const formatSeconds = String(remainingSeconds).padStart(2, '0')

  return `${formatMinutes}:${formatSeconds}`
}
