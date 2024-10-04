import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)
const TimeUtils = {
    SHORT_FORMAT_CURRENT_YEAR: 'L',
    SHORT_FORMAT_PAST_YEAR: 'LL',
    LONG_FORMAT: 'LL, LT',

    timeAgo(timestamp, config = {}) {
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
            return '' + diffDays + daysSuffix
        } else if (diffHours > 0 && diffHours <= 23) {
            return '' + diffHours + hoursSuffix
        } else if (diffMinutes > 0 && diffMinutes <= 59) {
            return '' + diffMinutes + minutesSuffix
        } else {
            return momentsAgo
        }
    },

    formatTime(timestamp, config = {}) {
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

    formatTimeLong(timestamp, config = {}) {
        const { locale = 'en', longFormat = this.LONG_FORMAT } = config
        const date = dayjs(timestamp * 1000)
        date.locale(locale)
        return date.format(longFormat)
    },
}

export { TimeUtils }
//# sourceMappingURL=time-utils.js.map
