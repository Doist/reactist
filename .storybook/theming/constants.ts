export type ThemeAccent =
    | 'neutral'
    | 'blueberry'
    | 'gold'
    | 'kale'
    | 'lavender'
    | 'moonstone'
    | 'raspberry'
    | 'tangerine'

export type ThemeMode = 'light' | 'dark'

/** Prefix every Product Library theme class shares. Used to strip the previous theme. */
export const THEME_CLASS_PREFIX = 'theme_'

/**
 * The accent axis of the toolbar. `neutral` is the accent-free pair,
 * `theme_light` and `theme_dark`.
 */
export const THEME_ACCENTS: ReadonlyArray<{ value: ThemeAccent; title: string }> = [
    { value: 'neutral', title: 'Neutral' },
    { value: 'blueberry', title: 'Blueberry' },
    { value: 'gold', title: 'Gold' },
    { value: 'kale', title: 'Kale' },
    { value: 'lavender', title: 'Lavender' },
    { value: 'moonstone', title: 'Moonstone' },
    { value: 'raspberry', title: 'Raspberry' },
    { value: 'tangerine', title: 'Tangerine' },
]

export const THEME_MODES: ReadonlyArray<{ value: ThemeMode; title: string }> = [
    { value: 'light', title: 'Light' },
    { value: 'dark', title: 'Dark' },
]
