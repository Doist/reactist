import {
    AVATAR_META_COLOR_COUNT,
    getAvailableImageSources,
    getAvatarImageIdentityKey,
    getAvatarMetaColorIndex,
    getInitials,
    getSources,
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

        it('returns the first two grapheme clusters for a single name part', () => {
            expect(getInitials('jane')).toBe('JA')
        })

        it('preserves non-BMP Unicode letter initials', () => {
            expect(getInitials('\u{10400}eseret doe')).toBe('\u{10400}D')
        })

        it('preserves decomposed accented initials', () => {
            expect(getInitials('e\u0301lodie brule\u0301')).toBe('ÉB')
        })

        it('preserves grapheme clusters that contain combining marks', () => {
            expect(getInitials('q\u0307bert q\u0307uill')).toBe('Q\u0307Q\u0307')
        })

        it('limits uppercase-expanding initials to one character per word', () => {
            expect(getInitials('ßmith Müller')).toBe('SM')
        })

        it('uppercases the whole name part before taking grapheme clusters', () => {
            expect(getInitials('ßeta')).toBe('SS')
        })

        it('keeps matching first and last initials for multiple name parts', () => {
            expect(getInitials('jane johnson')).toBe('JJ')
        })

        it('splits name parts by Unicode whitespace', () => {
            expect(getInitials('Jane\u2003Doe')).toBe('JD')
        })

        it('does not filter non-letter grapheme clusters from selected name parts', () => {
            expect(getInitials('🍕 Francesca 🍕 Ciao 🍕')).toBe('🍕🍕')
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
            expect(getSources('avatar.png', 36)).toEqual({ src: 'avatar.png' })
        })

        it('uses the largest valid source as the fallback src for source maps', () => {
            expect(getSources(imageMap, 36)).toEqual({
                src: 'avatar-144.png',
                srcSet: 'avatar-36.png 36w, avatar-72.png 72w, avatar-144.png 144w',
                sizes: '36px',
                sources: [
                    { sourceSize: 36, src: 'avatar-36.png' },
                    { sourceSize: 72, src: 'avatar-72.png' },
                    { sourceSize: 144, src: 'avatar-144.png' },
                ],
            })
        })

        it('returns undefined for an empty source map', () => {
            expect(getSources({}, 36)).toBeUndefined()
        })

        it('ignores invalid source entries', () => {
            expect(
                getSources(
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
                sources: [{ sourceSize: 72, src: 'avatar-72.png' }],
            })
        })
    })

    describe('getAvatarImageIdentityKey', () => {
        it('returns the string image as its identity', () => {
            expect(getAvatarImageIdentityKey('avatar.png')).toBe('avatar.png')
        })

        it('returns a stable identity for source maps independent of entry order', () => {
            expect(
                getAvatarImageIdentityKey({
                    144: 'avatar-144.png',
                    36: 'avatar-36.png',
                    72: 'avatar-72.png',
                }),
            ).toBe('36:avatar-36.png|72:avatar-72.png|144:avatar-144.png')
        })

        it('uses fallback identity when no valid image source exists', () => {
            expect(getAvatarImageIdentityKey()).toBe('fallback')
            expect(getAvatarImageIdentityKey({})).toBe('fallback')
            expect(
                getAvatarImageIdentityKey({
                    0: 'avatar-zero.png',
                    36: '',
                }),
            ).toBe('fallback')
        })
    })

    describe('getAvailableAvatarImageProps', () => {
        it('removes failed source-map candidates and recomputes the fallback src', () => {
            const imageProps = getSources(
                {
                    36: 'avatar-36.png',
                    72: 'avatar-72.png',
                    144: 'avatar-144.png',
                },
                36,
            )

            expect(getAvailableImageSources(imageProps, ['avatar-144.png'])).toEqual({
                src: 'avatar-72.png',
                srcSet: 'avatar-36.png 36w, avatar-72.png 72w',
                sizes: '36px',
                sources: [
                    { sourceSize: 36, src: 'avatar-36.png' },
                    { sourceSize: 72, src: 'avatar-72.png' },
                ],
            })
        })

        it('returns undefined when a string image has failed', () => {
            expect(getAvailableImageSources({ src: 'avatar.png' }, ['avatar.png'])).toBeUndefined()
        })

        it('returns the original image sources when no candidates have failed', () => {
            const imageProps = getSources(
                {
                    36: 'avatar-36.png',
                    72: 'avatar-72.png',
                },
                36,
            )

            expect(getAvailableImageSources(imageProps, [])).toBe(imageProps)
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
