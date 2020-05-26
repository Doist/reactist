import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

type Config = {
    locale?: string
    longFormat?: string
    shortFormatCurrentYear?: string
    shortFormatPastYear?: string
    daysSuffix?: string
    hoursSuffix?: string
    minutesSuffix?: string
    momentsAgo?: string
}

const TimeUtils = {
    SHORT_FORMAT_CURRENT_YEAR: 'L',
    SHORT_FORMAT_PAST_YEAR: 'LL',
    LONG_FORMAT: 'LL, LT',

    timeAgo(timestamp: number, config: Config = {}) {
        const {
            locale = 'en',
            shortFormatCurrentYear = this.SHORT_FORMAT_CURRENT_YEAR,
            shortFormatPastYear = this.SHORT_FORMAT_PAST_YEAR,
            daysSuffix = 'd',
            hoursSuffix = 'h',
            minutesSuffix = 'm',
            momentsAgo = 'moments ago',
        } = config as any
        const now = dayjs()
        const date = dayjs(timestamp * 1000)
        date.locale(locale)
        const diffMinutes = now.diff(date, 'minute')
        const diffHours = now.diff(date, 'hour')
        const diffDays = now.diff(date, 'day')

        if (diffDays > 1) {
            if (date.isSame(now, 'year')) {
                return date.format(shortFormatCurrentYear)
            } else {
                return date.format(shortFormatPastYear)
            }
        } else if (diffDays === 1) {
            return `${diffDays}${daysSuffix}`
        } else if (diffHours > 0 && diffHours <= 23) {
            return `${diffHours}${hoursSuffix}`
        } else if (diffMinutes > 0 && diffMinutes <= 59) {
            return `${diffMinutes}${minutesSuffix}`
        } else {
            return momentsAgo
        }
    },

    formatTime(timestamp: number, config: Config = {}) {
        const {
            locale = 'en',
            shortFormatCurrentYear = this.SHORT_FORMAT_CURRENT_YEAR,
            shortFormatPastYear = this.SHORT_FORMAT_PAST_YEAR,
        } = config
        const date = dayjs(timestamp * 1000)
        date.locale(locale)
        if (date.isSame(dayjs(), 'year')) {
            return date.format(shortFormatCurrentYear)
        } else {
            return date.format(shortFormatPastYear)
        }
    },

    formatTimeLong(timestamp: number, config: Config = {}) {
        const { locale = 'en', longFormat = this.LONG_FORMAT } = config
        const date = dayjs(timestamp * 1000)
        date.locale(locale)
        return date.format(longFormat)
    },
}

export default TimeUtils
export { Config as TimeConfig }
