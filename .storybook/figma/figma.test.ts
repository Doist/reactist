import { resolveFigmaLinks } from './figma'

describe('resolveFigmaLinks', () => {
    it('resolves a bare string as both url and label', () => {
        expect(resolveFigmaLinks('https://figma.com/design/abc?node-id=1-2')).toEqual([
            {
                label: 'https://figma.com/design/abc?node-id=1-2',
                url: 'https://figma.com/design/abc?node-id=1-2',
            },
        ])
    })

    it('resolves an object with label and url', () => {
        expect(
            resolveFigmaLinks({
                label: 'Web › Buttons › Button',
                url: 'https://figma.com/design/abc?node-id=1-2',
            }),
        ).toEqual([
            {
                label: 'Web › Buttons › Button',
                url: 'https://figma.com/design/abc?node-id=1-2',
            },
        ])
    })

    it('falls back to the url as label when label is missing', () => {
        expect(resolveFigmaLinks({ url: 'https://figma.com/design/abc' })).toEqual([
            { label: 'https://figma.com/design/abc', url: 'https://figma.com/design/abc' },
        ])
    })

    it('resolves an array, dropping malformed entries', () => {
        expect(
            resolveFigmaLinks([
                'https://figma.com/a',
                { label: 'B', url: 'https://figma.com/b' },
                { label: 'C' },
                { url: 42 },
                '',
                null,
            ]),
        ).toEqual([
            { label: 'https://figma.com/a', url: 'https://figma.com/a' },
            { label: 'B', url: 'https://figma.com/b' },
        ])
    })

    it('treats malformed and empty params as no links', () => {
        expect(resolveFigmaLinks(undefined)).toEqual([])
        expect(resolveFigmaLinks(null)).toEqual([])
        expect(resolveFigmaLinks('')).toEqual([])
        expect(resolveFigmaLinks({})).toEqual([])
        expect(resolveFigmaLinks({ label: 'no url' })).toEqual([])
        expect(resolveFigmaLinks({ url: 42 })).toEqual([])
        expect(resolveFigmaLinks([])).toEqual([])
    })
})
