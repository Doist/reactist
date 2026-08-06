import type { BoxJustifyContent } from '../box'

const justifyContentByAlignment = {
    start: 'flexStart',
    center: 'center',
    end: 'flexEnd',
} as const satisfies Record<string, BoxJustifyContent>

type SegmentedControlAlignment = keyof typeof justifyContentByAlignment

export { justifyContentByAlignment }
export type { SegmentedControlAlignment }
