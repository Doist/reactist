import { resolveFigmaLinks } from './figma'

describe('resolveFigmaLinks', () => {
    it('resolves a bare string as both url and path', () => {
        expect(resolveFigmaLinks('https://figma.com/design/abc?node-id=1-2')).toEqual([
            {
                path: 'https://figma.com/design/abc?node-id=1-2',
                url: 'https://figma.com/design/abc?node-id=1-2',
            },
        ])
    })

    it('resolves an object with path and url', () => {
        expect(
            resolveFigmaLinks({
                path: 'Web › Buttons › Button',
                url: 'https://figma.com/design/abc?node-id=1-2',
            }),
        ).toEqual([
            {
                path: 'Web › Buttons › Button',
                url: 'https://figma.com/design/abc?node-id=1-2',
            },
        ])
    })

    it('falls back to the url as path when path is missing', () => {
        expect(resolveFigmaLinks({ url: 'https://figma.com/design/abc' })).toEqual([
            { path: 'https://figma.com/design/abc', url: 'https://figma.com/design/abc' },
        ])
    })

    it('resolves an array, dropping malformed entries', () => {
        expect(
            resolveFigmaLinks([
                'https://figma.com/a',
                { path: 'B', url: 'https://figma.com/b' },
                { path: 'C' },
                { url: 42 },
                '',
                null,
            ]),
        ).toEqual([
            { path: 'https://figma.com/a', url: 'https://figma.com/a' },
            { path: 'B', url: 'https://figma.com/b' },
        ])
    })

    it('treats malformed and empty params as no links', () => {
        expect(resolveFigmaLinks(undefined)).toEqual([])
        expect(resolveFigmaLinks(null)).toEqual([])
        expect(resolveFigmaLinks('')).toEqual([])
        expect(resolveFigmaLinks({})).toEqual([])
        expect(resolveFigmaLinks({ path: 'no url' })).toEqual([])
        expect(resolveFigmaLinks({ url: 42 })).toEqual([])
        expect(resolveFigmaLinks([])).toEqual([])
    })
})
