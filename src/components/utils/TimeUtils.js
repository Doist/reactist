import Moment from 'moment-timezone';

Moment.updateLocale('en', {
    relativeTime: {
        future: '%s',
        past: '%s',
        s: 'moments ago',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years'
    }
});
Moment.relativeTimeThreshold('d', 1000);

const TimeUtils = {
    timeAgo(timestamp) {
        return Moment.unix(timestamp).fromNow();
    }
};

export default TimeUtils;
