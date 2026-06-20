import { resolveBadges } from './badges'

describe('resolveBadges', () => {
    it('resolves configured badges in story order', () => {
        expect(
            resolveBadges(['accessible', 'deprecated'], {
                accessible: {
                    title: 'Accessible',
                    styles: { color: 'green' },
                },
                deprecated: {
                    title: 'Deprecated',
                    styles: { color: 'red' },
                },
            }),
        ).toEqual([
            {
                id: 'accessible',
                title: 'Accessible',
                styles: { color: 'green' },
            },
            {
                id: 'deprecated',
                title: 'Deprecated',
                styles: { color: 'red' },
            },
        ])
    })

    it('filters unknown badges and invalid badge entries', () => {
        expect(
            resolveBadges(['accessible', 'missing', 42, 'untitled'], {
                accessible: {
                    title: 'Accessible',
                },
                untitled: {
                    styles: { color: 'orange' },
                },
            }),
        ).toEqual([
            {
                id: 'accessible',
                title: 'Accessible',
                styles: undefined,
            },
        ])
    })

    it('treats invalid parameter shapes as empty', () => {
        expect(resolveBadges(undefined, {})).toEqual([])
        expect(resolveBadges('accessible', {})).toEqual([])
        expect(resolveBadges(['accessible'], undefined)).toEqual([])
        expect(resolveBadges(['accessible'], [])).toEqual([])
    })

    it('ignores non-object styles', () => {
        expect(
            resolveBadges(['accessible'], {
                accessible: {
                    title: 'Accessible',
                    styles: 'color: green',
                },
            }),
        ).toEqual([
            {
                id: 'accessible',
                title: 'Accessible',
                styles: undefined,
            },
        ])
    })
})
