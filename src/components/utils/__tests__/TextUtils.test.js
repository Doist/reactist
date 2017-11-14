import {
    getInitials,
    emailToIndex
} from '../TextUtils'

describe('TextUtils', () => {
    describe('getInitials', () => {
        it('returns uppercased initials for two names', () => {
            const initials = getInitials('henning mus')
            expect(initials).toBe('HM')
        })

        it('returns first and last name initials for more than two names', () => {
            const initials = getInitials('henning is awesome mus')
            expect(initials).toBe('HM')
        })

        it('returns first initial for a single name', () => {
            const initials = getInitials('henningmus')
            expect(initials).toBe('H')
        })

        it('returns only first initial if first and second initials are the same', () => {
            const initials = getInitials('henning hen')
            expect(initials).toBe('H')
        })

        it('returns an empty string for an empty name', () => {
            const initials = getInitials('')
            expect(initials).toBe('')
        })

        it('returns an empty string for when called without name', () => {
            const initials = getInitials()
            expect(initials).toBe('')
        })
    })

    describe('emailToIndex', () => {
        it('returns an index for a given mail', () => {
            const index = emailToIndex('henning@doist.com', 13)
            expect(index).toBe(12)
        })

        it('returns the index if the local part of email is the same', () => {
            const index1 = emailToIndex('henning@doist.com', 13)
            const index2 = emailToIndex('henning@foobar.com', 13)
            expect(index1).toBe(index2)
        })

        it('returns 0 index if local part of email is empty', () => {
            const index1 = emailToIndex('@doist.com', 13)
            expect(index1).toBe(0)
        })
    })
})
