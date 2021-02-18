import dayjs from 'dayjs'
/**
 * There's a problem with our setup where the default export from
 * localizedFormat (and likely every other dayjs plugin) isn't properly
 * recognized. The proposed workarounds (importing with `.js` ending, or adding
 * `allowSyntheticDefaultImports` to the tsconfig) either broke linting or type
 * checking. After spending some time on this it was decided that further
 * investigations are not worth it, the code works and the eslint ignore is fine.
 * ref: https://github.com/iamkun/dayjs/issues/593
 * ref: https://day.js.org/docs/en/installation/typescript
 */
// eslint-disable-next-line import/default
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

type TimeConfig = {
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

    timeAgo(timestamp: number, config: TimeConfig = {}) {
        const {
            locale = 'en',
            shortFormatCurrentYear = this.SHORT_FORMAT_CURRENT_YEAR,
            shortFormatPastYear = this.SHORT_FORMAT_PAST_YEAR,
            daysSuffix = 'd',
            hoursSuffix = 'h',
            minutesSuffix = 'm',
            momentsAgo = 'moments ago',
        } = config
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

    formatTime(timestamp: number, config: TimeConfig = {}) {
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

    formatTimeLong(timestamp: number, config: TimeConfig = {}) {
        const { locale = 'en', longFormat = this.LONG_FORMAT } = config
        const date = dayjs(timestamp * 1000)
        date.locale(locale)
        return date.format(longFormat)
    },
}

export { TimeUtils, TimeConfig }
