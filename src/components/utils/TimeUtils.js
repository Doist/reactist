import moment from 'moment'

const TimeUtils = {
    SHORT_FORMAT_CURRENT_YEAR: 'L',
    SHORT_FORMAT_PAST_YEAR: 'LL',
    LONG_FORMAT: 'LL, LT',

    timeAgo(timestamp, config = {}) {
        const {
            locale = 'en',
            shortFormatCurrentYear = this.SHORT_FORMAT_CURRENT_YEAR,
            shortFormatPastYear = this.SHORT_FORMAT_PAST_YEAR,
            yesterday = 'yesterday',
            hoursSuffix = 'h',
            minutesSuffix = 'm',
            momentsAgo = 'moments ago'
        } = config
        const now = moment()
        const date = moment.unix(timestamp)
        date.locale(locale)
        const diffMinutes = now.diff(date, 'minutes')
        const diffHours = now.diff(date, 'hours')
        const diffDays = now.diff(date, 'days')

        if (diffDays > 1) {
            if (date.isSame(now, 'year')) {
                return date.format(shortFormatCurrentYear)
            } else {
                return date.format(shortFormatPastYear)
            }
        } else if (diffDays === 1) {
            return yesterday
        } else if (diffHours > 0 && diffHours <= 23) {
            return `${diffHours}${hoursSuffix}`
        } else if (diffMinutes > 0 && diffMinutes <= 59) {
            return `${diffMinutes}${minutesSuffix}`
        } else {
            return momentsAgo
        }
    },

    formatTime(timestamp, config = {}) {
        const {
            locale = 'en',
            shortFormatCurrentYear = this.SHORT_FORMAT_CURRENT_YEAR,
            shortFormatPastYear = this.SHORT_FORMAT_PAST_YEAR
        } = config
        const date = moment.unix(timestamp)
        date.locale(locale)
        if (date.isSame(moment(), 'year')) {
            return date.format(shortFormatCurrentYear)
        } else {
            return date.format(shortFormatPastYear)
        }
    },

    formatTimeLong(timestamp, config = {}) {
        const { locale = 'en', longFormat = this.LONG_FORMAT } = config
        const date = moment.unix(timestamp)
        date.locale(locale)
        return date.format(longFormat)
    }
}

export default TimeUtils
