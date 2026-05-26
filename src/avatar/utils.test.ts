import {
    AVATAR_META_COLOR_COUNT,
    getAvatarImageProps,
    getAvatarMetaColorIndex,
    getInitials,
    normalizeAvatarName,
    ROUNDED_AVATAR_RADIUS_BY_SIZE,
} from './utils'

describe('Avatar utils', () => {
    describe('getInitials', () => {
        it('returns uppercased initials for two names', () => {
            expect(getInitials('jane doe')).toBe('JD')
        })

        it('returns first and last initials for more than two names', () => {
            expect(getInitials('jane middle doe')).toBe('JD')
        })

        it('returns first initial for a single name', () => {
            expect(getInitials('jane')).toBe('J')
        })

        it('preserves non-BMP Unicode letter initials', () => {
            expect(getInitials('\u{10400}eseret doe')).toBe('\u{10400}D')
        })

        it('preserves decomposed accented initials', () => {
            expect(getInitials('e\u0301lodie brule\u0301')).toBe('ÉB')
        })

        it('limits uppercase-expanding initials to one character per word', () => {
            expect(getInitials('ßmith Müller')).toBe('SM')
        })

        it('returns one initial when first and last initials match', () => {
            expect(getInitials('jane johnson')).toBe('J')
        })

        it('returns one initial when first and last initials match after uppercasing', () => {
            expect(getInitials('Jane johnson')).toBe('J')
        })

        it('filters non-letter characters before creating initials', () => {
            expect(getInitials('🍕 Francesca 🍕 Ciao 🍕')).toBe('FC')
        })

        it('returns an empty string for an empty name', () => {
            expect(getInitials('')).toBe('')
        })

        it('returns an empty string when called without a name', () => {
            expect(getInitials()).toBe('')
        })
    })

    describe('normalizeAvatarName', () => {
        it('trims and collapses whitespace', () => {
            expect(normalizeAvatarName('  Jane    Doe  ')).toBe('Jane Doe')
        })

        it('returns an empty string for undefined', () => {
            expect(normalizeAvatarName()).toBe('')
        })

        it('returns an empty string for an empty string', () => {
            expect(normalizeAvatarName('')).toBe('')
        })
    })

    describe('getAvatarImageProps', () => {
        const imageMap = {
            36: 'avatar-36.png',
            72: 'avatar-72.png',
            144: 'avatar-144.png',
        }

        it('returns a string image directly', () => {
            expect(getAvatarImageProps('avatar.png', 36)).toEqual({ src: 'avatar.png' })
        })

        it('uses the largest valid source as the fallback src for source maps', () => {
            expect(getAvatarImageProps(imageMap, 36)).toEqual({
                src: 'avatar-144.png',
                srcSet: 'avatar-36.png 36w, avatar-72.png 72w, avatar-144.png 144w',
                sizes: '36px',
            })
        })

        it('returns undefined for an empty source map', () => {
            expect(getAvatarImageProps({}, 36)).toBeUndefined()
        })

        it('ignores invalid source entries', () => {
            expect(
                getAvatarImageProps(
                    {
                        '-10': 'avatar-negative.png',
                        0: 'avatar-zero.png',
                        36: '',
                        72: 'avatar-72.png',
                    } as Record<number, string>,
                    36,
                ),
            ).toEqual({
                src: 'avatar-72.png',
                srcSet: 'avatar-72.png 72w',
                sizes: '36px',
            })
        })
    })

    describe('getAvatarMetaColorIndex', () => {
        it('uses 20 fixed meta color slots', () => {
            expect(AVATAR_META_COLOR_COUNT).toBe(20)
        })

        it('returns a deterministic index based on the normalized full name', () => {
            expect(getAvatarMetaColorIndex('Jane Doe')).toBe(0)
            expect(getAvatarMetaColorIndex('Jane    Doe')).toBe(0)
            expect(getAvatarMetaColorIndex('John Doe')).toBe(9)
        })

        it('uses the same index for canonically equivalent Unicode names', () => {
            expect(getAvatarMetaColorIndex('Élodie Brulé')).toBe(
                getAvatarMetaColorIndex('E\u0301lodie Brule\u0301'),
            )
        })

        it('always returns an index in the configured fixed slot range', () => {
            const index = getAvatarMetaColorIndex('Francesca Ciao')

            expect(index).toBeGreaterThanOrEqual(0)
            expect(index).toBeLessThan(AVATAR_META_COLOR_COUNT)
        })
    })

    describe('ROUNDED_AVATAR_RADIUS_BY_SIZE', () => {
        it('contains the exclusive rounded radius mapping', () => {
            expect(ROUNDED_AVATAR_RADIUS_BY_SIZE).toEqual({
                80: '10px',
                72: '10px',
                62: '8.5px',
                50: '7px',
                40: '5.5px',
                36: '5px',
                30: '5px',
                28: '5px',
                24: '3.2px',
                20: '3px',
                18: '3px',
                16: '2px',
                12: '1.6px',
            })
        })
    })
})
