import TimeUtils from '../TimeUtils'

const {
    unix,
    seconds,
    minutes,
    hours,
    days,
    weeks,
    years,
    getMinutes,
    getHours,
    getDays
} = TimeUtils

// setup mocked date generation
let now = null
let nowYear = null
beforeAll(() => {
    // whenever Date.now() is invoked 2017-03-22 will be taken as date
    // This was required to set the date within TimeUtils.js
    global.Date.now = jest.fn(() => new Date(Date.UTC(2017, 2, 22)).valueOf())

    now = Date.now()
    nowYear = new Date(now).getFullYear()
})

afterAll(() => {
    global.Date.now.mockRestore()
})

describe('Time Utils', () => {
    it('unix should return a unix timestamp for the mocked date', () => {
        expect(unix(now)).toBe(now / 1000)
    })

    it('seconds should return seconds in milliseconds', () => {
        expect(seconds(1)).toBe(1000)
    })

    it('minutes should return minutes in milliseconds', () => {
        expect(minutes(1)).toBe(1000 * 60)
    })

    it('hours should return hours in milliseconds', () => {
        expect(hours(1)).toBe(1000 * 60 * 60)
    })

    it('days should return days in milliseconds', () => {
        expect(days(1)).toBe(1000 * 60 * 60 * 24)
    })

    it('weeks should return weeks in milliseconds', () => {
        expect(weeks(1)).toBe(1000 * 60 * 60 * 24 * 7)
    })

    it('years should return years in milliseconds', () => {
        expect(years(1)).toBe(1000 * 60 * 60 * 24 * 7 * 52)
    })

    it('getMinutes should return minutes from milliseconds', () => {
        expect(getMinutes(1000 * 60)).toBe(1)
    })

    it('getHours should return hours from milliseconds', () => {
        expect(getHours(1000 * 60 * 60)).toBe(1)
    })

    it('getDays should return days from milliseconds', () => {
        expect(getDays(1000 * 60 * 60 * 24)).toBe(1)
    })

    it('formatTime shoud match `MMM D` when in current year', () => {
        const testDate = unix(new Date(`March 9, ${nowYear}`))
        expect(TimeUtils.formatTime(testDate)).toBe('Mar 9')
    })

    it('formatTime should match `MMM D, YYYY` when in past year', () => {
        const testDate = unix(new Date('March 9, 2016'))
        expect(TimeUtils.formatTime(testDate)).toBe('Mar 9, 2016')
    })

    it('formatTimeLong should match `DD MMM YY, LT`', () => {
        const testDate = unix(new Date('August 1, 2017 13:37:42'))
        expect(TimeUtils.formatTimeLong(testDate)).toBe('01 Aug 17, 1:37 PM')
    })

    it('timeAgo < 1m returns `moments ago`', () => {
        const testDate = unix(now - seconds(10))
        expect(TimeUtils.timeAgo(testDate)).toBe('moments ago')
    })

    it('timeAgo < 1h returns `XXm`', () => {
        const testDate = unix(now - minutes(10))
        expect(TimeUtils.timeAgo(testDate)).toBe('10m')
    })

    it('timeAgo < 1d returns `XXh`', () => {
        const testDate = unix(now - hours(10))
        expect(TimeUtils.timeAgo(testDate)).toBe('10h')
    })

    it('timeAgo < 7d returns string representation of day', () => {
        const MONDAY = 1
        const daysToSubtract = new Date(now).getDay() - 1
        const testDate = unix(now - days(daysToSubtract))
        expect(new Date(testDate * 1000).getDay()).toBe(MONDAY)
        expect(TimeUtils.timeAgo(testDate)).toBe('Monday')
    })

    it('timeAgo > 7d returns `MMM D` in current year', () => {
        const testDate = unix(new Date(`March 9, ${nowYear}`))
        expect(TimeUtils.timeAgo(testDate)).toBe('Mar 9')
    })

    it('timeAgo > 7d returns `MMM D, YYYY` in past year', () => {
        const testDate = unix(new Date('March 9, 2016'))
        expect(TimeUtils.timeAgo(testDate)).toBe('Mar 9, 2016')
    })
})
