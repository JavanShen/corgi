import { zeroFill } from '../text'

const secondsToMinutes = (seconds: number) => {
    const formatTime = (num: number) => {
        return zeroFill(Math.floor(num))
    }
    return `${formatTime(seconds / 60)}:${formatTime(seconds % 60)}`
}

export { secondsToMinutes }
