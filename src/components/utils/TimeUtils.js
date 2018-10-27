import format from 'date-fns/format'

const seconds = n => 1000 * n
const minutes = n => seconds(60) * n
const hours = n => minutes(60) * n
const days = n => hours(24) * n
const weeks = n => days(7) * n
const years = n => weeks(52) * n

function unix(time) {
    return Math.round(new Date(time).getTime() / 1000)
}

function getMinutes(ms) {
    return Math.round(ms / minutes(1))
}

function getHours(ms) {
    return Math.round(ms / hours(1))
}

function getDays(ms) {
    return Math.round(ms / days(1))
}

const TimeUtils = {
    SHORT_FORMAT_CURRENT_YEAR: 'MMM D',
    SHORT_FORMAT_PAST_YEAR: 'MMM D, YYYY',
    LONG_FORMAT: 'DD MMM YY, h:mm A',

    unix,
    seconds,
    minutes,
    hours,
    days,
    weeks,
    years,
    getMinutes,
    getHours,
    getDays,

    timeAgo(timestamp, config = {}) {
        const {
            locale = 'en',
            hoursSuffix = 'h',
            minutesSuffix = 'm',
            momentsAgo = 'moments ago'
        } = config

        const now = Date.now()
        const date = timestamp * 1000
        date.toLocaleString(locale)
        const diff = now - date
        const diffMinutes = getMinutes(diff)
        const diffHours = getHours(diff)
        const diffDays = getDays(diff)

        if (diffDays > 7) {
            if (new Date(date).getFullYear() === new Date(now).getFullYear()) {
                return format(date, this.SHORT_FORMAT_CURRENT_YEAR)
            } else {
                return format(date, this.SHORT_FORMAT_PAST_YEAR)
            }
        } else if (diffDays > 0 && diffDays <= 7) {
            return format(date, 'dddd')
        } else if (diffHours > 0 && diffHours <= 23) {
            return `${diffHours}${hoursSuffix}`
        } else if (diffMinutes > 0 && diffMinutes <= 59) {
            return `${diffMinutes}${minutesSuffix}`
        } else {
            return momentsAgo
        }
    },

    formatTime(timestamp, locale = 'en') {
        const date = new Date(timestamp * 1000)
        date.toLocaleString(locale)
        const now = new Date(Date.now())
        if (date.getFullYear() === now.getFullYear()) {
            return format(date, this.SHORT_FORMAT_CURRENT_YEAR)
        } else {
            return format(date, this.SHORT_FORMAT_PAST_YEAR)
        }
    },

    formatTimeLong(timestamp, locale = 'en') {
        const date = timestamp * 1000
        date.toLocaleString(locale)
        return format(date, this.LONG_FORMAT)
    }
}

export default TimeUtils
