import type { CSSProperties } from 'react'

/**
 * Toolbar badge colors mirroring the Reactist Badge tones (see `src/badge/badge.module.css`)
 */
const reactistBadgeTones: Record<string, CSSProperties> = {
    info: { color: '#666666', backgroundColor: '#eeeeee', borderColor: '#666666' },
    positive: { color: '#058527', backgroundColor: '#e0f0e3', borderColor: '#058527' },
    promote: { color: '#8f4700', backgroundColor: '#faead1', borderColor: '#8f4700' },
    attention: { color: '#cf473a', backgroundColor: '#f9e3e2', borderColor: '#cf473a' },
    warning: { color: '#ffffff', backgroundColor: '#eb8909', borderColor: '#eb8909' },
}

export { reactistBadgeTones }
