import moment from 'moment'

const TimeUtils = {
    SHORT_FORMAT_CURRENT_YEAR: 'MMM D',
    SHORT_FORMAT_PAST_YEAR: 'MMM D, YYYY',
    LONG_FORMAT: 'DD MMM YY, LT',

    timeAgo(timestamp, config = {}) {
        const {
            locale = 'en',
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

        if (diffDays > 7) {
            if (date.isSame(now, 'year')) {
                return date.format(this.SHORT_FORMAT_CURRENT_YEAR)
            } else {
                return date.format(this.SHORT_FORMAT_PAST_YEAR)
            }
        } else if (diffDays > 0 && diffDays <= 7) {
            return date.format('dddd')
        } else if (diffHours > 0 && diffHours <= 23) {
            return `${diffHours}${hoursSuffix}`
        } else if (diffMinutes > 0 && diffMinutes <= 59) {
            return `${diffMinutes}${minutesSuffix}`
        } else {
            return momentsAgo
        }
    },

    formatTime(timestamp, locale = 'en') {
        const date = moment.unix(timestamp)
        date.locale(locale)
        if (date.isSame(moment(), 'year')) {
            return date.format(this.SHORT_FORMAT_CURRENT_YEAR)
        } else {
            return date.format(this.SHORT_FORMAT_PAST_YEAR)
        }
    },

    formatTimeLong(timestamp, locale = 'en') {
        const date = moment.unix(timestamp)
        date.locale(locale)
        return date.format(this.LONG_FORMAT)
    }
}

export default TimeUtils
