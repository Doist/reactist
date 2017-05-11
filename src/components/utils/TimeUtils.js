import moment from 'moment';

const TimeUtils = {
    SHORT_FORMAT_CURRENT_YEAR: 'MMM D',
    SHORT_FORMAT_PAST_YEAR: 'MMM D, YYYY',
    LONG_FORMAT: 'DD MMM YY, LT',

    timeAgo(timestamp) {
        const now = moment();
        const date = moment.unix(timestamp);
        const diffMinutes = now.diff(date, 'minutes');
        const diffHours = now.diff(date, 'hours');
        const diffDays = now.diff(date, 'days');

        if (diffDays > 7) {
            if (date.isSame(now, 'year')) {
                return date.format(this.SHORT_FORMAT_CURRENT_YEAR);
            } else {
                return date.format(this.SHORT_FORMAT_PAST_YEAR);
            }
        } else if (diffDays > 0 && diffDays <= 7) {
            return date.format('dddd');
        } else if (diffHours > 0 && diffHours <= 23) {
            return `${diffHours}h`;
        } else if (diffMinutes > 0 && diffMinutes <= 59) {
            return `${diffMinutes}m`;
        } else {
            return 'moments ago';
        }
    },

    formatTime(timestamp) {
        const date = moment.unix(timestamp);
        if (date.isSame(moment(), 'year')) {
            return date.format(this.SHORT_FORMAT_CURRENT_YEAR);
        } else {
            return date.format(this.SHORT_FORMAT_PAST_YEAR);
        }
    },

    formatTimeLong(timestamp) {
        return moment.unix(timestamp).format(this.LONG_FORMAT);
    }
};

export default TimeUtils;
