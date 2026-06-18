import { resolveBadges } from './badges'

describe('resolveBadges', () => {
    it('resolves configured badges in story order', () => {
        expect(
            resolveBadges(['accessible', 'deprecated'], {
                accessible: {
                    title: 'Accessible',
                    tone: 'positive',
                },
                deprecated: {
                    title: 'Deprecated',
                    tone: 'attention',
                },
            }),
        ).toEqual([
            {
                id: 'accessible',
                title: 'Accessible',
                tone: 'positive',
            },
            {
                id: 'deprecated',
                title: 'Deprecated',
                tone: 'attention',
            },
        ])
    })

    it('filters unknown badges and invalid badge entries', () => {
        expect(
            resolveBadges(['accessible', 'missing', 42, 'untitled', 'untoned'], {
                accessible: {
                    title: 'Accessible',
                    tone: 'positive',
                },
                untitled: {
                    tone: 'positive',
                },
                untoned: {
                    title: 'Untoned',
                },
            }),
        ).toEqual([
            {
                id: 'accessible',
                title: 'Accessible',
                tone: 'positive',
            },
        ])
    })

    it('treats invalid parameter shapes as empty', () => {
        expect(resolveBadges(undefined, {})).toEqual([])
        expect(resolveBadges('accessible', {})).toEqual([])
        expect(resolveBadges(['accessible'], undefined)).toEqual([])
        expect(resolveBadges(['accessible'], [])).toEqual([])
    })

    it('rejects an unknown tone', () => {
        expect(
            resolveBadges(['accessible'], {
                accessible: {
                    title: 'Accessible',
                    tone: 'rainbow',
                },
            }),
        ).toEqual([])
    })
})
