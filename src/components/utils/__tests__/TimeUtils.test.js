import moment from 'moment'

import TimeUtils from '../TimeUtils'

// setup mocked date generation
let now = null
beforeAll(() => {
    // whenever moment() is invoked 2017-03-22 will be taken as date
    Date.now = jest.fn(() => new Date(Date.UTC(2017, 2, 22)).valueOf())
    now = moment()
})

describe('Time Utils', () => {
    it('formatTime shoud match `LL` when in current year', () => {
        const testDate = moment()
            .year(now.year())
            .month('March')
            .date(9)
            .unix()
        expect(TimeUtils.formatTime(testDate)).toBe('03/09/2017')
    })

    it('formatTime should match `LL` when in past year', () => {
        const testDate = moment()
            .year(2016)
            .month('March')
            .date(9)
            .unix()
        expect(TimeUtils.formatTime(testDate)).toBe('March 9, 2016')
    })

    it('formatTimeLong should match `LL, LT`', () => {
        const testDate = moment()
            .year(2017)
            .month('August')
            .date(1)
            .hours(13)
            .minutes(37)
            .seconds(42)
            .unix()
        expect(TimeUtils.formatTimeLong(testDate)).toBe(
            'August 1, 2017, 1:37 PM'
        )
    })

    it('timeAgo < 1m returns `moments ago`', () => {
        const testDate = moment()
            .subtract(10, 'seconds')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('moments ago')
    })

    it('timeAgo < 1h returns `XXm`', () => {
        const testDate = moment()
            .subtract(10, 'minutes')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('10m')
    })

    it('timeAgo < 1d returns `XXh`', () => {
        const testDate = moment()
            .subtract(10, 'hours')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('10h')
    })

    it('timeAgo < 7d returns MM/DD/YYYY', () => {
        const testDate = moment()
            .subtract(2, 'days')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('03/20/2017')
    })

    it('timeAgo > 7d returns `MM/DD/YYYY` in current year', () => {
        const testDate = moment()
            .year(now.year())
            .month('March')
            .date(9)
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('03/09/2017')
    })

    it('timeAgo > 7d returns `LL` in past year', () => {
        const testDate = moment()
            .year(2016)
            .month('March')
            .date(9)
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('March 9, 2016')
    })
})
