import dayjs from 'dayjs'
import MockDate from 'mockdate'

import TimeUtils from '../TimeUtils'

beforeAll(() => {
    // whenever dayjs() is invoked 2017-03-22 will be taken as date
    MockDate.set(new Date(Date.UTC(2017, 2, 23)))
})

describe('Time Utils', () => {
    it('formatTime should match `LL` when in current year', () => {
        const testDate = dayjs(new Date(dayjs().year(), 2, 9)).unix()
        expect(TimeUtils.formatTime(testDate)).toBe('03/09/2017')
    })

    it('formatTime should match `LL` when in past year', () => {
        const testDate = dayjs(new Date('March 9, 2016')).unix()
        expect(TimeUtils.formatTime(testDate)).toBe('March 9, 2016')
    })

    it('formatTimeLong should match `LL, LT`', () => {
        const testDate = dayjs(new Date('August 1, 2017 13:37:42')).unix()
        expect(TimeUtils.formatTimeLong(testDate)).toBe(
            'August 1, 2017, 1:37 PM'
        )
    })

    it('timeAgo < 1m returns `moments ago`', () => {
        const testDate = dayjs()
            .subtract(10, 'seconds')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('moments ago')
    })

    it('timeAgo < 1h returns `XXm`', () => {
        const testDate = dayjs()
            .subtract(10, 'minutes')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('10m')
    })

    it('timeAgo < 1d returns `XXh`', () => {
        const testDate = dayjs()
            .subtract(10, 'hours')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('10h')
    })

    it('timeAgo < 7d returns MM/DD/YYYY', () => {
        const testDate = dayjs()
            .subtract(2, 'days')
            .unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('03/20/2017')
    })

    it('timeAgo > 7d returns `MM/DD/YYYY` in current year', () => {
        const testDate = dayjs(new Date(dayjs().year(), 2, 9)).unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('03/09/2017')
    })

    it('timeAgo > 7d returns `LL` in past year', () => {
        const testDate = dayjs(new Date('March 9, 2016')).unix()
        expect(TimeUtils.timeAgo(testDate)).toBe('March 9, 2016')
    })
})
